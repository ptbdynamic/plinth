{{-- Markup contract: packages/css/src/components/toolbar.css --}}
@props([
    'label' => null,
])
<div {{ $attributes->merge(array_filter([
    'class' => 'plinth-toolbar-group',
    'role' => 'group',
    'aria-label' => filled($label) ? $label : null,
], fn ($value) => $value !== null)) }}>{{ $slot }}</div>
