{{-- Markup contract: packages/css/src/components/nav-list.css --}}
@props([
    'label' => null,
])
<nav {{ $attributes->merge(array_filter([
    'class' => 'plinth-nav-list',
    'aria-label' => filled($label) ? $label : null,
], fn ($value) => $value !== null)) }}>{{ $slot }}</nav>
