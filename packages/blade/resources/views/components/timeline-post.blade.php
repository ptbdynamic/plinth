{{-- Markup contract: packages/css/src/components/timeline.css --}}
@props([
    'author' => '',
    'avatar' => null,
    'kind' => 'team',
    'detail' => null,
    'time' => null,
    'datetime' => null,
    'reference' => null,
    'noteLabel' => 'Internal note',
    'headingLevel' => 'h3',
])
@php
    $kind = \BDynamic\Plinth\Enums\TimelineKind::resolve($kind);
    // h3 unless the app picks another level: a post sits under the page's and the thread's headings.
    $level = $headingLevel instanceof \BDynamic\Plinth\Enums\HeadingLevel
        ? $headingLevel->value
        : (\BDynamic\Plinth\Enums\HeadingLevel::tryFrom((string) $headingLevel) ?? \BDynamic\Plinth\Enums\HeadingLevel::Three)->value;
@endphp
<li {{ $attributes->merge(['class' => 'plinth-timeline-post', 'data-kind' => $kind->value]) }}>
    <article class="plinth-timeline-article">
        <x-plinth::avatar :name="$author" :src="filled($avatar) ? $avatar : null" size="md" decorative />
        <header class="plinth-timeline-header">
            <{{ $level }} class="plinth-timeline-heading">
                <span class="plinth-timeline-author">{{ $author }}</span>
                @if ($kind === \BDynamic\Plinth\Enums\TimelineKind::Note)
                    <x-plinth::badge tone="warning">{{ $noteLabel }}</x-plinth::badge>
                @endif
            </{{ $level }}>
            @if (filled($detail) || filled($time))
                <p class="plinth-timeline-meta">
                    @if (filled($detail))
                        <span class="plinth-timeline-detail">{{ $detail }}</span>
                    @endif
                    @if (filled($time))
                        <time @if (filled($datetime)) datetime="{{ $datetime }}" @endif class="plinth-timeline-time">{{ $time }}</time>
                    @endif
                </p>
            @endif
            @if (filled($reference))
                <span class="plinth-timeline-reference">{{ $reference }}</span>
            @endif
        </header>
        <div class="plinth-timeline-body">{{ $slot }}</div>
        @if (isset($actions) && $actions->hasActualContent())
            <div class="plinth-timeline-actions">{{ $actions }}</div>
        @endif
    </article>
</li>
