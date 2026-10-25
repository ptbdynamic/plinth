/**
 * What the release scripts share: the packages that carry Plinth's one version, and the
 * changelog section a version adds.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** The workspaces Changesets versions together (the `fixed` group in .changeset/config.json). */
export const versioned = ['tokens', 'css', 'vue', 'react', 'blade'].map(
  (name) => `packages/${name}`,
);

export type Bump = 'major' | 'minor' | 'patch' | 'none';

export interface Changeset {
  summary: string;
  releases: { name: string; type: Bump }[];
}

const headings = { major: 'Breaking changes', minor: 'New', patch: 'Fixes' } as const;
const order: Bump[] = ['major', 'minor', 'patch', 'none'];

/** The largest bump a changeset asks for, across the packages it names. */
export function bumpOf(changeset: Changeset): Bump {
  return (
    order.find((bump) => changeset.releases.some((release) => release.type === bump)) ?? 'none'
  );
}

/** The `## version` section for CHANGELOG.md: one line per changeset, grouped by bump. */
export function changelogSection(version: string, changesets: Changeset[], date: string): string {
  const lines = [`## ${version} (${date})`];
  for (const bump of ['major', 'minor', 'patch'] as const) {
    const entries = changesets.filter((changeset) => bumpOf(changeset) === bump);
    if (entries.length === 0) continue;
    lines.push('', `### ${headings[bump]}`, '');
    for (const { summary } of entries) {
      const [first = '', ...rest] = summary.trim().split('\n');
      lines.push(`- ${first}`, ...rest.map((line) => (line ? `  ${line}` : '')));
    }
  }
  return lines.join('\n');
}

const title = '# Changelog';

/** Puts a section at the top of the changelog, under its title. */
export function prependSection(changelog: string, section: string): string {
  const body = changelog.startsWith(title)
    ? changelog.slice(title.length).trim()
    : changelog.trim();
  return [title, section, body].filter(Boolean).join('\n\n') + '\n';
}

/** Reads a package.json. */
export function readPackage(
  root: string,
  dir = '.',
): { name: string; version: string; private?: boolean } {
  return JSON.parse(readFileSync(join(root, dir, 'package.json'), 'utf8'));
}

/**
 * The one version every versioned workspace has. Throws if they differ, which means the
 * `fixed` group in .changeset/config.json no longer covers them all.
 */
export function sharedVersion(root: string): string {
  const versions = new Map(versioned.map((dir) => [dir, readPackage(root, dir).version]));
  const distinct = new Set(versions.values());
  if (distinct.size !== 1) {
    const list = [...versions].map(([dir, version]) => `${dir} ${version}`).join(', ');
    throw new Error(`The packages should share one version, but they have ${list}.`);
  }
  return [...distinct][0] as string;
}

/** A composer.json, as far as the release checks read it. */
export interface ComposerJson {
  name?: string;
  version?: string;
  require?: Record<string, string>;
  autoload?: { 'psr-4'?: Record<string, string> };
  extra?: { laravel?: { providers?: string[] } };
}

/**
 * What is wrong between the root composer.json, which Packagist reads, and the one in
 * packages/blade, which the tests and the site's path repository use. They must name the same
 * package with the same runtime requirements and provider, the root's autoload must point into
 * packages/blade, and neither may have a version: Packagist takes it from the tag.
 */
export function composerProblems(root: ComposerJson, blade: ComposerJson): string[] {
  const problems: string[] = [];
  for (const [file, json] of [
    ['composer.json', root],
    ['packages/blade/composer.json', blade],
  ] as const) {
    if ('version' in json) {
      problems.push(`${file} must not have a version: Packagist takes it from the tag.`);
    }
  }
  if (root.name !== blade.name) {
    problems.push(`composer.json names ${root.name}, packages/blade/composer.json ${blade.name}.`);
  }
  const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
  if (!same(root.require, blade.require)) {
    problems.push('composer.json and packages/blade/composer.json require different packages.');
  }
  if (!same(root.extra?.laravel?.providers, blade.extra?.laravel?.providers)) {
    problems.push('composer.json and packages/blade/composer.json register different providers.');
  }
  const autoload = Object.entries(blade.autoload?.['psr-4'] ?? {}).map(
    ([namespace, dir]) => [namespace, `packages/blade/${dir}`] as const,
  );
  if (!same(Object.entries(root.autoload?.['psr-4'] ?? {}), autoload)) {
    problems.push("composer.json's autoload must point at packages/blade's.");
  }
  return problems;
}

/** What the Composer package ships, out of GitHub's archive of a tag (see .gitattributes). */
export const composerDist = [
  'composer.json',
  'LICENSE',
  'README.md',
  'CHANGELOG.md',
  'packages/blade/src/',
  'packages/blade/resources/views/',
  'packages/blade/resources/dist/',
];

/** The files a `composer require` cannot do without. */
const composerNeeds = [
  'composer.json',
  'packages/blade/src/PlinthServiceProvider.php',
  'packages/blade/resources/dist/plinth.css',
  'packages/blade/resources/dist/fonts/index.css',
];

/**
 * What is wrong with an archive's file list (`git archive` piped to `tar -t`): files the
 * Composer package should not ship, and files it needs that are missing.
 */
export function archiveProblems(paths: string[]): string[] {
  const files = paths.filter((path) => !path.endsWith('/'));
  const shipped = (path: string) =>
    composerDist.some((entry) => (entry.endsWith('/') ? path.startsWith(entry) : path === entry));
  return [
    ...files.filter((path) => !shipped(path)).map((path) => `The archive should not ship ${path}.`),
    ...composerNeeds
      .filter((path) => !files.includes(path))
      .map((path) => `The archive is missing ${path}.`),
  ];
}

/**
 * What stops `version` from being released from `root`: workspaces that drifted apart, a root
 * package.json with another version, composer.json files that disagree or carry a version, and,
 * given a tag, one that isn't `v<version>`. `npm run release` and the release workflow both
 * check it.
 */
export function releaseProblems(root: string, tag?: string): string[] {
  let version: string;
  try {
    version = sharedVersion(root);
  } catch (error) {
    return [(error as Error).message];
  }
  const problems: string[] = [];
  const pkg = readPackage(root);
  if (pkg.version !== version) {
    problems.push(
      `package.json is ${pkg.version} but the workspaces are ${version}; run npm run release:version.`,
    );
  }
  const readComposer = (dir: string): ComposerJson =>
    JSON.parse(readFileSync(join(root, dir, 'composer.json'), 'utf8'));
  problems.push(...composerProblems(readComposer('.'), readComposer('packages/blade')));
  if (tag !== undefined && tag !== `v${version}`) {
    problems.push(`The tag is ${tag} but the version is ${version}: it should be v${version}.`);
  }
  return problems;
}

/** A version's section of CHANGELOG.md, without its heading: the notes of its GitHub release. */
export function releaseNotes(changelog: string, version: string): string {
  const lines = changelog.split('\n');
  const start = lines.findIndex(
    (line) => line === `## ${version}` || line.startsWith(`## ${version} `),
  );
  if (start === -1) throw new Error(`CHANGELOG.md has no section for ${version}.`);
  const end = lines.findIndex((line, index) => index > start && line.startsWith('## '));
  return lines
    .slice(start + 1, end === -1 ? undefined : end)
    .join('\n')
    .trim();
}
