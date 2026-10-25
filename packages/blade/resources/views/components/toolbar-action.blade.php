{{-- Markup contract: packages/css/src/components/toolbar.css --}}
@props([
    'label' => null,
    'icon' => null,
    'overflow' => false,
    'disabled' => false,
])
@php
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::toolbar-action> needs a label: it is the action\'s name.');
    }
    // A built-in glyph by name; the slot shows when it is missing or not one.
    $glyph = \BDynamic\Plinth\Enums\Glyph::resolve($icon);
    $root = array_filter([
        'class' => 'plinth-button plinth-toolbar-action',
        'type' => 'button',
        'data-variant' => 'ghost',
        'data-size' => 'md',
        'data-overflow' => $overflow ? '' : null,
        'disabled' => $disabled ? '' : null,
    ], fn ($value) => $value !== null);
@endphp
<button {{ $attributes->merge($root) }}>
    <span class="plinth-icon" data-size="md" @if ($glyph) data-icon="{{ $glyph->value }}" @endif @if ($glyph?->mirrors()) data-mirror @endif aria-hidden="true">@if ($glyph){!! $glyph->svg() !!}@else{{ $slot }}@endif</span>
    <span class="plinth-button-label">{{ $label }}</span>
</button>
