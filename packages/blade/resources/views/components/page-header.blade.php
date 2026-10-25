{{-- Markup contract: packages/css/src/components/page-header.css --}}
@props([
    'heading' => null,
    'level' => 'h1',
    'top' => false,
])
@php
    if (blank($heading)) {
        throw new InvalidArgumentException('<x-plinth::page-header> needs a heading: it is the page\'s heading.');
    }
    $element = \BDynamic\Plinth\Enums\PageHeaderLevel::resolve($level)->value;
@endphp
<header {{ $attributes->merge(array_filter([
    'class' => 'plinth-page-header',
    'data-top' => $top ? '' : null,
], fn ($value) => $value !== null)) }}>
    @if (isset($leading) && $leading->hasActualContent())
        <div class="plinth-page-header-leading">{{ $leading }}</div>
    @endif
    <{{ $element }} class="plinth-page-header-heading">{{ $heading }}</{{ $element }}>
    @if (isset($actions) && $actions->hasActualContent())
        <div class="plinth-page-header-actions">{{ $actions }}</div>
    @endif
</header>
