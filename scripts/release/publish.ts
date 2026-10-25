/**
 * `npm run release:publish`: what the release workflow (.github/workflows/release.yml) does with
 * the tag `TAG` that `npm run release` pushed.
 *
 * It runs the checks `npm run release` runs (one version everywhere, the tag is `v<version>`, no
 * version in composer.json), builds the packages, publishes `@ptbdynamic/plinth` to npm with
 * provenance (trusted publishing: npm takes the workflow's OIDC token, so there is no npm token
 * and no one-time code) and makes the GitHub release, with the version's section of CHANGELOG.md
 * as its notes. A version already on npm, or a release that already exists, is skipped, so a run
 * can be repeated.
 *
 * A run started by hand (workflow_dispatch) builds the commit it runs on, which may be newer than
 * the tag; it refuses if what the npm package ships has changed since the tag.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { readPackage, releaseNotes, releaseProblems } from './lib.ts';

const root = process.cwd();

const run = (command: string, args: string[], input?: string) =>
  execFileSync(command, args, {
    input,
    stdio: [input === undefined ? 'ignore' : 'pipe', 'inherit', 'inherit'],
  });
const output = (command: string, args: string[]) =>
  execFileSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const succeeds = (command: string, args: string[]) => {
  try {
    output(command, args);
    return true;
  } catch {
    return false;
  }
};
const fail = (message: string): never => {
  console.error(message);
  process.exit(1);
};

const tag = process.env.TAG ?? fail('Set TAG to the tag to release, such as v1.2.0.');
if (!succeeds('git', ['rev-parse', '--verify', '--quiet', `refs/tags/${tag}`])) {
  fail(`There is no tag ${tag}.`);
}
const problems = releaseProblems(root, tag);
if (problems.length > 0) fail(problems.join('\n'));

// The npm package ships these workspaces' builds.
const shipped = ['tokens', 'css', 'vue', 'react'].map((name) => `packages/${name}`);
if (!succeeds('git', ['diff', '--quiet', tag, 'HEAD', '--', ...shipped])) {
  fail(`${shipped.join(', ')} changed after ${tag}, so this commit would publish something else.`);
}

const pkg = readPackage(root);
const version = pkg.version;

run('npx', [
  'turbo',
  'run',
  'build',
  '--filter=!@ptbdynamic/plinth-site',
  '--filter=!@ptbdynamic/plinth-storybook',
]);

// `npm view` prints nothing for a version npm doesn't have, and fails if it has no such package.
const published = (() => {
  try {
    return output('npm', ['view', `${pkg.name}@${version}`, 'version']) === version;
  } catch {
    return false;
  }
})();
if (pkg.private) {
  console.log(`Skipped npm: package.json is private.`);
} else if (published) {
  console.log(`Skipped npm: ${pkg.name}@${version} is already published.`);
} else {
  run('npm', ['publish', '--access', 'public', '--provenance', '--ignore-scripts']);
}

if (succeeds('gh', ['release', 'view', tag])) {
  console.log(`Skipped the GitHub release: ${tag} already has one.`);
} else {
  const notes = releaseNotes(readFileSync('CHANGELOG.md', 'utf8'), version);
  run(
    'gh',
    ['release', 'create', tag, '--verify-tag', '--title', `Plinth ${version}`, '--notes-file', '-'],
    notes,
  );
}
