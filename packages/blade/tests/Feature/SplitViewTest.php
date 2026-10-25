<?php

use BDynamic\Plinth\Enums\SplitViewPane;
use Illuminate\Support\Facades\Blade;

it('prints the secondary, the list and the detail with its footer', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::split-view pane="detail" secondary-closed>
            <x-slot:secondary><nav>folders</nav></x-slot:secondary>
            <x-slot:list><ul>tickets</ul></x-slot:list>
            <article>ticket</article>
            <x-slot:footer><form>reply</form></x-slot:footer>
        </x-plinth::split-view>
        BLADE);

    expect(squish($html))->toBe(
        '<div class="plinth-split-view" data-pane="detail" data-secondary="closed">'
        .'<div class="plinth-split-view-secondary"><nav>folders</nav></div>'
        .'<div class="plinth-split-view-list"><ul>tickets</ul></div>'
        .'<div class="plinth-split-view-detail"><article>ticket</article><div class="plinth-split-view-footer"><form>reply</form></div></div>'
        .'</div>'
    );
});

it('shows the list by default, and prints no secondary or footer without content', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::split-view>
            <x-slot:secondary> </x-slot:secondary>
            <x-slot:list>list</x-slot:list>
            <p>detail</p>
            <x-slot:footer> </x-slot:footer>
        </x-plinth::split-view>
        BLADE);

    expect(squish($html))->toBe('<div class="plinth-split-view" data-pane="list"><div class="plinth-split-view-list">list</div><div class="plinth-split-view-detail"><p>detail</p></div></div>');
});

it('prints an empty list without one', function () {
    expect(squish(Blade::render('<x-plinth::split-view>detail</x-plinth::split-view>')))
        ->toContain('<div class="plinth-split-view-list"></div>');
});

it('takes the pane as the enum, and falls back to the list for an unknown one', function () {
    $pane = fn ($value) => Blade::render('<x-plinth::split-view :pane="$pane">x</x-plinth::split-view>', ['pane' => $value]);

    expect($pane(SplitViewPane::Detail))->toContain('data-pane="detail"')
        ->and($pane('side'))->toContain('data-pane="list"')
        ->and($pane(null))->toContain('data-pane="list"');
});

it('passes extra attributes to its root, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::split-view pane="list" class="is-tall" data-pane="detail" wire:key="inbox" x-data="{ open: false }">x</x-plinth::split-view>');

    expect($html)
        ->toContain('class="plinth-split-view is-tall"')
        ->toContain('data-pane="detail"')
        ->not->toContain('data-pane="list"')
        ->toContain('wire:key="inbox"')
        ->toContain('x-data="{ open: false }"');
});
