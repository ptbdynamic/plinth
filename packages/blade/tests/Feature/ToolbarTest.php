<?php

use BDynamic\Plinth\Enums\Glyph;
use BDynamic\Plinth\Support\ToolbarKeys;
use Illuminate\Support\Facades\Blade;

it('prints the actions in a toolbar named Actions by default, with its keys', function () {
    $html = Blade::render('<x-plinth::toolbar><button>Assign</button></x-plinth::toolbar>');

    expect(squish($html))->toBe(
        '<div class="plinth-toolbar">'
        .'<div class="plinth-toolbar-actions" role="toolbar" aria-label="Actions" x-data="'.e(ToolbarKeys::X_DATA).'"><button>Assign</button></div>'
        .'</div>'
    );
});

it('prints the search and the target, escaped, and the label', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::toolbar label="Ticket actions" target="<b>2</b> selected">
            <x-slot:search><i>search</i></x-slot:search>
        </x-plinth::toolbar>
        BLADE);

    expect(squish($html))
        ->toStartWith('<div class="plinth-toolbar"><i>search</i><p class="plinth-toolbar-target">&lt;b&gt;2&lt;/b&gt; selected</p>')
        ->toContain('aria-label="Ticket actions"');
});

it('leaves out a blank target and an empty search', function () {
    $html = Blade::render('<x-plinth::toolbar target=" "><x-slot:search> </x-slot:search></x-plinth::toolbar>');

    expect(squish($html))->toStartWith('<div class="plinth-toolbar"><div class="plinth-toolbar-actions"');
});

it('passes extra attributes to its root, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::toolbar class="x" id="bar" wire:key="bar" x-data="{}" />');

    expect($html)
        ->toContain('class="plinth-toolbar x"')
        ->toContain('id="bar"')
        ->toContain('wire:key="bar"')
        ->toContain('x-data="{}"');
});

it('needs a label', function () {
    Blade::render('<x-plinth::toolbar label=" " />');
})->throws(Exception::class, 'needs a label');

it('prints a group, named when it has a label', function () {
    expect(squish(Blade::render('<x-plinth::toolbar-group>x</x-plinth::toolbar-group>')))
        ->toBe('<div class="plinth-toolbar-group" role="group">x</div>')
        ->and(Blade::render('<x-plinth::toolbar-group label="Remove" />'))->toContain('aria-label="Remove"')
        ->and(Blade::render('<x-plinth::toolbar-group label=" " />'))->not->toContain('aria-label');
});

it('passes extra attributes to a group, and the project wins a clash', function () {
    expect(squish(Blade::render('<x-plinth::toolbar-group class="x" role="none" />')))
        ->toBe('<div class="plinth-toolbar-group x" role="none"></div>');
});

it('prints an action with the icon from the slot and the label, escaped', function () {
    $html = Blade::render('<x-plinth::toolbar-action label="<Assign>"><svg></svg></x-plinth::toolbar-action>');

    expect(squish($html))->toBe(
        '<button class="plinth-button plinth-toolbar-action" type="button" data-variant="ghost" data-size="md">'
        .'<span class="plinth-icon" data-size="md" aria-hidden="true"><svg></svg></span>'
        .'<span class="plinth-button-label">&lt;Assign&gt;</span></button>'
    );
});

it('prints an action\'s built-in glyph, mirrored when it points a way', function () {
    expect(squish(Blade::render('<x-plinth::toolbar-action label="Back" icon="back" />')))
        ->toContain('data-icon="back" data-mirror aria-hidden="true">'.Glyph::Back->svg())
        ->and(Blade::render('<x-plinth::toolbar-action label="More" icon="more" />'))->not->toContain('data-mirror');
});

it('overflows and disables an action', function () {
    expect(Blade::render('<x-plinth::toolbar-action label="Delete" overflow disabled />'))
        ->toContain('data-overflow=""')
        ->toContain('disabled=""');
});

it('passes extra attributes to an action, and the project wins a clash', function () {
    expect(Blade::render('<x-plinth::toolbar-action label="Send" class="x" type="submit" data-size="lg" wire:click="send" />'))
        ->toContain('class="plinth-button plinth-toolbar-action x"')
        ->toContain('type="submit"')
        ->toContain('data-size="lg"')
        ->toContain('wire:click="send"');
});

it('needs an action\'s label', function () {
    Blade::render('<x-plinth::toolbar-action />');
})->throws(Exception::class, 'needs a label');

it('prints the scope button with its label and chevron', function () {
    $html = Blade::render('<x-plinth::toolbar-scope label="In: <Open>" popovertarget="scope" class="x" />');

    expect(squish($html))->toBe(
        '<button class="plinth-toolbar-scope x" type="button" popovertarget="scope">'
        .'<span class="plinth-toolbar-scope-label">In: &lt;Open&gt;</span>'
        .'<span class="plinth-icon" data-size="sm" data-icon="chevron-down" aria-hidden="true">'.Glyph::ChevronDown->svg().'</span></button>'
    );
});

it('needs the scope\'s label', function () {
    Blade::render('<x-plinth::toolbar-scope label="" />');
})->throws(Exception::class, 'needs a label');

it('prints the search with its icon and field, named Search by default', function () {
    expect(squish(Blade::render('<x-plinth::toolbar-search />')))->toBe(
        '<search class="plinth-toolbar-search">'
        .'<span class="plinth-icon" data-size="sm" data-icon="search" aria-hidden="true">'.Glyph::Search->svg().'</span>'
        .'<input type="search" class="plinth-toolbar-search-input" aria-label="Search"></search>'
    );
});

it('prints the scope, the class on the root and every other attribute on the field', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::toolbar-search label="Search tickets" class="x" name="q" aria-label="Find" wire:model.live="q">
            <x-slot:scope><button class="scope">In: Open</button></x-slot:scope>
        </x-plinth::toolbar-search>
        BLADE);

    expect(squish($html))
        ->toStartWith('<search class="plinth-toolbar-search x">')
        ->toContain('<input type="search" class="plinth-toolbar-search-input" aria-label="Find" name="q" wire:model.live="q">')
        ->toEndWith('<button class="scope">In: Open</button></search>');
});

it('leaves out an empty scope', function () {
    expect(Blade::render('<x-plinth::toolbar-search><x-slot:scope> </x-slot:scope></x-plinth::toolbar-search>'))
        ->not->toContain('<x-slot');
});

it('needs the search\'s label', function () {
    Blade::render('<x-plinth::toolbar-search label=" " />');
})->throws(Exception::class, 'needs a label');
