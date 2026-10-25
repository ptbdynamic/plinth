{{-- Markup contract: packages/css/src/components/empty-state.css --}}
@props([
    'heading' => null,
    'headingLevel' => 'h2',
    'description' => null,
    'framed' => false,
])
@php
    if (blank($heading)) {
        throw new InvalidArgumentException('<x-plinth::empty-state> needs a heading: it says what is empty.');
    }
    $level = \BDynamic\Plinth\Enums\HeadingLevel::resolve($headingLevel)->value;
@endphp
<div {{ $attributes->merge(array_filter([
    'class' => 'plinth-empty-state',
    'data-framed' => $framed ? '' : null,
], fn ($value) => $value !== null)) }}>
    @if (isset($icon) && $icon->hasActualContent())
        <div class="plinth-empty-state-icon">{{ $icon }}</div>
    @endif
    <{{ $level }} class="plinth-empty-state-heading">{{ $heading }}</{{ $level }}>
    @if (filled($description))
        <p class="plinth-empty-state-description">{{ $description }}</p>
    @endif
    @if (isset($actions) && $actions->hasActualContent())
        <div class="plinth-empty-state-actions">{{ $actions }}</div>
    @endif
</div>
