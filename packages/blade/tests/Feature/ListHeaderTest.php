<?php

use BDynamic\Plinth\Enums\HeadingLevel;
use Illuminate\Support\Facades\Blade;
use Illuminate\View\ViewException;

it('prints the list header markup contract', function () {
    expect(squish(Blade::render('<x-plinth::list-header heading="Open" count="12" />')))
        ->toBe('<div class="plinth-list-header"><h2 class="plinth-list-header-heading"><span class="plinth-list-header-title">Open</span><span class="plinth-list-header-count">12</span></h2><p class="plinth-list-header-selection" role="status"></p></div>');
});

it('prints the actions', function () {
    $html = squish(Blade::render(<<<'BLADE'
        <x-plinth::list-header heading="Open">
            <x-slot:actions><button type="button">Sort</button></x-slot:actions>
        </x-plinth::list-header>
        BLADE));

    expect($html)->toContain('<div class="plinth-list-header-actions"><button type="button">Sort</button></div>');
});

it('leaves out an empty actions slot, a blank count, and keeps a count of 0', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::list-header heading="Open" count=" ">
            <x-slot:actions> </x-slot:actions>
        </x-plinth::list-header>
        BLADE);

    expect($html)
        ->not->toContain('plinth-list-header-actions')
        ->not->toContain('plinth-list-header-count');
    expect(Blade::render('<x-plinth::list-header heading="Spam" :count="0" />'))
        ->toContain('<span class="plinth-list-header-count">0</span>');
});

it('says how many are selected while selecting', function () {
    expect(Blade::render('<x-plinth::list-header heading="Open" selection="2 selected" />'))
        ->toStartWith('<div class="plinth-list-header is-selecting">')
        ->toContain('<p class="plinth-list-header-selection" role="status">2 selected</p>');
    expect(Blade::render('<x-plinth::list-header heading="Open" selection=" " />'))
        ->toStartWith('<div class="plinth-list-header">');
});

it('takes the heading level as a string or the enum, and falls back to h2', function () {
    expect(Blade::render('<x-plinth::list-header heading="Open" heading-level="h4" />'))
        ->toContain('<h4 class="plinth-list-header-heading">');
    expect(Blade::render('<x-plinth::list-header heading="Open" :heading-level="$level" />', ['level' => HeadingLevel::Three]))
        ->toContain('<h3 class="plinth-list-header-heading">');
    expect(Blade::render('<x-plinth::list-header heading="Open" heading-level="h1" />'))
        ->toContain('<h2 class="plinth-list-header-heading">');
});

it('needs a heading', function () {
    Blade::render('<x-plinth::list-header heading=" " />');
})->throws(ViewException::class, 'needs a heading');

it('escapes the text', function () {
    $html = Blade::render(
        '<x-plinth::list-header :heading="$text" :count="$text" :selection="$text" />',
        ['text' => '<b>x</b>'],
    );

    expect($html)
        ->not->toContain('<b>')
        ->toContain('&lt;b&gt;x&lt;/b&gt;');
});

it('keeps extra classes and attributes', function () {
    $html = Blade::render('<x-plinth::list-header heading="Open" class="mb-4" id="open" data-testid="open" />');

    expect($html)
        ->toContain('class="plinth-list-header mb-4"')
        ->toContain('id="open"')
        ->toContain('data-testid="open"');
});
