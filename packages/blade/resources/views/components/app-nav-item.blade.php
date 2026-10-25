{{-- Markup contract: packages/css/src/components/app-nav.css --}}
@props([
    'href' => null,
    'count' => null,
    'current' => false,
])
<a {{ $attributes->merge(array_filter([
    'class' => 'plinth-app-nav-item',
    'href' => filled($href) ? $href : null,
    'aria-current' => $current ? 'page' : null,
], fn ($value) => $value !== null)) }}>
    @if (isset($icon) && $icon->hasActualContent())
        <span class="plinth-app-nav-icon" aria-hidden="true">{{ $icon }}</span>
    @endif
    <span class="plinth-app-nav-label">{{ $slot }}</span>
    @if (filled($count))
        <span class="plinth-app-nav-count">{{ $count }}</span>
    @endif
</a>
