<?php

use Illuminate\Support\Facades\Blade;

/** The page numbers a pagination prints, in order, with … for a gap. */
function pageNumbers(string $html): array
{
    preg_match_all('/<li>\s*<(?:a|button|span)[^>]*>([^<]*)</', $html, $matches);

    return $matches[1];
}

it('prints the pagination markup contract', function () {
    $html = squish(Blade::render('<x-plinth::pagination :page="2" :pages="3" href="?page={page}">Showing <b>26</b> to <b>50</b></x-plinth::pagination>'));

    expect($html)->toStartWith('<nav class="plinth-pagination" aria-label="Pagination"><p class="plinth-pagination-summary" role="status">Showing <b>26</b> to <b>50</b></p><div class="plinth-pagination-pages"><a class="plinth-button plinth-icon-button" href="?page=1" data-variant="secondary" data-size="md" aria-label="Previous page" rel="prev"><span class="plinth-icon" data-size="md" data-icon="chevron-left" data-mirror aria-hidden="true">')
        ->toContain('<ol class="plinth-pagination-list"><li><a class="plinth-pagination-page" href="?page=1">1</a></li><li><a class="plinth-pagination-page" href="?page=2" aria-current="page">2</a></li><li><a class="plinth-pagination-page" href="?page=3">3</a></li></ol><a class="plinth-button plinth-icon-button" href="?page=3" data-variant="secondary" data-size="md" aria-label="Next page" rel="next">')
        ->toEndWith('</a></div></nav>');
});

it('prints the page-size form, and leaves out a blank summary and size', function () {
    $html = squish(Blade::render(<<<'BLADE'
        <x-plinth::pagination>
            <x-slot:size><form method="get">Per page</form></x-slot:size>
        </x-plinth::pagination>
        BLADE));

    expect($html)
        ->toContain('<div class="plinth-pagination-size"><form method="get">Per page</form></div>')
        ->not->toContain('plinth-pagination-summary');
    expect(Blade::render('<x-plinth::pagination><x-slot:size> </x-slot:size> </x-plinth::pagination>'))
        ->not->toContain('plinth-pagination-size')
        ->not->toContain('plinth-pagination-summary');
});

it('disables previous on the first page and next on the last', function () {
    $first = Blade::render('<x-plinth::pagination :page="1" :pages="3" href="?page={page}" />');
    $last = Blade::render('<x-plinth::pagination :page="3" :pages="3" href="?page={page}" />');

    expect($first)
        ->toContain('aria-label="Previous page" role="link" aria-disabled="true"')
        ->not->toContain('rel="prev"')
        ->toContain('rel="next"');
    expect($last)
        ->toContain('aria-label="Next page" role="link" aria-disabled="true"')
        ->not->toContain('rel="next"')
        ->toContain('rel="prev"');
});

it('prints buttons with data-page without an href', function () {
    $html = squish(Blade::render('<x-plinth::pagination :page="1" :pages="2" />'));

    expect($html)
        ->toContain('<button class="plinth-button plinth-icon-button" type="button" data-variant="secondary" data-size="md" aria-label="Previous page" aria-disabled="true">')
        ->toContain('<li><button type="button" class="plinth-pagination-page" data-page="1" aria-current="page">1</button></li>')
        ->toContain('<li><button type="button" class="plinth-pagination-page" data-page="2">2</button></li>')
        ->toContain('aria-label="Next page" data-page="2"')
        ->not->toContain('rel=')
        ->not->toContain('disabled=""');
});

it('reads a blank href as none', function () {
    expect(Blade::render('<x-plinth::pagination :pages="2" href=" " />'))
        ->toContain('data-page="2"')
        ->not->toContain('href=');
});

it('shows the first, last, current and neighbouring pages, with gaps', function (int $page, int $pages, array $numbers) {
    expect(pageNumbers(Blade::render('<x-plinth::pagination :page="$page" :pages="$pages" />', compact('page', 'pages'))))
        ->toBe($numbers);
})->with([
    'one page' => [1, 1, ['1']],
    'the start' => [1, 20, ['1', '2', '…', '20']],
    'a gap of one page shows it' => [4, 20, ['1', '2', '3', '4', '5', '…', '20']],
    'the middle' => [7, 20, ['1', '…', '6', '7', '8', '…', '20']],
    'the end' => [20, 20, ['1', '…', '19', '20']],
]);

it('keeps the numbers in range and reads them from text', function () {
    expect(pageNumbers(Blade::render('<x-plinth::pagination :page="12" :pages="0" />')))->toBe(['1']);
    expect(pageNumbers(Blade::render('<x-plinth::pagination page=" 3 " pages="6" />')))->toBe(['1', '2', '3', '4', '5', '6']);
    expect(pageNumbers(Blade::render('<x-plinth::pagination page="two" :pages="4.7" />')))->toBe(['1', '2', '3', '4']);
    expect(pageNumbers(Blade::render('<x-plinth::pagination :page="null" :pages="[]" />')))->toBe(['1']);
});

it('puts the page in every {page} of the href', function () {
    expect(Blade::render('<x-plinth::pagination :page="1" :pages="2" href="/orders/{page}?from={page}" />'))
        ->toContain('href="/orders/2?from=2"');
});

it('takes its own labels', function () {
    $html = Blade::render('<x-plinth::pagination label="Páginas" previous-label="Anterior" next-label="Seguinte" />');

    expect($html)
        ->toContain('aria-label="Páginas"')
        ->toContain('aria-label="Anterior"')
        ->toContain('aria-label="Seguinte"');
});

it('escapes the text', function () {
    $html = Blade::render(
        '<x-plinth::pagination :pages="2" :href="$href" :label="$text" :previous-label="$text" :next-label="$text">{{ $text }}</x-plinth::pagination>',
        ['text' => '<b>x</b>', 'href' => '?q="a"&page={page}'],
    );

    expect($html)
        ->toContain('&lt;b&gt;x&lt;/b&gt;')
        ->not->toContain('<b>x</b>')
        ->toContain('href="?q=&quot;a&quot;&amp;page=2"');
});

it('keeps extra attributes, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::pagination class="mt-4" id="pages" wire:key="pages" aria-label="Orders pages" />');

    expect($html)
        ->toContain('class="plinth-pagination mt-4"')
        ->toContain('id="pages"')
        ->toContain('wire:key="pages"')
        ->toContain('aria-label="Orders pages"')
        ->not->toContain('aria-label="Pagination"');
});
