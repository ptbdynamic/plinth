{{-- Markup contract: packages/css/src/components/toolbar.css --}}
@props([
    'label' => 'Search',
    'scope' => null,
])
@php
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::toolbar-search> needs a label: it is the field\'s name.');
    }
    $hasScope = $scope instanceof \Illuminate\View\ComponentSlot && $scope->hasActualContent();
    // The project's class goes on the root; every other attribute on the input, where it wins.
    $input = [
        'type' => 'search',
        'class' => 'plinth-toolbar-search-input',
        'aria-label' => $label,
    ];
@endphp
<div {{ $attributes->only('class')->merge(['class' => 'plinth-toolbar-search']) }} role="search">
    <x-plinth::icon name="search" size="sm" />
    <input {{ $attributes->except('class')->merge($input) }}>
    @if ($hasScope)
        {{ $scope }}
    @endif
</div>
