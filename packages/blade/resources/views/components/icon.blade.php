{{-- Markup contract: packages/css/src/components/icon.css --}}
@props([
    'name' => null,
    'size' => 'md',
    'label' => null,
    'mirror' => false,
])
@php
    // A built-in glyph by name; the slot shows when it is missing or not one.
    $glyph = \BDynamic\Plinth\Enums\Glyph::resolve($name);
    // The label can also come as an aria-label attribute; a blank one leaves the icon decorative.
    $accessibleName = $label ?? $attributes->get('aria-label');
    $accessibleName = filled($accessibleName) ? $accessibleName : null;
@endphp
<span {{ $attributes->except('aria-label')->merge(array_filter([
    'class' => 'plinth-icon',
    'data-size' => \BDynamic\Plinth\Enums\Size::resolve($size, \BDynamic\Plinth\Enums\Size::icons())->value,
    'data-icon' => $glyph?->value,
    'data-mirror' => $mirror || $glyph?->mirrors() ? '' : null,
    'role' => $accessibleName !== null ? 'img' : null,
    'aria-label' => $accessibleName,
    'aria-hidden' => $accessibleName !== null ? null : 'true',
], fn ($value) => $value !== null)) }}>@if ($glyph){!! $glyph->svg() !!}@else{{ $slot }}@endif</span>
