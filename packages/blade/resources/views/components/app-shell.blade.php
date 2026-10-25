{{-- Markup contract: packages/css/src/components/app-shell.css --}}
<div {{ $attributes->merge(['class' => 'plinth-app-shell']) }}>
    @if (isset($nav) && $nav->hasActualContent())
        <div class="plinth-app-shell-nav">{{ $nav }}</div>
    @endif
    @if (isset($bar) && $bar->hasActualContent())
        <div class="plinth-app-shell-bar">{{ $bar }}</div>
    @endif
    <main class="plinth-app-shell-main">{{ $slot }}</main>
</div>
