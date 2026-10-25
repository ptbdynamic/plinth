{{-- Markup contract: packages/css/src/components/timeline.css --}}
@props([
    'time' => null,
    'datetime' => null,
])
<li {{ $attributes->merge(['class' => 'plinth-timeline-event']) }}>
    <span class="plinth-timeline-dot" aria-hidden="true"></span>
    <p class="plinth-timeline-text">{{ $slot }}@if (filled($time))<time @if (filled($datetime)) datetime="{{ $datetime }}" @endif class="plinth-timeline-time">{{ $time }}</time>@endif</p>
</li>
