<?php

use BDynamic\Plinth\Enums\AppNavVariant;
use Illuminate\Support\Facades\Blade;

it('prints a named nav with its brand, items and footer', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::app-nav label="Main" brand-name="Harbour" brand-href="/">
            <x-slot:mark><svg></svg></x-slot:mark>
            <i>items</i>
            <x-slot:footer><i>footer</i></x-slot:footer>
        </x-plinth::app-nav>
        BLADE);

    expect(squish($html))->toBe(
        '<nav class="plinth-app-nav" aria-label="Main">'
        .'<a class="plinth-app-nav-brand" href="/"><span class="plinth-app-nav-mark" aria-hidden="true"><svg></svg></span><span class="plinth-app-nav-name">Harbour</span></a>'
        .'<div class="plinth-app-nav-items"><i>items</i></div>'
        .'<div class="plinth-app-nav-footer"><i>footer</i></div>'
        .'</nav>'
    );
});

it('prints only the items without a brand, a footer or a label', function () {
    expect(squish(Blade::render('<x-plinth::app-nav label=" " brand-name=" "><i>items</i><x-slot:mark> </x-slot:mark><x-slot:footer> </x-slot:footer></x-plinth::app-nav>')))
        ->toBe('<nav class="plinth-app-nav"><div class="plinth-app-nav-items"><i>items</i></div></nav>');
});

it('makes the brand a div without an href', function () {
    expect(squish(Blade::render('<x-plinth::app-nav brand-name="Harbour" brand-href=" ">x</x-plinth::app-nav>')))
        ->toBe('<nav class="plinth-app-nav"><div class="plinth-app-nav-brand"><span class="plinth-app-nav-name">Harbour</span></div><div class="plinth-app-nav-items">x</div></nav>');
});

it('leaves a mark alone to name the brand', function () {
    expect(squish(Blade::render('<x-plinth::app-nav brand-href="/"><x-slot:mark><img src="/logo.svg" alt="Harbour"></x-slot:mark> x</x-plinth::app-nav>')))
        ->toBe('<nav class="plinth-app-nav"><a class="plinth-app-nav-brand" href="/"><span class="plinth-app-nav-mark"><img src="/logo.svg" alt="Harbour"></span></a><div class="plinth-app-nav-items">x</div></nav>');
});

it('escapes the label, the brand name and its href', function () {
    $html = Blade::render(
        '<x-plinth::app-nav :label="$text" :brand-name="$text" :brand-href="$text">x</x-plinth::app-nav>',
        ['text' => '"><b>x</b>'],
    );

    expect($html)
        ->not->toContain('<b>')
        ->toContain('aria-label="&quot;&gt;&lt;b&gt;x&lt;/b&gt;"')
        ->toContain('href="&quot;&gt;&lt;b&gt;x&lt;/b&gt;"')
        ->toContain('<span class="plinth-app-nav-name">&quot;&gt;&lt;b&gt;x&lt;/b&gt;</span>');
});

it('keeps the rail with the rail variant, and prints nothing for the sidebar', function () {
    expect(squish(Blade::render('<x-plinth::app-nav variant="rail">x</x-plinth::app-nav>')))
        ->toBe('<nav class="plinth-app-nav" data-variant="rail"><div class="plinth-app-nav-items">x</div></nav>')
        ->and(Blade::render('<x-plinth::app-nav :variant="$variant">x</x-plinth::app-nav>', ['variant' => AppNavVariant::Rail]))
        ->toContain('data-variant="rail"');

    foreach (['sidebar', 'wide', null] as $variant) {
        expect(Blade::render('<x-plinth::app-nav :variant="$variant">x</x-plinth::app-nav>', ['variant' => $variant]))
            ->not->toContain('data-variant');
    }
});

it('lets the project set its own data-variant', function () {
    expect(Blade::render('<x-plinth::app-nav variant="rail" data-variant="sidebar">x</x-plinth::app-nav>'))
        ->toContain('data-variant="sidebar"')
        ->not->toContain('data-variant="rail"');
});

it('passes extra attributes to its root, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::app-nav label="Main" class="is-wide" aria-label="App" wire:key="nav" x-data="{ open: false }">x</x-plinth::app-nav>');

    expect($html)
        ->toContain('class="plinth-app-nav is-wide"')
        ->toContain('aria-label="App"')
        ->not->toContain('aria-label="Main"')
        ->toContain('wire:key="nav"')
        ->toContain('x-data="{ open: false }"');
});
