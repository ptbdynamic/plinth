<?php

use Illuminate\Support\Facades\Blade;

it('prints the input with the switch role, the label, the description and the error', function () {
    $html = Blade::render('<x-plinth::switch id="enabled" label="Enabled" description="People can sign in." error="Add a client ID." />');

    expect(squish($html))->toBe(
        '<div class="plinth-switch">'
        .'<input id="enabled" type="checkbox" role="switch" class="plinth-switch-input" aria-describedby="enabled-description enabled-error" aria-invalid="true">'
        .'<label class="plinth-switch-label" for="enabled">Enabled</label>'
        .'<p id="enabled-description" class="plinth-switch-description">People can sign in.</p>'
        .'<p id="enabled-error" class="plinth-switch-error">Add a client ID.</p>'
        .'</div>'
    );
});

it('is off and enabled by default, with nothing to describe it', function () {
    $html = Blade::render('<x-plinth::switch id="a" label="A" description=" " error="" />');

    expect($html)
        ->not->toContain('checked')
        ->not->toContain('disabled')
        ->not->toContain('aria-describedby')
        ->not->toContain('aria-invalid')
        ->not->toContain('<p');
});

it('is on or disabled', function () {
    expect(Blade::render('<x-plinth::switch id="a" label="A" checked />'))->toContain(' checked')
        ->and(Blade::render('<x-plinth::switch id="a" label="A" disabled />'))->toContain(' disabled');
});

it('generates an id when it has none, and points the label at it', function () {
    $html = Blade::render('<x-plinth::switch label="A" error="Wrong" />');

    preg_match('/<input id="(plinth-switch-[a-z0-9]{8})"/', $html, $match);
    expect($match)->toHaveCount(2)
        ->and($html)->toContain('for="'.$match[1].'"')
        ->toContain('aria-describedby="'.$match[1].'-error"');
});

it('needs a label', function () {
    Blade::render('<x-plinth::switch id="a" />');
})->throws(Exception::class, 'needs a label');

it('escapes the text', function () {
    $html = Blade::render('<x-plinth::switch id="a" :label="$text" :description="$text" :error="$text" :value="$text" />', ['text' => '<b>x</b>']);

    expect($html)->not->toContain('<b>')->toContain('&lt;b&gt;x&lt;/b&gt;');
});

it('puts the class on the root and every other attribute on the input, where it wins', function () {
    $html = Blade::render('<x-plinth::switch id="enabled" label="Enabled" class="mb-4" name="enabled" value="1" wire:model.live="enabled" x-model="enabled" data-testid="enabled" role="checkbox" />');

    expect(squish($html))
        ->toContain('<div class="plinth-switch mb-4">')
        ->toContain('<input id="enabled" type="checkbox" role="checkbox" class="plinth-switch-input" name="enabled" value="1" wire:model.live="enabled" x-model="enabled" data-testid="enabled">');
});
