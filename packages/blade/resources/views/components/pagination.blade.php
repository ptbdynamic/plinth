{{-- Markup contract: packages/css/src/components/pagination.css --}}
@props([
    'page' => 1,
    'pages' => 1,
    'href' => null,
    'label' => 'Pagination',
    'previousLabel' => 'Previous page',
    'nextLabel' => 'Next page',
])
@php
    // A whole number from a prop, or null for anything else (a blank string included).
    $whole = fn ($value) => match (true) {
        is_int($value) => $value,
        is_float($value) && is_finite($value) => (int) floor($value),
        is_string($value) && preg_match('/^\s*\d+\s*$/', $value) === 1 => (int) $value,
        default => null,
    };
    $last = max($whole($pages) ?? 1, 1);
    $current = min(max($whole($page) ?? 1, 1), $last);
    $isLink = filled($href);
    $target = fn (int $to) => $isLink ? str_replace('{page}', (string) $to, $href) : null;
    // The first and last pages, the current one and its neighbours; a gap of one page shows that
    // page, a longer one is a gap.
    $shown = array_values(array_unique(array_filter([1, $current - 1, $current, $current + 1, $last], fn ($n) => $n >= 1 && $n <= $last)));
    sort($shown);
    $items = [];
    $previous = 0;
    foreach ($shown as $number) {
        if ($number - $previous === 2) {
            $items[] = $previous + 1;
        } elseif ($number - $previous > 2) {
            $items[] = 'gap';
        }
        $items[] = $number;
        $previous = $number;
    }
    // Previous's or next's own attributes: rel on a link, data-page on a button. A button at the
    // end keeps focus, so it is aria-disabled rather than disabled.
    $step = fn (int $to, bool $enabled, string $rel) => new \Illuminate\View\ComponentAttributeBag(match (true) {
        $enabled && $isLink => ['rel' => $rel],
        $enabled => ['data-page' => $to],
        $isLink => [],
        default => ['aria-disabled' => 'true'],
    });
    $hasPrevious = $current > 1;
    $hasNext = $current < $last;
@endphp
<nav {{ $attributes->merge(['class' => 'plinth-pagination', 'aria-label' => $label]) }}>
    @if (isset($slot) && $slot->hasActualContent())
        <p class="plinth-pagination-summary" role="status">{{ $slot }}</p>
    @endif
    @if (isset($size) && $size->hasActualContent())
        <div class="plinth-pagination-size">{{ $size }}</div>
    @endif
    <div class="plinth-pagination-pages">
        <x-plinth::icon-button :label="$previousLabel" icon="chevron-left" variant="secondary" size="md" :href="$target($current - 1)" :disabled="$isLink && ! $hasPrevious" :attributes="$step($current - 1, $hasPrevious, 'prev')" />
        <ol class="plinth-pagination-list">
            @foreach ($items as $item)
                <li>
                    @if ($item === 'gap')
                        <span class="plinth-pagination-gap">…</span>
                    @elseif ($isLink)
                        <a class="plinth-pagination-page" href="{{ $target($item) }}"@if ($item === $current) aria-current="page"@endif>{{ $item }}</a>
                    @else
                        <button type="button" class="plinth-pagination-page" data-page="{{ $item }}"@if ($item === $current) aria-current="page"@endif>{{ $item }}</button>
                    @endif
                </li>
            @endforeach
        </ol>
        <x-plinth::icon-button :label="$nextLabel" icon="chevron-right" variant="secondary" size="md" :href="$target($current + 1)" :disabled="$isLink && ! $hasNext" :attributes="$step($current + 1, $hasNext, 'next')" />
    </div>
</nav>
