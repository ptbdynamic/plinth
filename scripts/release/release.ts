/**
 * `npm run release`: publishes the version `npm run release:version` set, from main.
 *
 * It builds everything, then makes the tag `v<version>` and pushes it (Packagist reads the
 * Composer package, `ptbdynamic/plinth`, from the root composer.json at that tag, and its version
 * from the tag), and publishes `@ptbdynamic/plinth` to npm with the same version. While the root
 * package.json is private, the npm step is skipped.
 *
 * `npm run release -- --dry-run` changes nothing: it checks the version and the Composer package
 * (`composer validate`, and what `git archive` would ship), builds, lists what the npm package
 * would hold and prints the version each registry would get.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { archiveProblems, composerProblems, readPackage, sharedVersion } from './lib.ts';

const root = process.cwd();
const dryRun = process.argv.includes('--dry-run');

const run = (command: string, args: string[]) => execFileSync(command, args, { stdio: 'inherit' });
const output = (command: string, args: string[]) =>
  execFileSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();
const fail = (message: string): never => {
  console.error(message);
  process.exit(1);
};

const pkg = readPackage(root);
const version = sharedVersion(root);
if (pkg.version !== version) {
  fail(
    `package.json is ${pkg.version} but the workspaces are ${version}; run npm run release:version.`,
  );
}

const readComposer = (dir: string) =>
  JSON.parse(readFileSync(join(root, dir, 'composer.json'), 'utf8'));
const composer = readComposer('.');
const composerErrors = composerProblems(composer, readComposer('packages/blade'));
if (composerErrors.length > 0) fail(composerErrors.join('\n'));
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
    pkg.private
      ? 'Dry run: npm would be skipped, because package.json is private.'
      : `Dry run: would publish ${pkg.name}@${version} to npm.`,
  );
  process.exit(0);
}

run('git', ['tag', '--annotate', tag, '--message', tag]);
run('git', ['push', 'origin', tag]);

if (pkg.private) {
  console.log(`Skipped npm: package.json is private. Remove "private" to publish ${pkg.name}.`);
} else {
  run('npm', ['publish', '--access', 'public', '--ignore-scripts']);
}
