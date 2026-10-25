{{-- Markup contract: packages/css/src/components/timeline.css --}}
@props([
    'label' => null,
])
<ol {{ $attributes->merge(array_filter([
    'class' => 'plinth-timeline',
    'role' => 'list',
    'aria-label' => filled($label) ? $label : null,
], fn ($value) => $value !== null)) }}>{{ $slot }}</ol>
