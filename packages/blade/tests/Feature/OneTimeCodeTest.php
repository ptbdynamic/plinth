<?php

use BDynamic\Plinth\Support\OneTimeCode;
use Illuminate\Support\Facades\Blade;

/** The markup without its Alpine attributes, which a test below checks on its own. */
function withoutOneTimeCodeAlpine(string $html): string
{
    return squish(preg_replace('/ x-[a-z:.-]+="[^"]*"/', '', $html) ?? '');
}

it('prints the field around the input, with its description and error', function () {
    $html = Blade::render(
        '<x-plinth::one-time-code id="code" label="Code" description="From the app." error="Wrong code." />'
    );

    expect(withoutOneTimeCodeAlpine($html))->toBe(
        '<div class="plinth-field plinth-one-time-code">'
        .'<label class="plinth-field-label" id="code-label" for="code">Code</label>'
        .'<input id="code" type="text" class="plinth-one-time-code-input" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" aria-describedby="code-description code-error" aria-invalid="true">'
        .'<p class="plinth-field-description" id="code-description">From the app.</p>'
        .'<p class="plinth-field-error" id="code-error">Wrong code.</p>'
        .'</div>'
    );
});

it('has six digits and nothing to describe it by default, and leaves blank messages out', function () {
    $html = Blade::render('<x-plinth::one-time-code id="code" label="Code" description=" " error="" />');

    expect($html)
        ->toContain('pattern="[0-9]{6}" maxlength="6"')
        ->not->toContain('aria-describedby')
        ->not->toContain('aria-invalid')
        ->not->toContain('disabled')
        ->not->toContain('data-label')
        ->not->toContain('plinth-field-description')
        ->not->toContain('plinth-field-error');
});

it('takes a length from 4 to 8, as an int or a string, and falls back to 6', function (mixed $length, int $digits) {
    expect(Blade::render('<x-plinth::one-time-code id="c" label="C" :length="$length" />', ['length' => $length]))
        ->toContain('pattern="[0-9]{'.$digits.'}" maxlength="'.$digits.'"')
        ->toContain('{ length: '.$digits.',');
})->with([
    [4, 4],
    ['8', 8],
    [9, 6],
    ['6.5', 6],
    ['abc', 6],
    [null, 6],
]);

it('knows the lengths a code can have', function () {
    expect(OneTimeCode::LENGTHS)->toBe([4, 5, 6, 7, 8])
        ->and(OneTimeCode::length(5))->toBe(5)
        ->and(OneTimeCode::length(3))->toBe(6);
});

it('is disabled, and hides the label visually', function () {
    $html = Blade::render('<x-plinth::one-time-code id="c" label="C" disabled hide-label />');

    expect($html)
        ->toContain('<div class="plinth-field plinth-one-time-code" data-label="hidden">')
        ->toContain('maxlength="6" disabled');
});

it('keeps only digits and sends the form with autosubmit, with Alpine', function () {
    $plain = Blade::render('<x-plinth::one-time-code id="c" label="C" />');
    $autosubmit = Blade::render('<x-plinth::one-time-code id="c" label="C" autosubmit />');

    expect($plain)
        ->toContain('x-data="{ length: 6, autosubmit: false, digits(value) { return value.replace(/\D/g, &#039;&#039;)')
        ->toContain('x-on:input="input" x-on:paste="paste"')
        ->toContain('requestSubmit()')
        ->and($autosubmit)->toContain('x-data="{ length: 6, autosubmit: true,');
});

it('generates an id when it has none', function () {
    expect(withoutOneTimeCodeAlpine(Blade::render('<x-plinth::one-time-code label="C" />')))
        ->toMatch('/<label class="plinth-field-label" id="(plinth-one-time-code-[a-z0-9]{8})-label" for="\1"><\/label>|for="(plinth-one-time-code-[a-z0-9]{8})">C<\/label><input id="\2"/');
});

it('needs a label', function () {
    Blade::render('<x-plinth::one-time-code id="c" label=" " />');
})->throws(Exception::class, 'needs a label');

it('escapes the text', function () {
    $html = Blade::render(
        '<x-plinth::one-time-code id="c" :label="$text" :description="$text" :error="$text" :value="$value" />',
        ['text' => '<b>x</b>', 'value' => '<i>'],
    );

    expect($html)
        ->toContain('>&lt;b&gt;x&lt;/b&gt;</label>')
        ->toContain('>&lt;b&gt;x&lt;/b&gt;</p>')
        ->toContain('value="&lt;i&gt;"')
        ->not->toContain('<b>');
});

it('puts a project\'s class on the root and every other attribute on the input, where it wins', function () {
    $html = Blade::render(
        '<x-plinth::one-time-code id="code" label="Code" description="D." class="mb-4" name="code" wire:model="code" data-testid="code" aria-describedby="my-help" autocomplete="off" />'
    );

    expect(withoutOneTimeCodeAlpine($html))->toBe(
        '<div class="plinth-field plinth-one-time-code mb-4">'
        .'<label class="plinth-field-label" id="code-label" for="code">Code</label>'
        .'<input id="code" type="text" class="plinth-one-time-code-input" inputmode="numeric" autocomplete="off" pattern="[0-9]{6}" maxlength="6" aria-describedby="my-help" name="code" wire:model="code" data-testid="code">'
        .'<p class="plinth-field-description" id="code-description">D.</p>'
        .'</div>'
    );
});
