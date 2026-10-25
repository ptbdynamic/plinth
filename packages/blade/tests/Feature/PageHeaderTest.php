<?php

use BDynamic\Plinth\Enums\PageHeaderLevel;
use Illuminate\Support\Facades\Blade;

it('prints the page header, the leading action, the heading and the actions', function () {
    $html = Blade::render(
        '<x-plinth::page-header heading="Inbox">'
        .'<x-slot:leading><a href="/">Back</a></x-slot:leading>'
        .'<x-slot:actions><button type="button">Search</button></x-slot:actions>'
        .'</x-plinth::page-header>'
    );

    expect(squish($html))->toBe(
        '<header class="plinth-page-header">'
        .'<div class="plinth-page-header-leading"><a href="/">Back</a></div>'
        .'<h1 class="plinth-page-header-heading">Inbox</h1>'
        .'<div class="plinth-page-header-actions"><button type="button">Search</button></div>'
        .'</header>'
    );
});

it('prints only the heading without a leading action or actions', function () {
    expect(squish(Blade::render('<x-plinth::page-header heading="Settings" />')))
        ->toBe('<header class="plinth-page-header"><h1 class="plinth-page-header-heading">Settings</h1></header>');
});

it('leaves out blank slots', function () {
    $html = Blade::render(
        '<x-plinth::page-header heading="Settings"><x-slot:leading> </x-slot:leading><x-slot:actions>'
        .'@if (false) x @endif</x-slot:actions></x-plinth::page-header>'
    );

    expect($html)
        ->not->toContain('plinth-page-header-leading')
        ->not->toContain('plinth-page-header-actions');
});

it('prints the heading at the level asked for, and h1 for one it does not know', function () {
    $heading = fn ($level) => Blade::render('<x-plinth::page-header heading="Ticket" :level="$level" />', ['level' => $level]);

    expect($heading('h2'))->toContain('<h2 class="plinth-page-header-heading">Ticket</h2>')
        ->and($heading(PageHeaderLevel::Six))->toContain('<h6 class="plinth-page-header-heading">Ticket</h6>')
        ->and($heading('h7'))->toContain('<h1 class="plinth-page-header-heading">Ticket</h1>')
        ->and($heading(null))->toContain('<h1 class="plinth-page-header-heading">Ticket</h1>');
});

it('marks the screen\'s top bar with data-top', function () {
    expect(Blade::render('<x-plinth::page-header heading="Inbox" top />'))
        ->toContain('<header class="plinth-page-header" data-top="">')
        ->and(Blade::render('<x-plinth::page-header heading="Inbox" :top="false" />'))
        ->not->toContain('data-top');
});

it('needs a heading', function () {
    foreach (['<x-plinth::page-header />', '<x-plinth::page-header heading=" " />'] as $template) {
        expect(fn () => Blade::render($template))->toThrow(Exception::class, 'needs a heading');
    }
});

it('escapes the heading', function () {
    expect(Blade::render('<x-plinth::page-header :heading="$heading" />', ['heading' => '<b>x</b>']))
        ->toContain('<h1 class="plinth-page-header-heading">&lt;b&gt;x&lt;/b&gt;</h1>');
});

it('keeps extra classes and attributes on the root, the title attribute too', function () {
    $html = Blade::render(
        '<x-plinth::page-header heading="Inbox" title="Your inbox" class="app-header" id="top" wire:key="header" x-ref="header" data-testid="header" aria-label="Inbox" />'
    );

    expect($html)
        ->toContain('class="plinth-page-header app-header"')
        ->toContain('title="Your inbox"')
        ->toContain('id="top"')
        ->toContain('wire:key="header"')
        ->toContain('x-ref="header"')
        ->toContain('data-testid="header"')
        ->toContain('aria-label="Inbox"');
});

it('lets the project\'s data-top win over its own', function () {
    expect(Blade::render('<x-plinth::page-header heading="Inbox" top data-top="notch" />'))
        ->toContain('data-top="notch"')
        ->not->toContain('data-top=""');
});
