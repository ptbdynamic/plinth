<?php

use BDynamic\Plinth\Enums\HeadingLevel;
use Illuminate\Support\Facades\Blade;

it('prints a group with its heading and items', function () {
    expect(squish(Blade::render('<x-plinth::nav-list-group heading="Views"><i>items</i></x-plinth::nav-list-group>')))
        ->toBe('<div class="plinth-nav-list-group"><h2 class="plinth-nav-list-heading">Views</h2><i>items</i></div>');
});

it('leaves out a blank heading', function () {
    expect(squish(Blade::render('<x-plinth::nav-list-group heading=" "><i>x</i></x-plinth::nav-list-group>')))
        ->toBe('<div class="plinth-nav-list-group"><i>x</i></div>');
});

it('takes a heading level, as a string or the enum, and falls back to h2', function () {
    expect(squish(Blade::render('<x-plinth::nav-list-group heading="Views" heading-level="h4">x</x-plinth::nav-list-group>')))
        ->toContain('<h4 class="plinth-nav-list-heading">Views</h4>');
    expect(squish(Blade::render('<x-plinth::nav-list-group heading="Views" :heading-level="$level">x</x-plinth::nav-list-group>', ['level' => HeadingLevel::Three])))
        ->toContain('<h3 class="plinth-nav-list-heading">Views</h3>');
    expect(squish(Blade::render('<x-plinth::nav-list-group heading="Views" heading-level="h1">x</x-plinth::nav-list-group>')))
        ->toContain('<h2 class="plinth-nav-list-heading">Views</h2>');
});

it('escapes the heading', function () {
    $html = Blade::render('<x-plinth::nav-list-group :heading="$text">x</x-plinth::nav-list-group>', ['text' => '<b>x</b>']);

    expect($html)
        ->not->toContain('<b>')
        ->toContain('&lt;b&gt;x&lt;/b&gt;');
});

it('passes extra attributes to its root, and adds the class', function () {
    $html = Blade::render('<x-plinth::nav-list-group class="is-pinned" data-testid="views" aria-describedby="help">x</x-plinth::nav-list-group>');

    expect($html)
        ->toContain('class="plinth-nav-list-group is-pinned"')
        ->toContain('data-testid="views"')
        ->toContain('aria-describedby="help"');
});
