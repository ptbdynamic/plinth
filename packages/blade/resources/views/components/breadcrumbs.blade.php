{{-- Markup contract: packages/css/src/components/breadcrumbs.css --}}
@props([
    'label' => 'Breadcrumb',
    'collapse' => 'none',
])
@php
    $collapse = \BDynamic\Plinth\Enums\BreadcrumbsCollapse::resolve($collapse);
    $root = array_filter([
        'class' => 'plinth-breadcrumbs',
        'aria-label' => filled($label) ? $label : null,
        'data-collapse' => $collapse === \BDynamic\Plinth\Enums\BreadcrumbsCollapse::None ? null : $collapse->value,
    ], fn ($value) => $value !== null);
@endphp
<nav {{ $attributes->merge($root) }}><ol class="plinth-breadcrumbs-list">{{ $slot }}</ol></nav>
