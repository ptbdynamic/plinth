{{-- Markup contract: packages/css/src/components/nav-list.css --}}
@props([
    'heading' => null,
    'headingLevel' => 'h2',
])
@php
    $level = \BDynamic\Plinth\Enums\HeadingLevel::resolve($headingLevel)->value;
@endphp
<div {{ $attributes->merge(['class' => 'plinth-nav-list-group']) }}>
    @if (filled($heading))
        <{{ $level }} class="plinth-nav-list-heading">{{ $heading }}</{{ $level }}>
    @endif
    {{ $slot }}
</div>
