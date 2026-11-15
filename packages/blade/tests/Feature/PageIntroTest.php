<?php

use BDynamic\Plinth\Enums\PageHeaderLevel;
use Illuminate\Support\Facades\Blade;

it('prints the page intro, the heading, the description and the actions', function () {
    $html = Blade::render(
        '<x-plinth::page-intro heading="Users" description="Who can sign in." description-id="users-description">'
        .'<x-slot:actions><button type="button">Invite user</button></x-slot:actions>'
        .'</x-plinth::page-intro>'
    );

    expect(squish($html))->toBe(
        '<div class="plinth-page-intro">'
        .'<div class="plinth-page-intro-text">'
        .'<h1 class="plinth-page-intro-heading">Users</h1>'
        .'<p class="plinth-page-intro-description" id="users-description">Who can sign in.</p>'
        .'</div>'
        .'<div class="plinth-page-intro-actions"><button type="button">Invite user</button></div>'
        .'</div>'
    );
});

it('prints only the heading without a description or actions', function () {
    expect(squish(Blade::render('<x-plinth::page-intro heading="Settings" />')))->toBe(
        '<div class="plinth-page-intro"><div class="plinth-page-intro-text">'
        .'<h1 class="plinth-page-intro-heading">Settings</h1></div></div>'
    );
});

it('leaves out a blank description, description id and actions', function () {
    $html = Blade::render(
        '<x-plinth::page-intro heading="Users" description=" " description-id="d">'
        .'<x-slot:actions>@if (false) x @endif</x-slot:actions></x-plinth::page-intro>'
    );

    expect($html)
        ->not->toContain('plinth-page-intro-description')
        ->not->toContain('plinth-page-intro-actions')
        ->and(Blade::render('<x-plinth::page-intro heading="Users" description="Who" description-id=" " />'))
        ->toContain('<p class="plinth-page-intro-description">Who</p>');
});

it('prints the heading at the level asked for, and h1 for one it does not know', function () {
    $heading = fn ($level) => Blade::render('<x-plinth::page-intro heading="Users" :level="$level" />', ['level' => $level]);

    expect($heading('h2'))->toContain('<h2 class="plinth-page-intro-heading">Users</h2>')
        ->and($heading(PageHeaderLevel::Six))->toContain('<h6 class="plinth-page-intro-heading">Users</h6>')
        ->and($heading('h7'))->toContain('<h1 class="plinth-page-intro-heading">Users</h1>')
        ->and($heading(null))->toContain('<h1 class="plinth-page-intro-heading">Users</h1>');
});

it('shows from 768px only with wide-only', function () {
    expect(Blade::render('<x-plinth::page-intro heading="Users" wide-only />'))
        ->toContain('<div class="plinth-page-intro" data-wide-only="">')
        ->and(Blade::render('<x-plinth::page-intro heading="Users" :wide-only="false" />'))
        ->not->toContain('data-wide-only');
});

it('needs a heading', function () {
    foreach (['<x-plinth::page-intro />', '<x-plinth::page-intro heading=" " />'] as $template) {
        expect(fn () => Blade::render($template))->toThrow(Exception::class, 'needs a heading');
    }
});

it('escapes the heading, the description and its id', function () {
    $html = Blade::render(
        '<x-plinth::page-intro :heading="$heading" :description="$description" :description-id="$id" />',
        ['heading' => '<b>Users</b>', 'description' => '<i>Who</i>', 'id' => '"users"'],
    );

    expect($html)
        ->toContain('<h1 class="plinth-page-intro-heading">&lt;b&gt;Users&lt;/b&gt;</h1>')
        ->toContain('id="&quot;users&quot;">&lt;i&gt;Who&lt;/i&gt;</p>');
});

it('keeps extra classes and attributes on the root', function () {
    $html = Blade::render(
        '<x-plinth::page-intro heading="Users" class="mb-4" id="intro" wire:key="intro" x-ref="intro" data-testid="intro" aria-label="Users" />'
    );

    expect($html)
        ->toContain('class="plinth-page-intro mb-4"')
        ->toContain('id="intro"')
        ->toContain('wire:key="intro"')
        ->toContain('x-ref="intro"')
        ->toContain('data-testid="intro"')
        ->toContain('aria-label="Users"');
});

it('lets the project\'s data-wide-only win over its own', function () {
    expect(Blade::render('<x-plinth::page-intro heading="Users" wide-only data-wide-only="desktop" />'))
        ->toContain('data-wide-only="desktop"')
        ->not->toContain('data-wide-only=""');
});
