{{-- Markup contract: packages/css/src/components/app-bar.css --}}
@props([
    'label' => 'Search',
    'shortcut' => null,
])
@php
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::app-bar-search> needs a label: it is the button\'s text and name.');
    }
@endphp
<button {{ $attributes->merge(['class' => 'plinth-app-bar-search', 'type' => 'button']) }}>
    <x-plinth::icon name="search" size="sm" />
    <span class="plinth-app-bar-search-label">{{ $label }}</span>
    @if (filled($shortcut))
        <kbd class="plinth-app-bar-search-shortcut" aria-hidden="true">{{ $shortcut }}</kbd>
    @endif
</button>
