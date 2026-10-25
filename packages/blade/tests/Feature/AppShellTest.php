<?php

use Illuminate\Support\Facades\Blade;

it('prints the nav, the bar and the page in a main', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::app-shell>
            <x-slot:nav><nav>nav</nav></x-slot:nav>
            <x-slot:bar><header>bar</header></x-slot:bar>
            <p>page</p>
        </x-plinth::app-shell>
        BLADE);

    expect(squish($html))->toBe(
        '<div class="plinth-app-shell">'
        .'<div class="plinth-app-shell-nav"><nav>nav</nav></div>'
        .'<div class="plinth-app-shell-bar"><header>bar</header></div>'
        .'<main class="plinth-app-shell-main"><p>page</p></main>'
        .'</div>'
    );
});

it('prints only the main without a nav or a bar', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::app-shell>
            <x-slot:nav> </x-slot:nav>
            <x-slot:bar> </x-slot:bar>
            <p>page</p>
        </x-plinth::app-shell>
        BLADE);

    expect(squish($html))->toBe('<div class="plinth-app-shell"><main class="plinth-app-shell-main"><p>page</p></main></div>');
});

it('passes extra attributes to its root', function () {
    $html = Blade::render('<x-plinth::app-shell class="is-wide" id="app" data-theme="dark" wire:key="shell" x-data="{ open: false }">x</x-plinth::app-shell>');

    expect($html)
        ->toContain('class="plinth-app-shell is-wide"')
        ->toContain('id="app"')
        ->toContain('data-theme="dark"')
        ->toContain('wire:key="shell"')
        ->toContain('x-data="{ open: false }"');
});
