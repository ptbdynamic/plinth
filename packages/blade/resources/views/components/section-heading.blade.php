{{-- Markup contract: packages/css/src/components/section-heading.css --}}
@props([
    'heading' => null,
    'headingLevel' => 'h2',
    'headingId' => null,
    'description' => null,
    'divider' => false,
])
@php
    if (blank($heading)) {
        throw new InvalidArgumentException('<x-plinth::section-heading> needs a heading: it names the section.');
    }
    $level = \BDynamic\Plinth\Enums\HeadingLevel::resolve($headingLevel)->value;
@endphp
<div {{ $attributes->merge(['class' => 'plinth-section-heading', 'data-divider' => $divider ? '' : null]) }}>
    <div class="plinth-section-heading-text">
        <{{ $level }} class="plinth-section-heading-title"@if (filled($headingId)) id="{{ $headingId }}"@endif>{{ $heading }}</{{ $level }}>
        @if (filled($description))
            <p class="plinth-section-heading-description">{{ $description }}</p>
        @endif
    </div>
    @if (isset($actions) && $actions->hasActualContent())
        <div class="plinth-section-heading-actions">{{ $actions }}</div>
    @endif
</div>
