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
    'toggle' => false,
    'checked' => false,
    'switchId' => null,
    'name' => null,
    'value' => null,
])
@php
    // A selectable row wins over a setting row, and both over a link or a button.
    $setting = ! $selectable && $toggle;
    $control = $selectable || $setting;
    $tag = $control ? 'label' : (filled($href) ? 'a' : ($button ? 'button' : 'div'));
    $root = array_filter([
        'class' => 'plinth-list-row',
        'type' => $tag === 'button' ? 'button' : null,
        'href' => $tag === 'a' && ! $disabled ? $href : null,
        'aria-current' => $current && $tag !== 'button' ? 'page' : null,
        'disabled' => $tag === 'button' && $disabled ? '' : null,
        'role' => $tag === 'a' && $disabled ? 'link' : null,
        'aria-disabled' => $tag === 'a' && $disabled ? 'true' : null,
        // Not selecting, name and value are the root's own, as they were before they were props.
        'name' => ! $control && filled($name) ? $name : null,
        'value' => ! $control && filled($value) ? $value : null,
    ], fn ($value) => $value !== null);
    // A selectable or setting row opens nothing, so it has no chevron.
    $chevron = $chevron && ! $control;
    // merge() escapes the values, as $attributes->merge() does on the root.
    $checkbox = (new \Illuminate\View\ComponentAttributeBag)->merge(array_filter([
        'type' => 'checkbox',
        'class' => 'plinth-list-row-checkbox',
        'name' => filled($name) ? $name : null,
        'value' => filled($value) ? $value : null,
        'checked' => $selected ? '' : null,
        'disabled' => $disabled ? '' : null,
    ], fn ($value) => $value !== null));
    // A setting row's switch is named by the title and described by the description.
    $switchId = filled($switchId) ? trim($switchId) : 'plinth-list-row-switch-'.\Illuminate\Support\Str::lower(\Illuminate\Support\Str::random(8));
    $switch = (new \Illuminate\View\ComponentAttributeBag)->merge(array_filter([
        'type' => 'checkbox',
        'role' => 'switch',
        'class' => 'plinth-switch-input',
        'id' => $switchId,
        'aria-labelledby' => $switchId.'-title',
        'aria-describedby' => filled($description) ? $switchId.'-description' : null,
        'name' => filled($name) ? $name : null,
        'value' => filled($value) ? $value : null,
        'checked' => $checked ? '' : null,
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
        <span class="plinth-list-row-title"@if ($setting) id="{{ $switchId }}-title"@endif>{{ $slot }}</span>
        @if (filled($description))
            <span class="plinth-list-row-description"@if ($setting) id="{{ $switchId }}-description"@endif>{{ $description }}</span>
        @endif
    </span>
    @if (isset($trailing) || $chevron || $setting)
        <span class="plinth-list-row-trailing">{{ $trailing ?? '' }}@if ($setting)<input {{ $switch }}>@elseif ($chevron)<x-plinth::icon class="plinth-list-row-chevron" name="chevron-right" size="sm" />@endif</span>
    @endif
</{{ $tag }}>
