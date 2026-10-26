<?php

use Illuminate\Support\Facades\Blade;

it('prints the input, the label, the description and the error', function () {
    $html = Blade::render('<x-plinth::checkbox id="updates" label="Email me updates" description="Once a month." error="Choose one." />');

    expect(squish($html))->toBe(
        '<div class="plinth-checkbox">'
        .'<input id="updates" type="checkbox" class="plinth-checkbox-input" aria-describedby="updates-description updates-error" aria-invalid="true">'
        .'<label class="plinth-checkbox-label" for="updates">Email me updates</label>'
        .'<p id="updates-description" class="plinth-checkbox-description">Once a month.</p>'
        .'<p id="updates-error" class="plinth-checkbox-error">Choose one.</p>'
        .'</div>'
    );
});

it('is unchecked and enabled by default, with nothing to describe it', function () {
    $html = Blade::render('<x-plinth::checkbox id="a" label="A" description=" " error="" />');

    expect($html)
        ->not->toContain('checked')
        ->not->toContain('disabled')
        ->not->toContain('aria-describedby')
        ->not->toContain('aria-invalid')
        ->not->toContain('x-init')
        ->not->toContain('<p');
});

it('is checked, disabled or indeterminate', function () {
    expect(Blade::render('<x-plinth::checkbox id="a" label="A" checked />'))->toContain(' checked')
        ->and(Blade::render('<x-plinth::checkbox id="a" label="A" disabled />'))->toContain(' disabled')
        ->and(Blade::render('<x-plinth::checkbox id="a" label="A" indeterminate />'))->toContain('x-init="$el.indeterminate = true"');
});

it('generates an id when it has none, and points the label at it', function () {
    $html = Blade::render('<x-plinth::checkbox label="A" description="Help" />');

    preg_match('/<input id="(plinth-checkbox-[a-z0-9]{8})"/', $html, $match);
    expect($match)->toHaveCount(2)
        ->and($html)->toContain('for="'.$match[1].'"')
        ->toContain('aria-describedby="'.$match[1].'-description"');
});

it('needs a label', function () {
    Blade::render('<x-plinth::checkbox id="a" label=" " />');
})->throws(Exception::class, 'needs a label');

it('escapes the text', function () {
    $html = Blade::render('<x-plinth::checkbox id="a" :label="$text" :description="$text" :error="$text" :value="$text" />', ['text' => '<b>x</b>']);

    expect($html)->not->toContain('<b>')->toContain('&lt;b&gt;x&lt;/b&gt;');
});

it('puts the class on the root and every other attribute on the input, where it wins', function () {
    $html = Blade::render('<x-plinth::checkbox id="terms" label="Terms" description="Help" class="mb-4" name="terms" value="1" wire:model.live="terms" x-model="terms" data-testid="terms" aria-describedby="mine" />');

    expect(squish($html))
        ->toContain('<div class="plinth-checkbox mb-4">')
        ->toContain('<input id="terms" type="checkbox" class="plinth-checkbox-input" aria-describedby="mine" name="terms" value="1" wire:model.live="terms" x-model="terms" data-testid="terms">');
});
