{{-- Markup contract: packages/css/src/components/meter.css --}}
@props([
    'label' => null,
    'value' => null,
    'min' => 0,
    'max' => 100,
    'low' => null,
    'high' => null,
    'optimum' => null,
    'valueText' => null,
    'description' => null,
    'tone' => null,
    'id' => null,
])
@php
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::meter> needs a label: it is the meter\'s accessible name.');
    }
    $id = filled($id) ? trim($id) : 'plinth-meter-'.\Illuminate\Support\Str::lower(\Illuminate\Support\Str::random(8));
    $range = \BDynamic\Plinth\Support\Meter::range($value, $min, $max, $low, $high, $optimum);
    $tone = \BDynamic\Plinth\Support\Meter::tone($range, $tone);
    $valueText = filled($valueText) ? $valueText : null;
    $description = filled($description) ? $description : null;
    // Written out with e(), as an attribute bag escapes only the quotes.
    $bar = collect([
        'class' => 'plinth-meter-bar',
        'id' => $id,
        'min' => $range['min'],
        'max' => $range['max'],
        'low' => $range['low'],
        'high' => $range['high'],
        'optimum' => $range['optimum'],
        'value' => $range['value'],
        'aria-describedby' => $description === null ? null : $id.'-description',
        'aria-valuetext' => $valueText,
    ])->reject(fn ($attribute) => $attribute === null)
        ->map(fn ($attribute, $name) => ' '.$name.'="'.e((string) $attribute).'"')
        ->implode('');
@endphp
<div {{ $attributes->merge(['class' => 'plinth-meter', 'data-tone' => $tone->value]) }}>
    <label class="plinth-meter-label" for="{{ $id }}">{{ $label }}</label>
    @if ($valueText !== null)
        <span class="plinth-meter-value" aria-hidden="true">{{ $valueText }}</span>
    @endif
    <meter{!! $bar !!}>{{ $valueText ?? $range['value'] }}</meter>
    @if ($description !== null)
        <span class="plinth-meter-description" id="{{ $id }}-description">@if ($tone !== \BDynamic\Plinth\Enums\Tone::Neutral)<span class="plinth-icon plinth-meter-tone" data-size="sm" aria-hidden="true">{!! \BDynamic\Plinth\Enums\CalloutTone::from($tone->value)->icon() !!}</span>@endif{{ $description }}</span>
    @endif
</div>
