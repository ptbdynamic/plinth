<?php

use BDynamic\Plinth\Enums\HeadingLevel;
use Illuminate\Support\Facades\Blade;

it('prints the empty state with its icon, heading, description and actions', function () {
    $html = Blade::render(
        '<x-plinth::empty-state heading="No runs yet" description="Runs show here once a workflow starts.">'
        .'<x-slot:icon><span class="plinth-icon" data-size="md" aria-hidden="true"><svg></svg></span></x-slot:icon>'
        .'<x-slot:actions><a href="/runs/new">Start a run</a></x-slot:actions>'
        .'</x-plinth::empty-state>'
    );

    expect(squish($html))->toBe(
        '<div class="plinth-empty-state">'
        .'<div class="plinth-empty-state-icon"><span class="plinth-icon" data-size="md" aria-hidden="true"><svg></svg></span></div>'
        .'<h2 class="plinth-empty-state-heading">No runs yet</h2>'
        .'<p class="plinth-empty-state-description">Runs show here once a workflow starts.</p>'
        .'<div class="plinth-empty-state-actions"><a href="/runs/new">Start a run</a></div>'
        .'</div>'
    );
});

it('prints only the heading without the optional parts', function () {
    expect(squish(Blade::render('<x-plinth::empty-state heading="Nothing is waiting on you" />')))
        ->toBe('<div class="plinth-empty-state"><h2 class="plinth-empty-state-heading">Nothing is waiting on you</h2></div>');
});

it('leaves out a blank description and blank slots', function () {
    $html = Blade::render(
        '<x-plinth::empty-state heading="No runs yet" description=" "><x-slot:icon> </x-slot:icon><x-slot:actions>'
        .'@if (false) x @endif</x-slot:actions></x-plinth::empty-state>'
    );

    expect($html)
        ->not->toContain('plinth-empty-state-description')
        ->not->toContain('plinth-empty-state-icon')
        ->not->toContain('plinth-empty-state-actions');
});

it('prints the heading at the level asked for, and h2 for one it does not know', function () {
    $heading = fn ($level) => Blade::render('<x-plinth::empty-state heading="No runs yet" :heading-level="$level" />', ['level' => $level]);

    expect($heading('h3'))->toContain('<h3 class="plinth-empty-state-heading">No runs yet</h3>')
        ->and($heading(HeadingLevel::Six))->toContain('<h6 class="plinth-empty-state-heading">No runs yet</h6>')
        ->and($heading('h1'))->toContain('<h2 class="plinth-empty-state-heading">No runs yet</h2>')
        ->and($heading(null))->toContain('<h2 class="plinth-empty-state-heading">No runs yet</h2>');
});

it('marks the framed variant with data-framed', function () {
    expect(Blade::render('<x-plinth::empty-state heading="No runs yet" framed />'))
        ->toContain('<div class="plinth-empty-state" data-framed="">')
        ->and(Blade::render('<x-plinth::empty-state heading="No runs yet" :framed="false" />'))
        ->not->toContain('data-framed');
});

it('needs a heading', function () {
    foreach (['<x-plinth::empty-state />', '<x-plinth::empty-state heading=" " />'] as $template) {
        expect(fn () => Blade::render($template))->toThrow(Exception::class, 'needs a heading');
    }
});

it('escapes the heading and the description', function () {
    $html = Blade::render('<x-plinth::empty-state :heading="$text" :description="$text" />', ['text' => '<b>x</b>']);

    expect($html)
        ->toContain('<h2 class="plinth-empty-state-heading">&lt;b&gt;x&lt;/b&gt;</h2>')
        ->toContain('<p class="plinth-empty-state-description">&lt;b&gt;x&lt;/b&gt;</p>');
});

it('keeps extra classes and attributes on the root', function () {
    $html = Blade::render(
        '<x-plinth::empty-state heading="No runs yet" class="app-empty" id="runs-empty" role="status" wire:key="empty" x-show="!runs.length" data-testid="empty" aria-live="polite" />'
    );

    expect($html)
        ->toContain('class="plinth-empty-state app-empty"')
        ->toContain('id="runs-empty"')
        ->toContain('role="status"')
        ->toContain('wire:key="empty"')
        ->toContain('x-show="!runs.length"')
        ->toContain('data-testid="empty"')
        ->toContain('aria-live="polite"');
});

it('lets a project\'s data-framed win over its own', function () {
    expect(Blade::render('<x-plinth::empty-state heading="No runs yet" framed data-framed="project" />'))
        ->toContain('data-framed="project"')
        ->not->toContain('data-framed=""');
});
