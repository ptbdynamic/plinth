/**
 * `npm run release`: releases the version `npm run release:version` set, from main.
 *
 * It checks and builds everything, then makes the tag `v<version>` and pushes it. The tag does the
 * rest: Packagist reads the Composer package, `ptbdynamic/plinth`, from the root composer.json at
 * that tag (and its version from the tag), and the release workflow (.github/workflows/release.yml,
 * `npm run release:publish`) publishes `@ptbdynamic/plinth` to npm and makes the GitHub release.
 *
 * `npm run release -- --dry-run` changes nothing: it checks the version and the Composer package
 * (`composer validate`, and what `git archive` would ship), builds, lists what the npm package
 * would hold and prints the version each registry would get.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { archiveProblems, readPackage, releaseProblems, sharedVersion } from './lib.ts';

const root = process.cwd();
const dryRun = process.argv.includes('--dry-run');

const run = (command: string, args: string[]) => execFileSync(command, args, { stdio: 'inherit' });
const output = (command: string, args: string[]) =>
  execFileSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();
const fail = (message: string): never => {
  console.error(message);
  process.exit(1);
};

const problems = releaseProblems(root);
if (problems.length > 0) fail(problems.join('\n'));
const pkg = readPackage(root);
const version = sharedVersion(root);
const composer = JSON.parse(readFileSync('composer.json', 'utf8')) as { name: string };
run('composer', ['validate', '--strict', '--no-check-lock']);

const tag = `v${version}`;
const tagged = output('git', ['tag', '--list', tag]) === tag;

// What a `composer require` downloads: GitHub's archive of the tag (or of HEAD before tagging),
// without what .gitattributes marks export-ignore.
const archived = execFileSync('git', ['archive', '--format=tar', tagged ? tag : 'HEAD']);
const archive = execFileSync('tar', ['-t'], { input: archived, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);
const archiveErrors = archiveProblems(archive);
if (archiveErrors.length > 0) fail(archiveErrors.join('\n'));

if (!dryRun) {
  if (output('git', ['branch', '--show-current']) !== 'main') fail('Release from main.');
  if (output('git', ['status', '--porcelain']) !== '')
    fail('Commit or discard your changes first.');
  if (tagged) fail(`${tag} already exists: run npm run release:version first.`);
}

run('npx', ['turbo', 'run', 'build']);

const [packed] = JSON.parse(output('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'])) as {
  name: string;
  version: string;
  entryCount: number;
}[];
if (!packed || packed.version !== version) fail('npm would pack a different version.');

console.log('');
console.log(`npm        ${packed?.name}@${version} (${packed?.entryCount} files)`);
console.log(
  `Packagist  ${composer.name} ${version}, from the tag ${tag} (${archive.filter((path) => !path.endsWith('/')).length} files)`,
);

if (dryRun) {
  console.log('');
  console.log(tagged ? `${tag} already exists.` : `Dry run: would tag ${tag} and push it.`);
  console.log(
    `Dry run: the release workflow would then publish ${pkg.name}@${version} to npm and make the GitHub release.`,
  );
  process.exit(0);
}

run('git', ['tag', '--annotate', tag, '--message', tag]);
run('git', ['push', 'origin', tag]);

console.log('');
console.log(
  `Pushed ${tag}. The release workflow publishes ${pkg.name}@${version} to npm and makes the GitHub release; follow it with gh run watch.`,
);
