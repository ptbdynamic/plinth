{{-- Markup contract: packages/css/src/components/toolbar.css --}}
@props([
    'label' => null,
])
@php
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::toolbar-scope> needs a label: it is the button\'s text and name.');
    }
@endphp
<button {{ $attributes->merge(['class' => 'plinth-toolbar-scope', 'type' => 'button']) }}>
    <span class="plinth-toolbar-scope-label">{{ $label }}</span>
    <x-plinth::icon name="chevron-down" size="sm" />
</button>
