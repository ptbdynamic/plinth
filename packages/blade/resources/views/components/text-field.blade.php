{{-- Markup contract: packages/css/src/components/text-field.css --}}
@props([
    'label' => null,
    'hideLabel' => false,
    'id' => null,
    'type' => 'text',
    'size' => 'md',
    'description' => null,
    'error' => null,
    'disabled' => false,
    'readonly' => false,
    'icon' => null,
    'trailing' => null,
])
@php
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::text-field> needs a label: it is the field\'s accessible name.');
    }
    $id = filled($id) ? trim($id) : 'plinth-text-field-'.\Illuminate\Support\Str::lower(\Illuminate\Support\Str::random(8));
    $size = \BDynamic\Plinth\Enums\Size::resolve($size, [\BDynamic\Plinth\Enums\Size::Small, \BDynamic\Plinth\Enums\Size::Medium]);
    $hasDescription = filled($description);
    $hasError = filled($error);
    $describedBy = implode(' ', array_filter([
        $hasDescription ? $id.'-description' : null,
        $hasError ? $id.'-error' : null,
    ]));
    $filled = fn ($slot) => $slot instanceof \Illuminate\View\ComponentSlot && $slot->hasActualContent();
    // The project's class goes on the root; every other attribute on the input, where it wins.
    $root = array_filter([
        'class' => 'plinth-text-field',
        'data-size' => $size->value,
        'data-label' => $hideLabel ? 'hidden' : null,
    ], fn ($value) => $value !== null);
    $input = array_filter([
        'id' => $id,
        'type' => $type,
        'class' => 'plinth-text-field-input',
        'disabled' => $disabled ? '' : null,
        'readonly' => $readonly ? '' : null,
        'aria-describedby' => $describedBy !== '' ? $describedBy : null,
        'aria-invalid' => $hasError ? 'true' : null,
    ], fn ($value) => $value !== null);
@endphp
<div {{ $attributes->only('class')->merge($root) }}>
    <label class="plinth-text-field-label" for="{{ $id }}">{{ $label }}</label>
    <div class="plinth-text-field-control">
        @if ($filled($icon))
            <span class="plinth-icon" data-size="sm" aria-hidden="true">{{ $icon }}</span>
        @endif
        <input {{ $attributes->except('class')->merge($input) }}>
        @if ($filled($trailing))
            <span class="plinth-text-field-trailing">{{ $trailing }}</span>
        @endif
    </div>
    @if ($hasDescription)
        <p id="{{ $id }}-description" class="plinth-text-field-description">{{ $description }}</p>
    @endif
    @if ($hasError)
        <p id="{{ $id }}-error" class="plinth-text-field-error">{{ $error }}</p>
    @endif
</div>
