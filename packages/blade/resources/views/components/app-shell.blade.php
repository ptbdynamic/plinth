{{-- Markup contract: packages/css/src/components/app-shell.css --}}
@props([
    'sectionTitle' => null,
    'sectionId' => null,
    'sectionClosed' => false,
])
<div {{ $attributes->merge(array_filter([
    'class' => 'plinth-app-shell',
    'data-section' => $sectionClosed ? 'closed' : null,
], fn ($value) => $value !== null)) }}>
    @if (isset($nav) && $nav->hasActualContent())
        <div class="plinth-app-shell-nav">{{ $nav }}</div>
    @endif
    @if (isset($section) && $section->hasActualContent())
        <div class="plinth-app-shell-section"@if (filled($sectionId)) id="{{ $sectionId }}"@endif>
            @if (filled($sectionTitle))
                <div class="plinth-app-shell-section-header">
                    <p class="plinth-app-shell-section-title"@if (filled($sectionId)) id="{{ $sectionId }}-title"@endif>{{ $sectionTitle }}</p>
                </div>
            @endif
            <div class="plinth-app-shell-section-body">{{ $section }}</div>
        </div>
    @endif
    @if (isset($bar) && $bar->hasActualContent())
        <div class="plinth-app-shell-bar">{{ $bar }}</div>
    @endif
    <main class="plinth-app-shell-main">{{ $slot }}</main>
</div>
