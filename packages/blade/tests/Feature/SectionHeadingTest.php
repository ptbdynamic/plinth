<?php

use BDynamic\Plinth\Enums\HeadingLevel;
use Illuminate\Support\Facades\Blade;
use Illuminate\View\ViewException;

it('prints the section heading markup contract', function () {
    expect(squish(Blade::render('<x-plinth::section-heading heading="Budget" />')))
        ->toBe('<div class="plinth-section-heading"><div class="plinth-section-heading-text"><h2 class="plinth-section-heading-title">Budget</h2></div></div>');
});

it('prints the heading id, the description and the actions', function () {
    $html = squish(Blade::render(<<<'BLADE'
        <x-plinth::section-heading heading="Budget" heading-id="budget-heading" description="Runs pause at the cap.">
            <x-slot:actions><button type="button">Set a cap</button></x-slot:actions>
        </x-plinth::section-heading>
        BLADE));

    expect($html)->toBe('<div class="plinth-section-heading"><div class="plinth-section-heading-text"><h2 class="plinth-section-heading-title" id="budget-heading">Budget</h2><p class="plinth-section-heading-description">Runs pause at the cap.</p></div><div class="plinth-section-heading-actions"><button type="button">Set a cap</button></div></div>');
});

it('leaves out a blank id, a blank description and an empty actions slot', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::section-heading heading="Budget" heading-id=" " description="  ">
            <x-slot:actions> </x-slot:actions>
        </x-plinth::section-heading>
        BLADE);

    expect($html)
        ->not->toContain('id=')
        ->not->toContain('plinth-section-heading-description')
        ->not->toContain('plinth-section-heading-actions');
});

it('draws the divider only when asked', function () {
    expect(Blade::render('<x-plinth::section-heading heading="Budget" divider />'))
        ->toStartWith('<div class="plinth-section-heading" data-divider="">');
    expect(Blade::render('<x-plinth::section-heading heading="Budget" :divider="false" />'))
        ->not->toContain('data-divider');
});

it('takes the heading level as a string or the enum, and falls back to h2', function () {
    expect(Blade::render('<x-plinth::section-heading heading="Budget" heading-level="h4" />'))
        ->toContain('<h4 class="plinth-section-heading-title"');
    expect(Blade::render('<x-plinth::section-heading heading="Budget" :heading-level="$level" />', ['level' => HeadingLevel::Three]))
        ->toContain('<h3 class="plinth-section-heading-title"');
    expect(Blade::render('<x-plinth::section-heading heading="Budget" heading-level="h1" />'))
        ->toContain('<h2 class="plinth-section-heading-title"');
});

it('needs a heading', function () {
    Blade::render('<x-plinth::section-heading heading=" " />');
})->throws(ViewException::class, 'needs a heading');

it('escapes the text', function () {
    $html = Blade::render(
        '<x-plinth::section-heading :heading="$text" :heading-id="$id" :description="$text" />',
        ['text' => '<b>x</b>', 'id' => '"x"'],
    );

    expect($html)
        ->not->toContain('<b>')
        ->toContain('&lt;b&gt;x&lt;/b&gt;')
        ->toContain('id="&quot;x&quot;"');
});

it('keeps extra classes and attributes, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::section-heading heading="Budget" class="mb-4" id="budget" data-testid="budget" />');

    expect($html)
        ->toContain('class="plinth-section-heading mb-4"')
        ->toContain('id="budget"')
        ->toContain('data-testid="budget"');
    expect(Blade::render('<x-plinth::section-heading heading="Budget" divider data-divider="strong" />'))
        ->toContain('data-divider="strong"')
        ->not->toContain('data-divider=""');
});
