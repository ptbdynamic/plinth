{{-- Markup contract: packages/css/src/components/toolbar.css --}}
@props([
    'label' => 'Actions',
    'target' => null,
    'search' => null,
])
@php
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::toolbar> needs a label: it names the toolbar.');
    }
    $hasSearch = $search instanceof \Illuminate\View\ComponentSlot && $search->hasActualContent();
@endphp
<div {{ $attributes->merge(['class' => 'plinth-toolbar']) }}>
    @if ($hasSearch)
        {{ $search }}
    @endif
    @if (filled($target))
        <p class="plinth-toolbar-target">{{ $target }}</p>
    @endif
    {{-- What Vue and React do in the Blade layer, with Alpine: one tab stop, and the arrow keys
         between the actions (BDynamic\Plinth\Support\ToolbarKeys). --}}
    <div class="plinth-toolbar-actions" role="toolbar" aria-label="{{ $label }}" x-data="{{ \BDynamic\Plinth\Support\ToolbarKeys::X_DATA }}">{{ $slot }}</div>
</div>
