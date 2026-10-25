<?php

use BDynamic\Plinth\Enums\MenuItemTone;
use Illuminate\Support\Facades\Blade;

it('prints the menu markup contract', function () {
    expect(squish(Blade::render('<x-plinth::menu id="actions">Content</x-plinth::menu>')))
        ->toBe('<div class="plinth-menu" id="actions" popover="auto">Content</div>');
});

it('needs an id', function (?string $id) {
    Blade::render('<x-plinth::menu :id="$id">Content</x-plinth::menu>', ['id' => $id]);
})->with([null, '', ' '])->throws(Exception::class, 'needs an id');

it('trims the id', function () {
    expect(Blade::render('<x-plinth::menu id=" actions ">Content</x-plinth::menu>'))
        ->toContain('id="actions"');
});

it('keeps extra classes and attributes, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::menu id="actions" class="ms-2" data-test="menu" wire:key="m" x-on:toggle="open = $event.newState" popover="manual">Content</x-plinth::menu>');

    expect($html)
        ->toContain('class="plinth-menu ms-2"')
        ->toContain('data-test="menu"')
        ->toContain('wire:key="m"')
        ->toContain('x-on:toggle="open = $event.newState"')
        ->toContain('popover="manual"')
        ->not->toContain('popover="auto"');
});

it('prints a button item that closes the menu around it', function () {
    expect(squish(Blade::render('<x-plinth::menu id="actions"><x-plinth::menu-item>Archive</x-plinth::menu-item></x-plinth::menu>')))
        ->toBe('<div class="plinth-menu" id="actions" popover="auto"><button class="plinth-menu-item" type="button" commandfor="actions" command="hide-popover"><span class="plinth-menu-label">Archive</span></button></div>');
});

it('finds its menu through groups and other components, but not an id around the menu', function () {
    $html = Blade::render('<x-plinth::menu-group label="Wrapper" id="outer"><x-plinth::menu id="inner"><x-plinth::menu-group label="Move" id="group"><x-plinth::menu-item>Archive</x-plinth::menu-item></x-plinth::menu-group></x-plinth::menu></x-plinth::menu-group>');

    expect($html)->toContain('commandfor="inner"')
        ->not->toContain('commandfor="outer"')
        ->not->toContain('commandfor="group"');
});

it('finds the nearest of two menus', function () {
    $html = Blade::render('<x-plinth::menu id="outer"><x-plinth::menu id="inner"><x-plinth::menu-item>Archive</x-plinth::menu-item></x-plinth::menu></x-plinth::menu>');

    expect($html)->toContain('commandfor="inner"')->not->toContain('commandfor="outer"');
});

it('is not fooled by another package\'s menu component', function () {
    $dir = sys_get_temp_dir().'/plinth-menu-test-'.uniqid();
    mkdir($dir);
    file_put_contents($dir.'/menu.blade.php', '<nav>{{ $slot }}</nav>');
    Blade::anonymousComponentPath($dir, 'other');

    $html = Blade::render('<x-other::menu id="other"><x-plinth::menu-item>Archive</x-plinth::menu-item></x-other::menu>');

    expect($html)->not->toContain('commandfor');
    unlink($dir.'/menu.blade.php');
    rmdir($dir);
});

it('leaves out commandfor outside a menu, and closes the menu it names', function () {
    expect(Blade::render('<x-plinth::menu-item>Archive</x-plinth::menu-item>'))
        ->not->toContain('commandfor')
        ->not->toContain('command=');
    expect(Blade::render('<x-plinth::menu-item menu=" other ">Archive</x-plinth::menu-item>'))
        ->toContain('commandfor="other" command="hide-popover"');
    expect(Blade::render('<x-plinth::menu id="actions"><x-plinth::menu-item menu="other">Archive</x-plinth::menu-item></x-plinth::menu>'))
        ->toContain('commandfor="other"');
});

it('ignores an id given to the item itself', function () {
    expect(Blade::render('<x-plinth::menu id="actions"><x-plinth::menu-item id="archive">Archive</x-plinth::menu-item></x-plinth::menu>'))
        ->toContain('id="archive"')
        ->toContain('commandfor="actions"');
});

it('is a link with an href, which never closes the menu by command', function () {
    expect(squish(Blade::render('<x-plinth::menu id="actions"><x-plinth::menu-item href="/print">Print</x-plinth::menu-item></x-plinth::menu>')))
        ->toContain('<a class="plinth-menu-item" href="/print"><span class="plinth-menu-label">Print</span></a>');
    expect(Blade::render('<x-plinth::menu-item href=" ">Print</x-plinth::menu-item>'))
        ->toStartWith('<button class="plinth-menu-item" type="button">');
});

