{{-- Markup contract: packages/css/src/components/page-intro.css --}}
@props([
    'heading' => null,
    'level' => 'h1',
    'description' => null,
    'descriptionId' => null,
    'wideOnly' => false,
])
@php
    if (blank($heading)) {
        throw new InvalidArgumentException('<x-plinth::page-intro> needs a heading: it is the page\'s heading.');
    }
    $element = \BDynamic\Plinth\Enums\PageHeaderLevel::resolve($level)->value;
@endphp
<div {{ $attributes->merge(array_filter([
    'class' => 'plinth-page-intro',
    'data-wide-only' => $wideOnly ? '' : null,
], fn ($value) => $value !== null)) }}>
    <div class="plinth-page-intro-text">
        <{{ $element }} class="plinth-page-intro-heading">{{ $heading }}</{{ $element }}>
        @if (filled($description))
            <p class="plinth-page-intro-description"@if (filled($descriptionId)) id="{{ $descriptionId }}"@endif>{{ $description }}</p>
        @endif
    </div>
    @if (isset($actions) && $actions->hasActualContent())
        <div class="plinth-page-intro-actions">{{ $actions }}</div>
    @endif
</div>
