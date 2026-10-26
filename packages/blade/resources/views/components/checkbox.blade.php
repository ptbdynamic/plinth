{{-- Markup contract: packages/css/src/components/checkbox.css --}}
@props([
    'label' => null,
    'id' => null,
    'indeterminate' => false,
    'description' => null,
    'error' => null,
    'disabled' => false,
])
@php
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::checkbox> needs a label: it is the checkbox\'s accessible name.');
    }
    $id = filled($id) ? trim($id) : 'plinth-checkbox-'.\Illuminate\Support\Str::lower(\Illuminate\Support\Str::random(8));
    // The project's class goes on the root; every other attribute on the input, where it wins.
    // Indeterminate is a property with no attribute, so Alpine sets it, to false too, so a box
    // that is printed again after a change doesn't keep the old state.
    $input = array_filter([
        'id' => $id,
        'type' => 'checkbox',
        'class' => 'plinth-checkbox-input',
        'disabled' => $disabled ? '' : null,
        'aria-describedby' => \BDynamic\Plinth\Support\Field::describedBy($id, $description, $error),
        'aria-invalid' => filled($error) ? 'true' : null,
        'x-init' => '$el.indeterminate = '.($indeterminate ? 'true' : 'false'),
    ], fn ($value) => $value !== null);
@endphp
<div {{ $attributes->only('class')->merge(['class' => 'plinth-checkbox']) }}>
    <input {{ $attributes->except('class')->merge($input) }}>
    <label class="plinth-checkbox-label" for="{{ $id }}">{{ $label }}</label>
    @if (filled($description))
        <p id="{{ $id }}-description" class="plinth-checkbox-description">{{ $description }}</p>
    @endif
    @if (filled($error))
        <p id="{{ $id }}-error" class="plinth-checkbox-error">{{ $error }}</p>
    @endif
</div>
