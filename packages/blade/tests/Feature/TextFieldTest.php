<?php

use BDynamic\Plinth\Enums\Size;
use Illuminate\Support\Facades\Blade;

it('prints the label, the input, the description and the error', function () {
    $html = Blade::render('<x-plinth::text-field id="email" label="Email" type="email" description="For receipts." error="Enter an email address." />');

    expect(squish($html))->toBe(
        '<div class="plinth-text-field" data-size="md">'
        .'<label class="plinth-text-field-label" for="email">Email</label>'
        .'<div class="plinth-text-field-control">'
        .'<input id="email" type="email" class="plinth-text-field-input" aria-describedby="email-description email-error" aria-invalid="true">'
        .'</div>'
        .'<p id="email-description" class="plinth-text-field-description">For receipts.</p>'
        .'<p id="email-error" class="plinth-text-field-error">Enter an email address.</p>'
        .'</div>'
    );
});

it('is a text input of size md by default, with nothing to describe it', function () {
    $html = Blade::render('<x-plinth::text-field id="name" label="Name" />');

    expect($html)
        ->toContain('type="text"')
        ->toContain('data-size="md"')
        ->not->toContain('aria-describedby')
        ->not->toContain('aria-invalid')
        ->not->toContain('data-label')
        ->not->toContain('disabled')
        ->not->toContain('readonly');
});

it('takes the sm size, as a string or a case, and falls back to md for any other', function () {
    expect(Blade::render('<x-plinth::text-field id="a" label="A" size="sm" />'))->toContain('data-size="sm"')
        ->and(Blade::render('<x-plinth::text-field id="a" label="A" :size="$size" />', ['size' => Size::Small]))->toContain('data-size="sm"')
        ->and(Blade::render('<x-plinth::text-field id="a" label="A" size="lg" />'))->toContain('data-size="md"');
});

it('hides the label visually, and is disabled or read-only', function () {
    expect(Blade::render('<x-plinth::text-field id="a" label="A" hide-label />'))->toContain('data-label="hidden"')
        ->and(Blade::render('<x-plinth::text-field id="a" label="A" disabled />'))->toContain(' disabled')
        ->and(Blade::render('<x-plinth::text-field id="a" label="A" readonly />'))->toContain(' readonly');
});

it('prints the icon and the trailing slot, and leaves out empty ones', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::text-field id="find" label="Search" type="search">
            <x-slot:icon><svg></svg></x-slot:icon>
            <x-slot:trailing><kbd aria-hidden="true">/</kbd></x-slot:trailing>
        </x-plinth::text-field>
        BLADE);

    expect(squish($html))
        ->toContain('<div class="plinth-text-field-control"><span class="plinth-icon" data-size="sm" aria-hidden="true"><svg></svg></span><input')
        ->toContain('<span class="plinth-text-field-trailing"><kbd aria-hidden="true">/</kbd></span></div>');

    $empty = Blade::render('<x-plinth::text-field id="a" label="A"><x-slot:icon> </x-slot:icon><x-slot:trailing></x-slot:trailing></x-plinth::text-field>');
    expect($empty)->not->toContain('plinth-icon')->not->toContain('plinth-text-field-trailing');
});

it('generates an id when it has none, and points the label at it', function () {
    $html = Blade::render('<x-plinth::text-field label="Email" description="Help" />');

    preg_match('/<input id="(plinth-text-field-[a-z0-9]{8})"/', $html, $match);
    expect($match)->toHaveCount(2)
        ->and($html)->toContain('for="'.$match[1].'"')
        ->toContain('aria-describedby="'.$match[1].'-description"');
});

it('needs a label', function () {
    Blade::render('<x-plinth::text-field id="a" label=" " />');
})->throws(Exception::class, 'needs a label');

it('escapes the text', function () {
    $html = Blade::render('<x-plinth::text-field id="a" :label="$text" :description="$text" :error="$text" :value="$text" />', ['text' => '<b>x</b>']);

    expect($html)->not->toContain('<b>')->toContain('&lt;b&gt;x&lt;/b&gt;');
});

it('puts the class on the root and every other attribute on the input, where it wins', function () {
    $html = Blade::render('<x-plinth::text-field id="email" label="Email" description="Help" class="mb-4" name="email" wire:model.live="email" x-model="email" data-testid="email" aria-describedby="mine" />');

    expect(squish($html))
        ->toContain('<div class="plinth-text-field mb-4" data-size="md">')
        ->toContain('<input id="email" type="text" class="plinth-text-field-input" aria-describedby="mine" name="email" wire:model.live="email" x-model="email" data-testid="email">');
});
