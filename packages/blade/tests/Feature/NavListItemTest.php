<?php

use Illuminate\Support\Facades\Blade;

it('prints a link with its label and count', function () {
    expect(squish(Blade::render('<x-plinth::nav-list-item href="/open" count="12">Open</x-plinth::nav-list-item>')))
        ->toBe('<a class="plinth-nav-list-item" href="/open"><span class="plinth-nav-list-label">Open</span><span class="plinth-nav-list-count">12</span></a>');
});

it('marks the current view', function () {
    expect(squish(Blade::render('<x-plinth::nav-list-item href="/open" current>Open</x-plinth::nav-list-item>')))
        ->toBe('<a class="plinth-nav-list-item" href="/open" aria-current="page"><span class="plinth-nav-list-label">Open</span></a>');
});

it('prints a zero count, and leaves out a blank one and a blank href', function () {
    expect(squish(Blade::render('<x-plinth::nav-list-item href="/a" :count="0">A</x-plinth::nav-list-item>')))
        ->toContain('<span class="plinth-nav-list-count">0</span>');
    expect(squish(Blade::render('<x-plinth::nav-list-item href=" " count=" ">A</x-plinth::nav-list-item>')))
        ->toBe('<a class="plinth-nav-list-item"><span class="plinth-nav-list-label">A</span></a>');
});

it('escapes the label, the count and the href', function () {
    $html = Blade::render(
        '<x-plinth::nav-list-item :href="$text" :count="$text">{{ $text }}</x-plinth::nav-list-item>',
        ['text' => '"><b>x</b>'],
    );

    expect($html)
        ->not->toContain('<b>')
        ->toContain('href="&quot;&gt;&lt;b&gt;x&lt;/b&gt;"')
        ->toContain('<span class="plinth-nav-list-label">&quot;&gt;&lt;b&gt;x&lt;/b&gt;</span>')
        ->toContain('<span class="plinth-nav-list-count">&quot;&gt;&lt;b&gt;x&lt;/b&gt;</span>');
});

it('passes extra attributes to its link, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::nav-list-item href="/a" current class="is-new" aria-current="location" wire:navigate>A</x-plinth::nav-list-item>');

    expect($html)
        ->toContain('class="plinth-nav-list-item is-new"')
        ->toContain('aria-current="location"')
        ->not->toContain('aria-current="page"')
        ->toContain('wire:navigate');
});
