{{-- Markup contract: packages/css/src/components/switch.css --}}
@props([
    'label' => null,
    'id' => null,
    'description' => null,
    'error' => null,
    'disabled' => false,
])
@php
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::switch> needs a label: it is the switch\'s accessible name.');
    }
    $id = filled($id) ? trim($id) : 'plinth-switch-'.\Illuminate\Support\Str::lower(\Illuminate\Support\Str::random(8));
    // The project's class goes on the root; every other attribute on the input, where it wins.
    $input = array_filter([
        'id' => $id,
        'type' => 'checkbox',
        'role' => 'switch',
        'class' => 'plinth-switch-input',
        'disabled' => $disabled ? '' : null,
        'aria-describedby' => \BDynamic\Plinth\Support\Field::describedBy($id, $description, $error),
        'aria-invalid' => filled($error) ? 'true' : null,
    ], fn ($value) => $value !== null);
@endphp
<div {{ $attributes->only('class')->merge(['class' => 'plinth-switch']) }}>
    <input {{ $attributes->except('class')->merge($input) }}>
    <label class="plinth-switch-label" for="{{ $id }}">{{ $label }}</label>
    @if (filled($description))
        <p id="{{ $id }}-description" class="plinth-switch-description">{{ $description }}</p>
    @endif
    @if (filled($error))
        <p id="{{ $id }}-error" class="plinth-switch-error">{{ $error }}</p>
    @endif
</div>
