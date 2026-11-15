{{-- Markup contract: packages/css/src/components/app-nav.css --}}
@props([
    'label' => null,
    'brandName' => null,
    'brandHref' => null,
    'variant' => 'sidebar',
])
@php
    $hasMark = isset($mark) && $mark->hasActualContent();
    $brandName = filled($brandName) ? $brandName : null;
    $brandTag = filled($brandHref) ? 'a' : 'div';
    // The default, the sidebar, prints no attribute.
    $variant = \BDynamic\Plinth\Enums\AppNavVariant::resolve($variant);
@endphp
<nav {{ $attributes->merge(array_filter([
    'class' => 'plinth-app-nav',
    'data-variant' => $variant === \BDynamic\Plinth\Enums\AppNavVariant::Rail ? $variant->value : null,
    'aria-label' => filled($label) ? $label : null,
], fn ($value) => $value !== null)) }}>
    @if ($brandName !== null || $hasMark)
        <{{ $brandTag }} class="plinth-app-nav-brand"{!! $brandTag === 'a' ? ' href="'.e($brandHref).'"' : '' !!}>
            @if ($hasMark)
                <span class="plinth-app-nav-mark"{!! $brandName !== null ? ' aria-hidden="true"' : '' !!}>{{ $mark }}</span>
            @endif
            @if ($brandName !== null)
                <span class="plinth-app-nav-name">{{ $brandName }}</span>
            @endif
        </{{ $brandTag }}>
    @endif
    <div class="plinth-app-nav-items">{{ $slot }}</div>
    @if (isset($footer) && $footer->hasActualContent())
        <div class="plinth-app-nav-footer">{{ $footer }}</div>
    @endif
</nav>
