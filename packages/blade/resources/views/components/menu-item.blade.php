{{-- Markup contract: packages/css/src/components/menu.css --}}
@props([
    'href' => null,
    'tone' => 'neutral',
    'shortcut' => null,
    'disabled' => false,
    'menu' => null,
])
@php
    $tag = filled($href) ? 'a' : 'button';
    // A button item closes its menu: the one named, or the one it sits in.
    $closes = $tag === 'button' ? (filled($menu) ? trim($menu) : \BDynamic\Plinth\Support\MenuContext::id($__env)) : null;
    $tone = \BDynamic\Plinth\Enums\MenuItemTone::resolve($tone);
    $root = array_filter([
        'class' => 'plinth-menu-item',
        'type' => $tag === 'button' ? 'button' : null,
        'href' => $tag === 'a' && ! $disabled ? $href : null,
        'commandfor' => $closes,
        'command' => $closes !== null ? 'hide-popover' : null,
        'data-tone' => $tone === \BDynamic\Plinth\Enums\MenuItemTone::Danger ? 'danger' : null,
        'disabled' => $tag === 'button' && $disabled ? '' : null,
        'role' => $tag === 'a' && $disabled ? 'link' : null,
        'aria-disabled' => $tag === 'a' && $disabled ? 'true' : null,
    ], fn ($value) => $value !== null);
@endphp
<{{ $tag }} {{ $attributes->merge($root) }}>
    @if (isset($icon) && $icon->hasActualContent())
        <span class="plinth-menu-icon" aria-hidden="true">{{ $icon }}</span>
    @endif
    <span class="plinth-menu-label">{{ $slot }}</span>
    @if (filled($shortcut))
        <kbd class="plinth-menu-shortcut" aria-hidden="true">{{ $shortcut }}</kbd>
    @endif
</{{ $tag }}>
