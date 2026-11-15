<?php

use BDynamic\Plinth\Enums\Tone;
use BDynamic\Plinth\Support\Meter;
use Illuminate\Support\Facades\Blade;

it('prints the meter markup contract', function () {
    $html = squish(Blade::render('<x-plinth::meter id="spend" label="Spend this month" :value="120" :max="150" :low="105" :high="135" :optimum="0" value-text="€120 of €150" description="Runs pause at €150." />'));

    expect($html)
        ->toStartWith('<div class="plinth-meter" data-tone="warning"><span class="plinth-meter-label" id="spend-label">Spend this month</span><span class="plinth-meter-value" aria-hidden="true">€120 of €150</span><meter class="plinth-meter-bar" id="spend" min="0" max="150" low="105" high="135" optimum="0" value="120" aria-labelledby="spend-label" aria-describedby="spend-description" aria-valuetext="€120 of €150">€120 of €150</meter><span class="plinth-meter-description" id="spend-description"><span class="plinth-icon plinth-meter-tone" data-size="sm" aria-hidden="true"><svg')
        ->toEndWith('</svg></span>Runs pause at €150.</span></div>');
});

it('prints only the label and the bar by default, with min 0, max 100 and the value at the minimum', function () {
    expect(squish(Blade::render('<x-plinth::meter id="quota" label="Quota" />')))
        ->toBe('<div class="plinth-meter" data-tone="neutral"><span class="plinth-meter-label" id="quota-label">Quota</span><meter class="plinth-meter-bar" id="quota" min="0" max="100" value="0" aria-labelledby="quota-label">0</meter></div>');
});

it('makes up an id without one', function () {
    $html = Blade::render('<x-plinth::meter label="Quota" :value="5" />');

    expect($html)->toMatch('/<meter class="plinth-meter-bar" id="(plinth-meter-[a-z0-9]{8})"[^>]* aria-labelledby="\1-label"/');
});

it('needs a label', function () {
    Blade::render('<x-plinth::meter label=" " />');
})->throws(Exception::class, 'needs a label');

it('leaves out a blank value text and description', function () {
    $html = Blade::render('<x-plinth::meter id="q" label="Quota" :value="5" value-text=" " description=" " />');

    expect($html)
        ->not->toContain('plinth-meter-value')
        ->not->toContain('plinth-meter-description')
        ->not->toContain('aria-describedby')
        ->not->toContain('aria-valuetext')
        ->toContain('>5</meter>');
});

it('prints a neutral description without an icon', function () {
    expect(squish(Blade::render('<x-plinth::meter id="q" label="Quota" :value="5" description="Resets monthly." />')))
        ->toContain('<span class="plinth-meter-description" id="q-description">Resets monthly.</span>');
});

it('takes the tone the app chooses, as a string or the enum', function () {
    expect(Blade::render('<x-plinth::meter label="Quota" :value="5" tone="success" />'))->toContain('data-tone="success"')
        ->and(Blade::render('<x-plinth::meter label="Quota" :value="5" :tone="$tone" />', ['tone' => Tone::Danger]))->toContain('data-tone="danger"');
});

it('decides the tone from the numbers for an unknown tone', function () {
    expect(Blade::render('<x-plinth::meter label="Spend" :value="149" :max="150" :low="105" :high="135" :optimum="0" tone="loud" />'))
        ->toContain('data-tone="danger"');
});

it('reads numbers given as strings and ignores what is not a number', function () {
    expect(squish(Blade::render('<x-plinth::meter id="q" label="Quota" value=" 2.50 " min="1" max="x" low="" high="4" optimum="abc" />')))
        ->toContain('<meter class="plinth-meter-bar" id="q" min="1" max="100" high="4" value="2.5" aria-labelledby="q-label">2.5</meter>');
});

it('escapes the text', function () {
    $html = Blade::render('<x-plinth::meter id="a&quot;b" label="<b>Spend</b>" :value="5" value-text="<i>5</i>" description="<u>Note</u>" />');

    expect($html)
        ->toContain('&lt;b&gt;Spend&lt;/b&gt;')
        ->toContain('&lt;i&gt;5&lt;/i&gt;')
        ->toContain('&lt;u&gt;Note&lt;/u&gt;')
        ->toContain('<meter class="plinth-meter-bar" id="a&quot;b"')
        ->not->toContain('<b>');
});

it('keeps extra classes and attributes on the root, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::meter label="Quota" class="ms-2" data-testid="quota" data-tone="danger" />');

    expect($html)
        ->toContain('class="plinth-meter ms-2"')
        ->toContain('data-testid="quota"')
        ->toContain('data-tone="danger"')
        ->not->toContain('data-tone="neutral"');
});

it('decides the tone as the browser decides the region', function (array $numbers, Tone $tone) {
    $range = Meter::range(...array_values(array_merge(['value' => null, 'min' => 0, 'max' => 100, 'low' => null, 'high' => null, 'optimum' => null], $numbers)));

    expect(Meter::tone($range))->toBe($tone);
})->with([
    'no thresholds' => [['value' => 90], Tone::Neutral],
    'lower is better, under low' => [['value' => 20, 'low' => 70, 'high' => 90, 'optimum' => 0], Tone::Neutral],
    'lower is better, at low' => [['value' => 70, 'low' => 70, 'high' => 90, 'optimum' => 0], Tone::Neutral],
    'lower is better, past low' => [['value' => 80, 'low' => 70, 'high' => 90, 'optimum' => 0], Tone::Warning],
    'lower is better, past high' => [['value' => 95, 'low' => 70, 'high' => 90, 'optimum' => 0], Tone::Danger],
    'past max' => [['value' => 120], Tone::Danger],
    'higher is better, past high' => [['value' => 95, 'low' => 30, 'high' => 90, 'optimum' => 100], Tone::Neutral],
    'higher is better, between' => [['value' => 50, 'low' => 30, 'high' => 90, 'optimum' => 100], Tone::Warning],
    'higher is better, under low' => [['value' => 10, 'low' => 30, 'high' => 90, 'optimum' => 100], Tone::Danger],
    'optimum in the middle, inside' => [['value' => 50, 'low' => 30, 'high' => 70], Tone::Neutral],
    'optimum in the middle, outside' => [['value' => 80, 'low' => 30, 'high' => 70], Tone::Warning],
    'max under min' => [['value' => 5, 'min' => 10, 'max' => 0], Tone::Neutral],
]);

it('treats only numbers and numeric strings as numbers', function () {
    expect(Meter::number(5))->toBe(5)
        ->and(Meter::number(1.5))->toBe(1.5)
        ->and(Meter::number(' 3 '))->toBe(3)
        ->and(Meter::number(''))->toBeNull()
        ->and(Meter::number(true))->toBeNull()
        ->and(Meter::number(INF))->toBeNull()
        ->and(Meter::number([1]))->toBeNull();
});
