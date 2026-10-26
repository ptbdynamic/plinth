{{-- Markup contract: packages/css/src/components/field.css --}}
@props([
    'label' => null,
    'hideLabel' => false,
    'id' => null,
    'group' => false,
    'required' => false,
    'description' => null,
    'error' => null,
])
@php
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::field> needs a label: it is the control\'s accessible name.');
    }
    $id = filled($id) ? trim($id) : 'plinth-field-'.\Illuminate\Support\Str::lower(\Illuminate\Support\Str::random(8));
    $tag = $group ? 'fieldset' : 'div';
    $labelTag = $group ? 'legend' : 'label';
    // A group's fieldset is described by the parts; one control is described itself.
    $root = array_filter([
        'class' => 'plinth-field',
        'data-label' => $hideLabel ? 'hidden' : null,
        'id' => $group ? $id : null,
        'aria-describedby' => $group ? \BDynamic\Plinth\Support\Field::describedBy($id, $description, $error) : null,
    ], fn ($value) => $value !== null);
@endphp
<{{ $tag }} {{ $attributes->merge($root) }}>
    <{{ $labelTag }} class="plinth-field-label" id="{{ \BDynamic\Plinth\Support\Field::labelId($id) }}"@unless ($group) for="{{ $id }}"@endunless>{{ $label }}@if ($required)<span class="plinth-field-required" aria-hidden="true">*</span>@endif</{{ $labelTag }}>
    {{ $slot }}
    @if (filled($description))
        <p class="plinth-field-description" id="{{ $id }}-description">{{ $description }}</p>
    @endif
    @if (filled($error))
        <p class="plinth-field-error" id="{{ $id }}-error">{{ $error }}</p>
    @endif
</{{ $tag }}>
