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

it('prints the section column with its title and ids', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::app-shell section-title="Settings &amp; more" section-id="settings">
            <x-slot:nav><nav>nav</nav></x-slot:nav>
            <x-slot:section><nav aria-labelledby="settings-title">links</nav></x-slot:section>
            <x-slot:bar><header>bar</header></x-slot:bar>
            <p>page</p>
        </x-plinth::app-shell>
        BLADE);

    expect(squish($html))->toBe(
        '<div class="plinth-app-shell">'
        .'<div class="plinth-app-shell-nav"><nav>nav</nav></div>'
        .'<div class="plinth-app-shell-section" id="settings">'
        .'<div class="plinth-app-shell-section-header">'
        .'<p class="plinth-app-shell-section-title" id="settings-title">Settings &amp;amp; more</p>'
        .'</div>'
        .'<div class="plinth-app-shell-section-body"><nav aria-labelledby="settings-title">links</nav></div>'
        .'</div>'
        .'<div class="plinth-app-shell-bar"><header>bar</header></div>'
        .'<main class="plinth-app-shell-main"><p>page</p></main>'
        .'</div>'
    );
});

it('prints the section column without a header or ids when it has no title or id', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::app-shell section-title="" section-id="">
            <x-slot:section><nav aria-label="Settings">links</nav></x-slot:section>
            <p>page</p>
        </x-plinth::app-shell>
        BLADE);

    expect(squish($html))->toBe(
        '<div class="plinth-app-shell">'
        .'<div class="plinth-app-shell-section">'
        .'<div class="plinth-app-shell-section-body"><nav aria-label="Settings">links</nav></div>'
        .'</div>'
        .'<main class="plinth-app-shell-main"><p>page</p></main>'
        .'</div>'
    );
});

it('prints the title without an id when the section has none', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::app-shell section-title="Settings">
            <x-slot:section><nav>links</nav></x-slot:section>
            <p>page</p>
        </x-plinth::app-shell>
        BLADE);

    expect(squish($html))->toContain(
        '<div class="plinth-app-shell-section"><div class="plinth-app-shell-section-header">'
        .'<p class="plinth-app-shell-section-title">Settings</p></div>'
    );
});

it('collapses the section column with section-closed', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::app-shell section-title="Settings" section-closed>
            <x-slot:section><nav>links</nav></x-slot:section>
            <p>page</p>
        </x-plinth::app-shell>
        BLADE);

    expect(squish($html))->toStartWith('<div class="plinth-app-shell" data-section="closed">');
});

it('prints no section column for a blank section', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::app-shell section-title="Settings">
            <x-slot:section> </x-slot:section>
            <p>page</p>
        </x-plinth::app-shell>
        BLADE);

    expect($html)->not->toContain('plinth-app-shell-section');
});

it('lets a clashing attribute win', function () {
    $html = Blade::render('<x-plinth::app-shell section-closed data-section="open">x</x-plinth::app-shell>');

    expect($html)->toContain('data-section="open"')->not->toContain('data-section="closed"');
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
