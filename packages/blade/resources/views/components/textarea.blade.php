{{-- Markup contract: packages/css/src/components/textarea.css --}}
@props([
    'label' => null,
    'hideLabel' => false,
    'id' => null,
    'rows' => 3,
    'grow' => false,
    'maxRows' => 8,
    'description' => null,
    'error' => null,
    'disabled' => false,
    'readonly' => false,
])
@php
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::textarea> needs a label: it is the field\'s accessible name.');
    }
    $id = filled($id) ? trim($id) : 'plinth-textarea-'.\Illuminate\Support\Str::lower(\Illuminate\Support\Str::random(8));
    $hasDescription = filled($description);
    $hasError = filled($error);
    $describedBy = implode(' ', array_filter([
        $hasDescription ? $id.'-description' : null,
        $hasError ? $id.'-error' : null,
    ]));
    // The project's class goes on the root; every other attribute on the textarea, where it wins
    // (a style is added after the grow's).
    $root = array_filter([
        'class' => 'plinth-textarea',
        'data-label' => $hideLabel ? 'hidden' : null,
    ], fn ($value) => $value !== null);
    $input = array_filter([
        'id' => $id,
        'class' => 'plinth-textarea-input',
        'rows' => (string) $rows,
        'data-grow' => $grow ? '' : null,
        'style' => $grow ? '--plinth-textarea-rows: '.$rows.'; --plinth-textarea-max-rows: '.max($maxRows, $rows) : null,
        'disabled' => $disabled ? '' : null,
        'readonly' => $readonly ? '' : null,
        'aria-describedby' => $describedBy !== '' ? $describedBy : null,
        'aria-invalid' => $hasError ? 'true' : null,
    ], fn ($value) => $value !== null);
@endphp
<div {{ $attributes->only('class')->merge($root) }}>
    <label class="plinth-textarea-label" for="{{ $id }}">{{ $label }}</label>
    <textarea {{ $attributes->except('class')->merge($input) }}>{{ $slot }}</textarea>
    @if ($hasDescription)
        <p id="{{ $id }}-description" class="plinth-textarea-description">{{ $description }}</p>
    @endif
    @if ($hasError)
        <p id="{{ $id }}-error" class="plinth-textarea-error">{{ $error }}</p>
    @endif
</div>
