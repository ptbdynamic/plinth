{{-- Markup contract: packages/css/src/components/menu.css --}}
@props([
    'id' => null,
])
@php
    if (blank($id)) {
        throw new InvalidArgumentException('<x-plinth::menu> needs an id: its button names it in popovertarget.');
    }
    // A button item finds this menu's id itself (BDynamic\Plinth\Support\MenuContext).
    $root = [
        'class' => 'plinth-menu',
        'id' => trim($id),
        'popover' => 'auto',
    ];
@endphp
<div {{ $attributes->merge($root) }}>{{ $slot }}</div>
