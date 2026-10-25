{{-- Markup contract: packages/css/src/components/list-header.css --}}
@props([
    'heading' => null,
    'headingLevel' => 'h2',
    'count' => null,
    'selection' => null,
])
@php
    if (blank($heading)) {
        throw new InvalidArgumentException('<x-plinth::list-header> needs a heading: it names the list.');
    }
    $level = \BDynamic\Plinth\Enums\HeadingLevel::resolve($headingLevel)->value;
    $selecting = filled($selection);
@endphp
<div {{ $attributes->merge(['class' => $selecting ? 'plinth-list-header is-selecting' : 'plinth-list-header']) }}>
    <{{ $level }} class="plinth-list-header-heading">
        <span class="plinth-list-header-title">{{ $heading }}</span>
        @if (filled($count))
            <span class="plinth-list-header-count">{{ $count }}</span>
        @endif
    </{{ $level }}>
    <p class="plinth-list-header-selection" role="status">{{ $selecting ? $selection : '' }}</p>
    @if (isset($actions) && $actions->hasActualContent())
        <div class="plinth-list-header-actions">{{ $actions }}</div>
    @endif
</div>
