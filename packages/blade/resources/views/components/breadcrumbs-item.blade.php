{{-- Markup contract: packages/css/src/components/breadcrumbs.css --}}
@props([
    'href' => null,
    'current' => false,
])
@php
    // The link is the item's root: the app's attributes land on it, not on the <li>.
    $root = array_filter([
        'class' => 'plinth-breadcrumbs-link',
        'href' => ! $current && filled($href) ? $href : null,
        'aria-current' => $current ? 'page' : null,
    ], fn ($value) => $value !== null);
@endphp
<li class="plinth-breadcrumbs-item"><a {{ $attributes->merge($root) }}><span class="plinth-breadcrumbs-label">{{ $slot }}</span></a></li>
