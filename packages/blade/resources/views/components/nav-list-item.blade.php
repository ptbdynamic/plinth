{{-- Markup contract: packages/css/src/components/nav-list.css --}}
@props([
    'href' => null,
    'count' => null,
    'current' => false,
])
<a {{ $attributes->merge(array_filter([
    'class' => 'plinth-nav-list-item',
    'href' => filled($href) ? $href : null,
    'aria-current' => $current ? 'page' : null,
], fn ($value) => $value !== null)) }}>
    <span class="plinth-nav-list-label">{{ $slot }}</span>
    @if (filled($count))
        <span class="plinth-nav-list-count">{{ $count }}</span>
    @endif
</a>
