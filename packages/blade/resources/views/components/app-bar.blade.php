{{-- Markup contract: packages/css/src/components/app-bar.css --}}
<header {{ $attributes->merge(['class' => 'plinth-app-bar']) }}>
    @if ($slot->hasActualContent())
        <div class="plinth-app-bar-start">{{ $slot }}</div>
    @endif
    @if (isset($actions) && $actions->hasActualContent())
        <div class="plinth-app-bar-actions">{{ $actions }}</div>
    @endif
    @if (isset($account) && $account->hasActualContent())
        <div class="plinth-app-bar-account">{{ $account }}</div>
    @endif
</header>
