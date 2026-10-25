<?php

use Illuminate\Support\Facades\Blade;

it('prints the search, the actions and the account', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::app-bar>
            <button>search</button>
            <x-slot:actions><button>help</button></x-slot:actions>
            <x-slot:account><button>account</button></x-slot:account>
        </x-plinth::app-bar>
        BLADE);

    expect(squish($html))->toBe(
        '<header class="plinth-app-bar">'
        .'<div class="plinth-app-bar-start"><button>search</button></div>'
        .'<div class="plinth-app-bar-actions"><button>help</button></div>'
        .'<div class="plinth-app-bar-account"><button>account</button></div>'
        .'</header>'
    );
});

it('prints only the parts that have content', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::app-bar>
            <x-slot:actions> </x-slot:actions>
            <x-slot:account><i>me</i></x-slot:account>
        </x-plinth::app-bar>
        BLADE);

    expect(squish($html))->toBe('<header class="plinth-app-bar"><div class="plinth-app-bar-account"><i>me</i></div></header>');
});

it('passes extra attributes to its root, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::app-bar class="is-raised" role="toolbar" wire:key="bar" x-data="{ open: false }">x</x-plinth::app-bar>');

    expect($html)
        ->toContain('class="plinth-app-bar is-raised"')
        ->toContain('role="toolbar"')
        ->toContain('wire:key="bar"')
        ->toContain('x-data="{ open: false }"');
});
