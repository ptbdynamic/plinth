import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  archiveProblems,
  bumpOf,
  changelogSection,
  composerProblems,
  prependSection,
  readPackage,
  sharedVersion,
  versioned,
} from './lib.ts';

const changeset = (summary: string, ...types: ('major' | 'minor' | 'patch' | 'none')[]) => ({
  summary,
  releases: types.map((type, index) => ({ name: `package-${index}`, type })),
});

describe('bumpOf', () => {
  it('takes the largest bump a changeset asks for', () => {
    expect(bumpOf(changeset('a', 'patch', 'minor'))).toBe('minor');
    expect(bumpOf(changeset('a', 'patch', 'major', 'minor'))).toBe('major');
    expect(bumpOf(changeset('a', 'patch'))).toBe('patch');
    expect(bumpOf(changeset('a', 'none'))).toBe('none');
    expect(bumpOf(changeset('a'))).toBe('none');
  });
});

describe('changelogSection', () => {
  it('groups the changesets by bump, largest first', () => {
    const section = changelogSection(
      '1.2.0',
      [
        changeset('Fix the badge in forced colours', 'patch'),
        changeset('Add the avatar', 'minor', 'patch'),
        changeset('Not shown', 'none'),
      ],
      '2026-10-19',
    );
    expect(section).toBe(
      [
        '## 1.2.0 (2026-10-19)',
        '',
        '### New',
        '',
        '- Add the avatar',
        '',
        '### Fixes',
        '',
        '- Fix the badge in forced colours',
      ].join('\n'),
    );
  });

  it('indents the lines after the first, so a long entry stays one item', () => {
    const section = changelogSection(
      '2.0.0',
      [changeset('Rename the tokens\n\nSee ADR 1.\n', 'major')],
      'today',
    );
    expect(section).toBe(
      [
        '## 2.0.0 (today)',
        '',
        '### Breaking changes',
        '',
        '- Rename the tokens',
        '',
        '  See ADR 1.',
      ].join('\n'),
    );
  });
});

describe('prependSection', () => {
  it('starts a changelog', () => {
    expect(prependSection('', '## 0.1.0')).toBe('# Changelog\n\n## 0.1.0\n');
  });

  it('puts the new section above the older ones', () => {
    expect(prependSection('# Changelog\n\n## 0.1.0\n', '## 0.2.0')).toBe(
      '# Changelog\n\n## 0.2.0\n\n## 0.1.0\n',
    );
  });

  it('keeps a changelog that has no title', () => {
    expect(prependSection('## 0.1.0\n', '## 0.2.0')).toBe('# Changelog\n\n## 0.2.0\n\n## 0.1.0\n');
  });
});

describe('sharedVersion', () => {
  const workspace = (versions: string[]) => {
    const root = mkdtempSync(join(tmpdir(), 'plinth-release-'));
    writeFileSync(
      join(root, 'package.json'),
      JSON.stringify({ name: '@bdynamic/plinth', version: '0.0.0' }),
    );
    versioned.forEach((dir, index) => {
      mkdirSync(join(root, dir), { recursive: true });
      writeFileSync(
        join(root, dir, 'package.json'),
        JSON.stringify({ name: dir, version: versions[index] }),
      );
    });
    return root;
  };

  it('returns the version the packages share', () => {
    const root = workspace(['0.2.0', '0.2.0', '0.2.0', '0.2.0', '0.2.0']);
    expect(sharedVersion(root)).toBe('0.2.0');
    expect(readPackage(root)).toEqual({ name: '@bdynamic/plinth', version: '0.0.0' });
  });

  it('refuses packages that have drifted apart', () => {
    expect(() => sharedVersion(workspace(['0.2.0', '0.2.0', '0.1.0', '0.2.0', '0.2.0']))).toThrow(
      'The packages should share one version, but they have packages/tokens 0.2.0, packages/css 0.2.0, packages/vue 0.1.0, packages/react 0.2.0, packages/blade 0.2.0.',
    );
  });
});

describe('composerProblems', () => {
  const blade = {
    name: 'ptbdynamic/plinth',
    require: { php: '^8.3' },
    autoload: { 'psr-4': { 'BDynamic\\Plinth\\': 'src/' } },
    extra: { laravel: { providers: ['BDynamic\\Plinth\\PlinthServiceProvider'] } },
  };
  const root = {
    ...blade,
    autoload: { 'psr-4': { 'BDynamic\\Plinth\\': 'packages/blade/src/' } },
  };

  it('accepts a root composer.json that points at packages/blade', () => {
    expect(composerProblems(root, blade)).toEqual([]);
  });

  it('lists what has drifted apart', () => {
    expect(
      composerProblems(
        { version: '1.0.0', name: 'ptbdynamic/other', require: {} },
        { ...blade, version: '1.0.0' },
      ),
    ).toEqual([
      'composer.json must not have a version: Packagist takes it from the tag.',
      'packages/blade/composer.json must not have a version: Packagist takes it from the tag.',
      'composer.json names ptbdynamic/other, packages/blade/composer.json ptbdynamic/plinth.',
      'composer.json and packages/blade/composer.json require different packages.',
      'composer.json and packages/blade/composer.json register different providers.',
      "composer.json's autoload must point at packages/blade's.",
    ]);
  });

  it('reads composer.json files without autoload or providers', () => {
    expect(composerProblems({ name: 'a' }, { name: 'a' })).toEqual([]);
  });
});

describe('archiveProblems', () => {
  const needed = [
    'composer.json',
    'packages/blade/src/PlinthServiceProvider.php',
    'packages/blade/resources/dist/plinth.css',
    'packages/blade/resources/dist/fonts/index.css',
  ];

  it('accepts the Blade package and its built CSS', () => {
    expect(
      archiveProblems([
        ...needed,
        'LICENSE',
        'README.md',
        'packages/',
        'packages/blade/',
        'packages/blade/resources/views/components/badge.blade.php',
      ]),
    ).toEqual([]);
  });

  it('lists what should not ship and what is missing', () => {
    expect(
      archiveProblems([...needed.slice(1), 'package.json', 'packages/blade/tests/Pest.php']),
    ).toEqual([
      'The archive should not ship package.json.',
      'The archive should not ship packages/blade/tests/Pest.php.',
      'The archive is missing composer.json.',
    ]);
  });
});
