<?php

use Illuminate\Support\Facades\Blade;

it('prints a link with its icon, label and count', function () {
    $html = Blade::render('<x-plinth::app-nav-item href="/support" count="12"><x-slot:icon><svg></svg></x-slot:icon> Support</x-plinth::app-nav-item>');

    expect(squish($html))->toBe(
        '<a class="plinth-app-nav-item" href="/support"><span class="plinth-app-nav-icon" aria-hidden="true"><svg></svg></span><span class="plinth-app-nav-label">Support</span><span class="plinth-app-nav-count">12</span></a>'
    );
});

it('marks the current page', function () {
    expect(squish(Blade::render('<x-plinth::app-nav-item href="/content" current>Content</x-plinth::app-nav-item>')))
        ->toBe('<a class="plinth-app-nav-item" href="/content" aria-current="page"><span class="plinth-app-nav-label">Content</span></a>');
});

it('prints a zero count, and leaves out a blank one, a blank icon and a blank href', function () {
    expect(squish(Blade::render('<x-plinth::app-nav-item href="/a" :count="0">A</x-plinth::app-nav-item>')))
        ->toContain('<span class="plinth-app-nav-count">0</span>');
    expect(squish(Blade::render('<x-plinth::app-nav-item href=" " count=" "><x-slot:icon> </x-slot:icon> A</x-plinth::app-nav-item>')))
        ->toBe('<a class="plinth-app-nav-item"><span class="plinth-app-nav-label">A</span></a>');
});

it('escapes the label, the count and the href', function () {
    $html = Blade::render(
        '<x-plinth::app-nav-item :href="$text" :count="$text">{{ $text }}</x-plinth::app-nav-item>',
        ['text' => '"><b>x</b>'],
    );

    expect($html)
        ->not->toContain('<b>')
        ->toContain('href="&quot;&gt;&lt;b&gt;x&lt;/b&gt;"')
        ->toContain('<span class="plinth-app-nav-count">&quot;&gt;&lt;b&gt;x&lt;/b&gt;</span>');
});

it('passes extra attributes to its link, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::app-nav-item href="/a" current class="is-new" aria-current="location" wire:navigate x-on:click="open = false">A</x-plinth::app-nav-item>');

    expect($html)
        ->toContain('class="plinth-app-nav-item is-new"')
        ->toContain('aria-current="location"')
        ->not->toContain('aria-current="page"')
        ->toContain('wire:navigate')
        ->toContain('x-on:click="open = false"');
});
