{{-- Markup contract: packages/css/src/components/split-view.css --}}
@props([
    'pane' => 'list',
    'secondaryClosed' => false,
])
<div {{ $attributes->merge(array_filter([
    'class' => 'plinth-split-view',
    'data-pane' => \BDynamic\Plinth\Enums\SplitViewPane::resolve($pane)->value,
    'data-secondary' => $secondaryClosed ? 'closed' : null,
], fn ($value) => $value !== null)) }}>
    @if (isset($secondary) && $secondary->hasActualContent())
        <div class="plinth-split-view-secondary">{{ $secondary }}</div>
    @endif
    <div class="plinth-split-view-list">{{ $list ?? '' }}</div>
    <div class="plinth-split-view-detail">
        {{ $slot }}
        @if (isset($footer) && $footer->hasActualContent())
            <div class="plinth-split-view-footer">{{ $footer }}</div>
        @endif
    </div>
</div>
