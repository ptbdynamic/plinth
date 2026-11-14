{{-- Markup contract: packages/css/src/components/select.css --}}
@props([
    'label' => null,
    'hideLabel' => false,
    'id' => null,
    'size' => 'md',
    'placeholder' => null,
    'description' => null,
    'error' => null,
    'disabled' => false,
    'required' => false,
])
@php
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::select> needs a label: it is the field\'s accessible name.');
    }
    $id = filled($id) ? trim($id) : 'plinth-select-'.\Illuminate\Support\Str::lower(\Illuminate\Support\Str::random(8));
    $size = \BDynamic\Plinth\Enums\Size::resolve($size, [\BDynamic\Plinth\Enums\Size::Small, \BDynamic\Plinth\Enums\Size::Medium]);
    $hasDescription = filled($description);
    $hasError = filled($error);
    $describedBy = implode(' ', array_filter([
        $hasDescription ? $id.'-description' : null,
        $hasError ? $id.'-error' : null,
    ]));
    // The project's class goes on the root; every other attribute on the select, where it wins.
    $root = array_filter([
        'class' => 'plinth-select',
        'data-size' => $size->value,
        'data-label' => $hideLabel ? 'hidden' : null,
    ], fn ($value) => $value !== null);
    $control = array_filter([
        'id' => $id,
        'class' => 'plinth-select-input',
        'disabled' => $disabled ? '' : null,
        'required' => $required ? '' : null,
        'aria-describedby' => $describedBy !== '' ? $describedBy : null,
        'aria-invalid' => $hasError ? 'true' : null,
    ], fn ($value) => $value !== null);
@endphp
<div {{ $attributes->only('class')->merge($root) }}>
    <label class="plinth-select-label" for="{{ $id }}">{{ $label }}</label>
    <div class="plinth-select-control">
        <select {{ $attributes->except('class')->merge($control) }}>
            @if (filled(trim((string) $placeholder)))
                <option value="" disabled selected>{{ $placeholder }}</option>
            @endif
            {{ $slot }}
        </select>
    </div>
    @if ($hasDescription)
        <p id="{{ $id }}-description" class="plinth-select-description">{{ $description }}</p>
    @endif
    @if ($hasError)
        <p id="{{ $id }}-error" class="plinth-select-error">{{ $error }}</p>
    @endif
</div>
