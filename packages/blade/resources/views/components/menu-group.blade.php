{{-- Markup contract: packages/css/src/components/menu.css --}}
@props([
    'label' => null,
])
@php
    $root = array_filter([
        'class' => 'plinth-menu-group',
        'role' => 'group',
        'aria-label' => filled($label) ? $label : null,
    ], fn ($value) => $value !== null);
@endphp
<div {{ $attributes->merge($root) }}>
    @if (filled($label))
        <div class="plinth-menu-heading" aria-hidden="true">{{ $label }}</div>
    @endif
    {{ $slot }}
</div>
