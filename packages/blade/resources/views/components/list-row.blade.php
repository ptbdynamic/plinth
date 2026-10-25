{{-- Markup contract: packages/css/src/components/list-row.css --}}
@props([
    'description' => null,
    'chevron' => false,
    'href' => null,
    'button' => false,
    'current' => false,
    'disabled' => false,
    'selectable' => false,
    'selected' => false,
    'name' => null,
    'value' => null,
])
@php
    $tag = $selectable ? 'label' : (filled($href) ? 'a' : ($button ? 'button' : 'div'));
    $root = array_filter([
        'class' => 'plinth-list-row',
        'type' => $tag === 'button' ? 'button' : null,
        'href' => $tag === 'a' && ! $disabled ? $href : null,
        'aria-current' => $current && $tag !== 'button' ? 'page' : null,
        'disabled' => $tag === 'button' && $disabled ? '' : null,
        'role' => $tag === 'a' && $disabled ? 'link' : null,
        'aria-disabled' => $tag === 'a' && $disabled ? 'true' : null,
        // Not selecting, name and value are the root's own, as they were before they were props.
        'name' => ! $selectable && filled($name) ? $name : null,
        'value' => ! $selectable && filled($value) ? $value : null,
    ], fn ($value) => $value !== null);
    // A selectable row opens nothing, so it has no chevron.
    $chevron = $chevron && ! $selectable;
    // merge() escapes the values, as $attributes->merge() does on the root.
    $checkbox = (new \Illuminate\View\ComponentAttributeBag)->merge(array_filter([
        'type' => 'checkbox',
        'class' => 'plinth-list-row-checkbox',
        'name' => filled($name) ? $name : null,
        'value' => filled($value) ? $value : null,
        'checked' => $selected ? '' : null,
        'disabled' => $disabled ? '' : null,
    ], fn ($value) => $value !== null));
@endphp
<{{ $tag }} {{ $attributes->merge($root) }}>
    @if ($selectable)
        <span class="plinth-list-row-leading"><input {{ $checkbox }}></span>
    @elseif (isset($leading))
        <span class="plinth-list-row-leading">{{ $leading }}</span>
    @endif
    <span class="plinth-list-row-content">
        <span class="plinth-list-row-title">{{ $slot }}</span>
        @if (filled($description))
            <span class="plinth-list-row-description">{{ $description }}</span>
        @endif
    </span>
    @if (isset($trailing) || $chevron)
        <span class="plinth-list-row-trailing">{{ $trailing ?? '' }}@if ($chevron)<x-plinth::icon class="plinth-list-row-chevron" name="chevron-right" size="sm" />@endif</span>
    @endif
</{{ $tag }}>
