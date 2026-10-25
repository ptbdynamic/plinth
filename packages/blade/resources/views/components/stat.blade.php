{{-- Markup contract: packages/css/src/components/stat.css --}}
@props([
    'label' => '',
    'value' => null,
    'description' => null,
    'tone' => 'neutral',
    'href' => null,
    'emptyLabel' => 'Not available',
])
@php
    $tag = filled($href) ? 'a' : 'div';
    $tone = \BDynamic\Plinth\Enums\Tone::resolve($tone);
    $root = array_filter([
        'class' => 'plinth-stat',
        'href' => $tag === 'a' ? $href : null,
        'data-tone' => $tone->value,
    ], fn ($value) => $value !== null);
@endphp
<{{ $tag }} {{ $attributes->merge($root) }}>
    <span class="plinth-stat-label">{{ $label }}</span>
    @if (filled($value))
        <span class="plinth-stat-value">{{ $value }}</span>
    @else
        <span class="plinth-stat-value is-empty"><span aria-hidden="true">—</span><span class="plinth-stat-empty">{{ $emptyLabel }}</span></span>
    @endif
    @if (filled($description))
        <span class="plinth-stat-description">@if ($tone !== \BDynamic\Plinth\Enums\Tone::Neutral)<span class="plinth-icon plinth-stat-tone" data-size="sm" aria-hidden="true">{!! \BDynamic\Plinth\Enums\CalloutTone::from($tone->value)->icon() !!}</span>@endif{{ $description }}</span>
    @endif
    @if ($tag === 'a')
        <span class="plinth-icon plinth-stat-chevron" data-size="sm" data-mirror aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg></span>
    @endif
</{{ $tag }}>
