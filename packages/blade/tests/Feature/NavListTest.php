<?php

use Illuminate\Support\Facades\Blade;

it('prints a named nav with its groups', function () {
    expect(squish(Blade::render('<x-plinth::nav-list label="Folders"><i>groups</i></x-plinth::nav-list>')))
        ->toBe('<nav class="plinth-nav-list" aria-label="Folders"><i>groups</i></nav>');
});

it('leaves out a blank label', function () {
    expect(squish(Blade::render('<x-plinth::nav-list label=" ">x</x-plinth::nav-list>')))
        ->toBe('<nav class="plinth-nav-list">x</nav>');
});

it('escapes the label', function () {
    $html = Blade::render('<x-plinth::nav-list :label="$text">x</x-plinth::nav-list>', ['text' => '"><b>x</b>']);

    expect($html)
        ->not->toContain('<b>')
        ->toContain('aria-label="&quot;&gt;&lt;b&gt;x&lt;/b&gt;"');
});

it('passes extra attributes to its root, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::nav-list label="Folders" class="is-wide" id="folders" aria-label="Mail" wire:key="folders">x</x-plinth::nav-list>');

    expect($html)
        ->toContain('class="plinth-nav-list is-wide"')
        ->toContain('id="folders"')
        ->toContain('aria-label="Mail"')
        ->not->toContain('aria-label="Folders"')
        ->toContain('wire:key="folders"');
});
