<?php

use BDynamic\Plinth\Enums\Size;
use Illuminate\Support\Facades\Blade;

it('prints the label, the select, the options, the description and the error', function () {
    $html = Blade::render('<x-plinth::select id="role" label="Role" description="What it may do." error="Choose a role."><option value="a">A</option></x-plinth::select>');

    expect(squish($html))->toBe(
        '<div class="plinth-select" data-size="md">'
        .'<label class="plinth-select-label" for="role">Role</label>'
        .'<div class="plinth-select-control">'
        .'<select id="role" class="plinth-select-input" aria-describedby="role-description role-error" aria-invalid="true">'
        .'<option value="a">A</option>'
        .'</select>'
        .'</div>'
        .'<p id="role-description" class="plinth-select-description">What it may do.</p>'
        .'<p id="role-error" class="plinth-select-error">Choose a role.</p>'
        .'</div>'
    );
});

it('is of size md by default, with nothing to describe it', function () {
    $html = Blade::render('<x-plinth::select id="role" label="Role"><option>A</option></x-plinth::select>');

    expect($html)
        ->toContain('data-size="md"')
        ->not->toContain('aria-describedby')
        ->not->toContain('aria-invalid')
        ->not->toContain('data-label')
        ->not->toContain('disabled')
        ->not->toContain('required')
        ->not->toContain('value=""');
});

it('takes the sm size, as a string or a case, and falls back to md for any other', function () {
    expect(Blade::render('<x-plinth::select id="a" label="A" size="sm" />'))->toContain('data-size="sm"')
        ->and(Blade::render('<x-plinth::select id="a" label="A" :size="$size" />', ['size' => Size::Small]))->toContain('data-size="sm"')
        ->and(Blade::render('<x-plinth::select id="a" label="A" size="lg" />'))->toContain('data-size="md"');
});

it('hides the label visually, and is disabled or required', function () {
    expect(Blade::render('<x-plinth::select id="a" label="A" hide-label />'))->toContain('data-label="hidden"')
        ->and(Blade::render('<x-plinth::select id="a" label="A" disabled />'))->toContain(' disabled')
        ->and(Blade::render('<x-plinth::select id="a" label="A" required />'))->toContain(' required');
});

it('prints a disabled, selected first option for the placeholder', function () {
    $html = Blade::render('<x-plinth::select id="a" label="A" placeholder="Choose one"><option value="x">X</option></x-plinth::select>');

    expect(squish($html))->toContain('<select id="a" class="plinth-select-input"><option value="" disabled selected>Choose one</option><option value="x">X</option></select>');
    expect(Blade::render('<x-plinth::select id="a" label="A" placeholder=" " />'))->not->toContain('<option');
});

it('prints option groups as they are given', function () {
    $html = Blade::render('<x-plinth::select id="a" label="A"><optgroup label="G"><option value="x" selected>X</option></optgroup></x-plinth::select>');

    expect(squish($html))->toContain('<optgroup label="G"><option value="x" selected>X</option></optgroup>');
});

it('generates an id when it has none, and points the label at it', function () {
    $html = Blade::render('<x-plinth::select label="Role" description="Help" />');

    preg_match('/<select id="(plinth-select-[a-z0-9]{8})"/', $html, $match);
    expect($match)->toHaveCount(2)
        ->and($html)->toContain('for="'.$match[1].'"')
        ->toContain('aria-describedby="'.$match[1].'-description"');
});

it('needs a label', function () {
    Blade::render('<x-plinth::select id="a" label=" " />');
})->throws(Exception::class, 'needs a label');

it('escapes the text', function () {
    $html = Blade::render('<x-plinth::select id="a" :label="$text" :description="$text" :error="$text" :placeholder="$text" />', ['text' => '<b>x</b>']);

    expect($html)->not->toContain('<b>')->toContain('&lt;b&gt;x&lt;/b&gt;');
});

it('puts the class on the root and every other attribute on the select, where it wins', function () {
    $html = Blade::render('<x-plinth::select id="role" label="Role" description="Help" class="mb-4" name="role" wire:model.live="role" x-model="role" data-testid="role" aria-describedby="mine" />');

    expect(squish($html))
        ->toContain('<div class="plinth-select mb-4" data-size="md">')
        ->toContain('<select id="role" class="plinth-select-input" aria-describedby="mine" name="role" wire:model.live="role" x-model="role" data-testid="role">');
});
