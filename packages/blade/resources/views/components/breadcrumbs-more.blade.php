{{-- Markup contract: packages/css/src/components/breadcrumbs.css --}}
@props([
    'menu' => null,
    'label' => 'More pages',
])
@php
    if (blank($menu)) {
        throw new InvalidArgumentException('<x-plinth::breadcrumbs-more> needs a menu: the id of the menu its button opens.');
    }
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::breadcrumbs-more> needs a label: it is the button\'s name.');
    }
    // The button is the root: the app's attributes land on it, and the app's menu follows it.
    $root = [
        'class' => 'plinth-breadcrumbs-more',
        'type' => 'button',
        'popovertarget' => trim($menu),
        'aria-label' => $label,
    ];
@endphp
<li class="plinth-breadcrumbs-item"><button {{ $attributes->merge($root) }}><x-plinth::icon name="more" size="sm" /></button>{{ $slot }}</li>
