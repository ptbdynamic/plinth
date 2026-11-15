<?php

use BDynamic\Plinth\Enums\BreadcrumbsCollapse;
use Illuminate\Support\Facades\Blade;

it('prints a nav named Breadcrumb around an ordered list', function () {
    expect(squish(Blade::render('<x-plinth::breadcrumbs><i>items</i></x-plinth::breadcrumbs>')))
        ->toBe('<nav class="plinth-breadcrumbs" aria-label="Breadcrumb"><ol class="plinth-breadcrumbs-list"><i>items</i></ol></nav>');
});

it('takes its own label, and leaves out a blank one', function () {
    expect(Blade::render('<x-plinth::breadcrumbs label="Settings">x</x-plinth::breadcrumbs>'))
        ->toContain('aria-label="Settings"');
    expect(Blade::render('<x-plinth::breadcrumbs label=" ">x</x-plinth::breadcrumbs>'))
        ->not->toContain('aria-label');
});

it('escapes the label', function () {
    expect(Blade::render('<x-plinth::breadcrumbs :label="$text">x</x-plinth::breadcrumbs>', ['text' => '"><b>x</b>']))
        ->not->toContain('<b>')
        ->toContain('aria-label="&quot;&gt;&lt;b&gt;x&lt;/b&gt;"');
});

it('collapses to the parent, by value or case, and falls back to none', function (mixed $collapse, ?string $printed) {
    $html = Blade::render('<x-plinth::breadcrumbs :collapse="$collapse">x</x-plinth::breadcrumbs>', ['collapse' => $collapse]);

    $printed === null
        ? expect($html)->not->toContain('data-collapse')
        : expect($html)->toContain('data-collapse="'.$printed.'"');
})->with([
    'parent' => ['parent', 'parent'],
    'the case' => [BreadcrumbsCollapse::Parent, 'parent'],
    'none' => ['none', null],
    'unknown' => ['menu', null],
]);

it('passes extra attributes to its root, and the project\'s attribute wins', function () {
    $html = Blade::render('<x-plinth::breadcrumbs class="ms-2" aria-label="Path" x-data="{}" wire:key="trail">x</x-plinth::breadcrumbs>');

    expect($html)
        ->toContain('class="plinth-breadcrumbs ms-2"')
        ->toContain('aria-label="Path"')
        ->not->toContain('Breadcrumb')
        ->toContain('x-data="{}"')
        ->toContain('wire:key="trail"');
});

it('prints an item as a link in a list item', function () {
    expect(squish(Blade::render('<x-plinth::breadcrumbs-item href="/settings">Settings</x-plinth::breadcrumbs-item>')))
        ->toBe('<li class="plinth-breadcrumbs-item"><a class="plinth-breadcrumbs-link" href="/settings"><span class="plinth-breadcrumbs-label">Settings</span></a></li>');
});

it('marks the current page, without an href', function () {
    expect(squish(Blade::render('<x-plinth::breadcrumbs-item href="/users" current>Users</x-plinth::breadcrumbs-item>')))
        ->toBe('<li class="plinth-breadcrumbs-item"><a class="plinth-breadcrumbs-link" aria-current="page"><span class="plinth-breadcrumbs-label">Users</span></a></li>');
});

it('leaves out a missing or blank href', function () {
    expect(Blade::render('<x-plinth::breadcrumbs-item>Users</x-plinth::breadcrumbs-item>'))->not->toContain('href');
    expect(Blade::render('<x-plinth::breadcrumbs-item href=" ">Users</x-plinth::breadcrumbs-item>'))->not->toContain('href');
});

it('escapes the item\'s label', function () {
    expect(Blade::render('<x-plinth::breadcrumbs-item href="/">{{ $label }}</x-plinth::breadcrumbs-item>', ['label' => '<b>x</b>']))
        ->toContain('&lt;b&gt;x&lt;/b&gt;');
});

it('passes an item\'s attributes to its link, and the project\'s attribute wins', function () {
    $html = Blade::render('<x-plinth::breadcrumbs-item href="/" current class="ms-2" aria-current="location" wire:navigate>Home</x-plinth::breadcrumbs-item>');

    expect($html)
        ->toContain('<li class="plinth-breadcrumbs-item"><a class="plinth-breadcrumbs-link ms-2" aria-current="location" wire:navigate')
        ->not->toContain('aria-current="page"');
});

it('prints the more button with the app\'s menu after it', function () {
    $html = squish(Blade::render('<x-plinth::breadcrumbs-more menu=" trail-more "><div id="trail-more" popover>menu</div></x-plinth::breadcrumbs-more>'));

    expect($html)
        ->toStartWith('<li class="plinth-breadcrumbs-item"><button class="plinth-breadcrumbs-more" type="button" popovertarget="trail-more" aria-label="More pages"><span class="plinth-icon" data-size="sm" data-icon="more" aria-hidden="true"><svg')
        ->toEndWith('</svg></span></button><div id="trail-more" popover>menu</div></li>');
});

it('names the more button, and passes its attributes to it', function () {
    $html = Blade::render('<x-plinth::breadcrumbs-more menu="m" label="Earlier pages" class="ms-2" type="submit" x-on:click="open">x</x-plinth::breadcrumbs-more>');

    expect($html)
        ->toContain('class="plinth-breadcrumbs-more ms-2" type="submit"')
        ->toContain('aria-label="Earlier pages"')
        ->toContain('x-on:click="open"');
});

it('needs a menu and a label for the more button', function (string $template) {
    Blade::render($template);
})->with([
    'no menu' => '<x-plinth::breadcrumbs-more>x</x-plinth::breadcrumbs-more>',
    'blank menu' => '<x-plinth::breadcrumbs-more menu=" ">x</x-plinth::breadcrumbs-more>',
    'blank label' => '<x-plinth::breadcrumbs-more menu="m" label=" ">x</x-plinth::breadcrumbs-more>',
])->throws(Exception::class, 'needs a');
