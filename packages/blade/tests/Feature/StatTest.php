<?php

use BDynamic\Plinth\Enums\Tone;
use Illuminate\Support\Facades\Blade;

it('prints a static tile with its label and value', function () {
    expect(squish(Blade::render('<x-plinth::stat label="Runs today" value="12" />')))
        ->toBe('<div class="plinth-stat" data-tone="neutral"><span class="plinth-stat-label">Runs today</span><span class="plinth-stat-value">12</span></div>');
});

it('prints a number, zero included', function () {
    expect(Blade::render('<x-plinth::stat label="Failed runs" :value="0" />'))
        ->toContain('<span class="plinth-stat-value">0</span>')
        ->not->toContain('is-empty');
});

it('prints the supporting line, without an icon when neutral', function () {
    expect(squish(Blade::render('<x-plinth::stat label="Spend this month" value="€38" description="of €150" />')))
        ->toContain('<span class="plinth-stat-description">of €150</span>');
});

it('puts the tone and its icon on the supporting line', function (string $tone) {
    $html = squish(Blade::render('<x-plinth::stat label="Success rate" value="94%" description="Up 2 points" :tone="$tone" />', ['tone' => $tone]));

    expect($html)
        ->toContain('data-tone="'.$tone.'"')
        ->toContain('<span class="plinth-stat-description"><span class="plinth-icon plinth-stat-tone" data-size="sm" aria-hidden="true"><svg')
        ->toContain('</svg></span>Up 2 points</span>');
})->with(['success', 'warning', 'danger']);

it('takes the tone as an enum, and falls back to neutral', function () {
    expect(Blade::render('<x-plinth::stat label="Errors" value="3" :tone="$tone" />', ['tone' => Tone::Danger]))
        ->toContain('data-tone="danger"');
    expect(Blade::render('<x-plinth::stat label="Errors" value="3" tone="loud" description="Fewer" />'))
        ->toContain('data-tone="neutral"')
        ->not->toContain('plinth-stat-tone');
});

it('leaves out an empty supporting line', function () {
    expect(Blade::render('<x-plinth::stat label="Runs today" value="12" description="" tone="success" />'))
        ->not->toContain('plinth-stat-description');
});

it('prints the empty state for a missing value', function () {
    $empty = '<span class="plinth-stat-value is-empty"><span aria-hidden="true">—</span><span class="plinth-stat-empty">Not available</span></span>';

    expect(squish(Blade::render('<x-plinth::stat label="Runs today" />')))->toContain($empty);
    expect(squish(Blade::render('<x-plinth::stat label="Runs today" value=" " />')))->toContain($empty);
    expect(Blade::render('<x-plinth::stat label="Runs today" empty-label="Still counting" />'))
        ->toContain('<span class="plinth-stat-empty">Still counting</span>');
});

it('is a link with an href, with its chevron', function () {
    expect(squish(Blade::render('<x-plinth::stat label="Runs today" value="12" href="/runs" />')))
        ->toStartWith('<a class="plinth-stat" href="/runs" data-tone="neutral">')
        ->toEndWith('<span class="plinth-icon plinth-stat-chevron" data-size="sm" data-mirror aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg></span></a>');
    expect(Blade::render('<x-plinth::stat label="Runs today" value="12" />'))
        ->not->toContain('plinth-stat-chevron');
});

it('escapes the text', function () {
    $html = Blade::render(
        '<x-plinth::stat :label="$text" :value="$text" :description="$text" :empty-label="$text" :href="$text" />',
        ['text' => '<b>"x"</b>'],
    );

    expect($html)->not->toContain('<b>')->toContain('&lt;b&gt;');
    expect(Blade::render('<x-plinth::stat :label="$text" :empty-label="$text" />', ['text' => '<b>x</b>']))
        ->not->toContain('<b>');
});

it('keeps extra classes and attributes, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::stat label="Runs today" value="12" class="ms-2" id="runs" data-test="stat" aria-describedby="note" />');

    expect($html)
        ->toContain('class="plinth-stat ms-2"')
        ->toContain('id="runs"')
        ->toContain('data-test="stat"')
        ->toContain('aria-describedby="note"');
    expect(Blade::render('<x-plinth::stat label="Runs today" value="12" data-tone="warning" />'))
        ->toContain('data-tone="warning"')
        ->not->toContain('data-tone="neutral"');
});
