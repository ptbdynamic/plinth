<?php

use BDynamic\Plinth\Support\Field;
use Illuminate\Support\Facades\Blade;

it('prints the label, the control, the description and the error around one control', function () {
    $html = Blade::render(
        '<x-plinth::field id="team" label="Team" description="Who answers first." error="Pick a team." required>'
        .'<select id="team"></select>'
        .'</x-plinth::field>'
    );

    expect(squish($html))->toBe(
        '<div class="plinth-field">'
        .'<label class="plinth-field-label" id="team-label" for="team">Team<span class="plinth-field-required" aria-hidden="true">*</span></label>'
        .'<select id="team"></select>'
        .'<p class="plinth-field-description" id="team-description">Who answers first.</p>'
        .'<p class="plinth-field-error" id="team-error">Pick a team.</p>'
        .'</div>'
    );
});

it('is a fieldset with a legend for a group, described by its description and error', function () {
    $html = Blade::render(
        '<x-plinth::field id="status" label="Status" group description="In these states." error="Pick one."><i>Pills</i></x-plinth::field>'
    );

    expect(squish($html))->toBe(
        '<fieldset class="plinth-field" id="status" aria-describedby="status-description status-error">'
        .'<legend class="plinth-field-label" id="status-label">Status</legend>'
        .'<i>Pills</i>'
        .'<p class="plinth-field-description" id="status-description">In these states.</p>'
        .'<p class="plinth-field-error" id="status-error">Pick one.</p>'
        .'</fieldset>'
    );
});

it('prints a group with nothing to describe it, and leaves blank messages out', function () {
    $html = Blade::render('<x-plinth::field id="s" label="S" group description=" " error="">x</x-plinth::field>');

    expect($html)
        ->not->toContain('aria-describedby')
        ->not->toContain('plinth-field-description')
        ->not->toContain('plinth-field-error')
        ->not->toContain('plinth-field-required')
        ->not->toContain('data-label');
});

it('hides the label visually', function () {
    expect(Blade::render('<x-plinth::field id="a" label="A" hide-label>x</x-plinth::field>'))
        ->toContain('<div class="plinth-field" data-label="hidden">');
});

it('generates a group\'s id when it has none', function () {
    expect(squish(Blade::render('<x-plinth::field label="A" group>x</x-plinth::field>')))
        ->toMatch('/<fieldset class="plinth-field" id="(plinth-field-[a-z0-9]{8})"><legend class="plinth-field-label" id="\1-label">/');
});

it('needs an id for one control', function () {
    Blade::render('<x-plinth::field label="A">x</x-plinth::field>');
})->throws(Exception::class, 'needs an id');

it('needs a label', function () {
    Blade::render('<x-plinth::field id="a" label=" ">x</x-plinth::field>');
})->throws(Exception::class, 'needs a label');

it('escapes the label, the messages and the slot', function () {
    $html = Blade::render(
        '<x-plinth::field id="a" label="A <b>" description="B & C" error="Not <this>">{{ $text }}</x-plinth::field>',
        ['text' => '<i>x</i>'],
    );

    expect($html)
        ->toContain('A &lt;b&gt;')
        ->toContain('B &amp; C')
        ->toContain('Not &lt;this&gt;')
        ->toContain('&lt;i&gt;x&lt;/i&gt;');
});

it('forwards extra attributes to the root, where the project wins a clash', function () {
    $html = Blade::render('<x-plinth::field id="s" label="S" group description="D" class="mb-4" data-testid="s" aria-describedby="mine" disabled wire:key="s">x</x-plinth::field>');

    expect($html)
        ->toContain('class="plinth-field mb-4"')
        ->toContain('data-testid="s"')
        ->toContain('aria-describedby="mine"')
        ->toContain('wire:key="s"')
        ->toContain('disabled')
        ->not->toContain('aria-describedby="s-description');
});

it('gives a control the ids it points at', function () {
    expect(Field::labelId('team'))->toBe('team-label')
        ->and(Field::describedBy('team', 'Help', 'Wrong'))->toBe('team-description team-error')
        ->and(Field::describedBy('team', 'Help'))->toBe('team-description')
        ->and(Field::describedBy('team', null, 'Wrong'))->toBe('team-error')
        ->and(Field::describedBy('team', ' ', ''))->toBeNull()
        ->and(Field::describedBy('team'))->toBeNull();
});
