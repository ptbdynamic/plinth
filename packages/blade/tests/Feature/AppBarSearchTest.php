<?php

use Illuminate\Support\Facades\Blade;

it('prints a search button with its icon, label and shortcut', function () {
    $html = squish(Blade::render('<x-plinth::app-bar-search shortcut="⌘K" commandfor="search" command="show-modal" />'));

    expect($html)
        ->toStartWith('<button class="plinth-app-bar-search" type="button" commandfor="search" command="show-modal">')
        ->toContain('<span class="plinth-icon" data-size="sm" data-icon="search" aria-hidden="true"><svg')
        ->toEndWith('<span class="plinth-app-bar-search-label">Search</span><kbd class="plinth-app-bar-search-shortcut" aria-hidden="true">⌘K</kbd></button>');
});

it('takes its own label, and prints no hint without a shortcut', function () {
    expect(squish(Blade::render('<x-plinth::app-bar-search label="Find a ticket" shortcut=" " />')))
        ->toEndWith('<span class="plinth-app-bar-search-label">Find a ticket</span></button>');
});

it('needs a label', function () {
    Blade::render('<x-plinth::app-bar-search label=" " />');
})->throws(Exception::class, 'needs a label');

it('escapes the label and the shortcut', function () {
    $html = Blade::render('<x-plinth::app-bar-search :label="$text" :shortcut="$text" />', ['text' => '<b>x</b>']);

    expect($html)
        ->not->toContain('<b>')
        ->toContain('<span class="plinth-app-bar-search-label">&lt;b&gt;x&lt;/b&gt;</span>')
        ->toContain('aria-hidden="true">&lt;b&gt;x&lt;/b&gt;</kbd>');
});

it('passes extra attributes to its root, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::app-bar-search class="is-wide" type="submit" aria-keyshortcuts="Control+K" wire:click="search" x-on:click="open = true" />');

    expect($html)
        ->toContain('class="plinth-app-bar-search is-wide"')
        ->toContain('type="submit"')
        ->not->toContain('type="button"')
        ->toContain('aria-keyshortcuts="Control+K"')
        ->toContain('wire:click="search"')
        ->toContain('x-on:click="open = true"');
});