it('prints the icon and the shortcut, and leaves out empty ones', function () {
    $html = squish(Blade::render("<x-plinth::menu-item shortcut=\"⌘D\"><x-slot:icon><svg></svg></x-slot:icon>\nDuplicate</x-plinth::menu-item>"));

    expect($html)->toBe('<button class="plinth-menu-item" type="button"><span class="plinth-menu-icon" aria-hidden="true"><svg></svg></span><span class="plinth-menu-label">Duplicate</span><kbd class="plinth-menu-shortcut" aria-hidden="true">⌘D</kbd></button>');
    expect(Blade::render("<x-plinth::menu-item shortcut=\" \"><x-slot:icon> </x-slot:icon>\nDuplicate</x-plinth::menu-item>"))
        ->not->toContain('plinth-menu-icon')
        ->not->toContain('plinth-menu-shortcut');
});

it('takes the danger tone as a value or a case, and falls back to neutral', function () {
    expect(Blade::render('<x-plinth::menu-item tone="danger">Delete</x-plinth::menu-item>'))
        ->toContain('data-tone="danger"');
    expect(Blade::render('<x-plinth::menu-item :tone="$tone">Delete</x-plinth::menu-item>', ['tone' => MenuItemTone::Danger]))
        ->toContain('data-tone="danger"');
    foreach (['neutral', 'loud', null] as $tone) {
        expect(Blade::render('<x-plinth::menu-item :tone="$tone">Delete</x-plinth::menu-item>', ['tone' => $tone]))
            ->not->toContain('data-tone');
    }
});

it('disables a button and a link', function () {
    expect(Blade::render('<x-plinth::menu-item disabled>Archive</x-plinth::menu-item>'))
        ->toContain('type="button" disabled');
    expect(squish(Blade::render('<x-plinth::menu-item href="/print" disabled>Print</x-plinth::menu-item>')))
        ->toStartWith('<a class="plinth-menu-item" role="link" aria-disabled="true">')
        ->not->toContain('href');
});

it('escapes the label and the shortcut', function () {
    $html = Blade::render('<x-plinth::menu-item :shortcut="$text">{{ $text }}</x-plinth::menu-item>', ['text' => '<b>x</b>']);

    expect($html)->toContain('&lt;b&gt;x&lt;/b&gt;')->not->toContain('<b>');
});

it('passes extra attributes to the item, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::menu id="actions"><x-plinth::menu-item class="extra" wire:click="archive" x-on:click="done = true" aria-keyshortcuts="E" command="--archive" type="submit">Archive</x-plinth::menu-item></x-plinth::menu>');

    expect($html)
        ->toContain('class="plinth-menu-item extra"')
        ->toContain('wire:click="archive"')
        ->toContain('x-on:click="done = true"')
        ->toContain('aria-keyshortcuts="E"')
        ->toContain('command="--archive"')
        ->toContain('type="submit"')
        ->not->toContain('hide-popover');
});

it('prints a named group with its heading, and leaves out a blank label', function () {
    expect(squish(Blade::render('<x-plinth::menu-group label="Move to"><i>items</i></x-plinth::menu-group>')))
        ->toBe('<div class="plinth-menu-group" role="group" aria-label="Move to"><div class="plinth-menu-heading" aria-hidden="true">Move to</div><i>items</i></div>');
    foreach (['', ' ', null] as $label) {
        expect(squish(Blade::render('<x-plinth::menu-group :label="$label"><i>items</i></x-plinth::menu-group>', ['label' => $label])))
            ->toBe('<div class="plinth-menu-group" role="group"><i>items</i></div>');
    }
});

it('escapes the group label and passes its attributes', function () {
    $html = Blade::render('<x-plinth::menu-group :label="$label" class="extra" role="none">x</x-plinth::menu-group>', ['label' => '"><b>x</b>']);

    expect($html)
        ->toContain('aria-label="&quot;&gt;&lt;b&gt;x&lt;/b&gt;"')
        ->toContain('class="plinth-menu-group extra"')
        ->toContain('role="none"')
        ->not->toContain('<b>');
});

it('prints a separator with extra attributes', function () {
    expect(trim(Blade::render('<x-plinth::menu-separator />')))->toBe('<hr class="plinth-menu-separator">');
    expect(trim(Blade::render('<x-plinth::menu-separator class="extra" data-test="sep" />')))
        ->toBe('<hr class="plinth-menu-separator extra" data-test="sep">');
});
