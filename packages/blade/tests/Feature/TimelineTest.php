<?php

use BDynamic\Plinth\Enums\HeadingLevel;
use BDynamic\Plinth\Enums\TimelineKind;
use Illuminate\Support\Facades\Blade;

it('prints a named list with its entries', function () {
    expect(squish(Blade::render('<x-plinth::timeline label="Conversation"><i>entries</i></x-plinth::timeline>')))
        ->toBe('<ol class="plinth-timeline" role="list" aria-label="Conversation"><i>entries</i></ol>');
});

it('leaves out a blank label', function () {
    expect(squish(Blade::render('<x-plinth::timeline label=" ">x</x-plinth::timeline>')))
        ->toBe('<ol class="plinth-timeline" role="list">x</ol>');
});

it('passes extra attributes to the list, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::timeline label="Conversation" class="is-wide" id="thread" aria-label="Thread" wire:key="thread">x</x-plinth::timeline>');

    expect($html)
        ->toContain('class="plinth-timeline is-wide"')
        ->toContain('id="thread"')
        ->toContain('aria-label="Thread"')
        ->not->toContain('aria-label="Conversation"')
        ->toContain('wire:key="thread"');
});

it('prints a post with its avatar, heading, meta line, body and actions', function () {
    $html = Blade::render(<<<'BLADE'
        <x-plinth::timeline-post author="Alex Morgan" kind="customer" detail="alex@example.com" time="09:14" datetime="2026-10-25T09:14" reference="#4821">
            <p>Hello</p>
            <x-slot:actions><button type="button">Reply</button></x-slot:actions>
        </x-plinth::timeline-post>
        BLADE);

    expect(squish($html))->toBe(squish(<<<'HTML'
        <li class="plinth-timeline-post" data-kind="customer"><article class="plinth-timeline-article">
        <span class="plinth-avatar" data-size="md" aria-hidden="true"><span class="plinth-avatar-initials" aria-hidden="true">AM</span></span>
        <header class="plinth-timeline-header"><h3 class="plinth-timeline-heading"><span class="plinth-timeline-author">Alex Morgan</span></h3>
        <p class="plinth-timeline-meta"><span class="plinth-timeline-detail">alex@example.com</span><time datetime="2026-10-25T09:14" class="plinth-timeline-time">09:14</time></p><span class="plinth-timeline-reference">#4821</span></header>
        <div class="plinth-timeline-body"><p>Hello</p></div>
        <div class="plinth-timeline-actions"><button type="button">Reply</button></div>
        </article></li>
        HTML));
});

it('defaults to a team post with no meta line, reference or actions', function () {
    $html = squish(Blade::render('<x-plinth::timeline-post author="Sam Lee">Hi</x-plinth::timeline-post>'));

    expect($html)
        ->toContain('data-kind="team"')
        ->toContain('<h3 class="plinth-timeline-heading">')
        ->not->toContain('plinth-timeline-meta')
        ->not->toContain('plinth-timeline-reference')
        ->not->toContain('plinth-timeline-actions')
        ->not->toContain('plinth-badge');
});

it('leaves out blank parts and an empty actions slot', function () {
    $html = squish(Blade::render('<x-plinth::timeline-post author="Sam Lee" avatar=" " detail=" " time=" " reference=" ">Hi<x-slot:actions> </x-slot:actions></x-plinth::timeline-post>'));

    expect($html)
        ->not->toContain('plinth-avatar-image')
        ->not->toContain('plinth-timeline-meta')
        ->not->toContain('plinth-timeline-reference')
        ->not->toContain('plinth-timeline-actions');
});

it('prints the time without a blank datetime, and the detail or the time alone', function () {
    expect(squish(Blade::render('<x-plinth::timeline-post author="Sam" time="09:14" datetime=" ">x</x-plinth::timeline-post>')))
        ->toContain('<p class="plinth-timeline-meta"><time class="plinth-timeline-time">09:14</time></p>')
        ->and(squish(Blade::render('<x-plinth::timeline-post author="Sam" detail="Support">x</x-plinth::timeline-post>')))
        ->toContain('<p class="plinth-timeline-meta"><span class="plinth-timeline-detail">Support</span></p>');
});

it('shows the picture instead of the initials', function () {
    expect(Blade::render('<x-plinth::timeline-post author="Sam Lee" avatar="/sam.jpg">x</x-plinth::timeline-post>'))
        ->toContain('<img class="plinth-avatar-image" src="/sam.jpg" alt="">');
});

it('marks a note with its badge', function () {
    expect(squish(Blade::render('<x-plinth::timeline-post author="Sam" :kind="$kind">x</x-plinth::timeline-post>', ['kind' => TimelineKind::Note])))
        ->toContain('data-kind="note"')
        ->toContain('<span class="plinth-timeline-author">Sam</span><span class="plinth-badge" data-tone="warning"><span class="plinth-badge-label">Internal note</span></span>')
        ->and(Blade::render('<x-plinth::timeline-post author="Sam" kind="note" note-label="Nota interna">x</x-plinth::timeline-post>'))
        ->toContain('Nota interna');
});

it('falls back to a team post for an unknown kind', function () {
    expect(Blade::render('<x-plinth::timeline-post author="Sam" kind="admin">x</x-plinth::timeline-post>'))
        ->toContain('data-kind="team"');
});

it('takes a heading level as a string or the enum, and falls back to h3', function () {
    expect(Blade::render('<x-plinth::timeline-post author="Sam" heading-level="h4">x</x-plinth::timeline-post>'))
        ->toContain('<h4 class="plinth-timeline-heading">')
        ->and(Blade::render('<x-plinth::timeline-post author="Sam" :heading-level="$level">x</x-plinth::timeline-post>', ['level' => HeadingLevel::Two]))
        ->toContain('<h2 class="plinth-timeline-heading">')
        ->and(Blade::render('<x-plinth::timeline-post author="Sam" heading-level="h1">x</x-plinth::timeline-post>'))
        ->toContain('<h3 class="plinth-timeline-heading">');
});

it('escapes the post\'s text', function () {
    $html = Blade::render(
        '<x-plinth::timeline-post :author="$text" :detail="$text" :time="$text" :datetime="$text" :reference="$text" kind="note" :note-label="$text">{{ $text }}</x-plinth::timeline-post>',
        ['text' => '"><b>x</b>'],
    );

    expect($html)->not->toContain('<b>')->toContain('&quot;&gt;&lt;b&gt;x&lt;/b&gt;');
});

it('passes extra attributes to the post, and the project wins a clash', function () {
    $html = Blade::render('<x-plinth::timeline-post author="Sam" class="is-new" id="post-1" data-kind="customer" wire:key="post-1" x-on:click="open">x</x-plinth::timeline-post>');

    expect($html)
        ->toContain('class="plinth-timeline-post is-new"')
        ->toContain('id="post-1"')
        ->toContain('data-kind="customer"')
        ->not->toContain('data-kind="team"')
        ->toContain('wire:key="post-1"')
        ->toContain('x-on:click="open"');
});

it('prints an event with its dot, sentence and time', function () {
    expect(squish(Blade::render('<x-plinth::timeline-event time="09:14" datetime="2026-10-25T09:14">Alex Morgan <b>assigned</b> it</x-plinth::timeline-event>')))
        ->toBe('<li class="plinth-timeline-event"><span class="plinth-timeline-dot" aria-hidden="true"></span><p class="plinth-timeline-text">Alex Morgan <b>assigned</b> it<time datetime="2026-10-25T09:14" class="plinth-timeline-time">09:14</time></p></li>');
});

it('prints an event without a blank time or datetime', function () {
    expect(squish(Blade::render('<x-plinth::timeline-event time=" ">Closed</x-plinth::timeline-event>')))
        ->toBe('<li class="plinth-timeline-event"><span class="plinth-timeline-dot" aria-hidden="true"></span><p class="plinth-timeline-text">Closed</p></li>')
        ->and(squish(Blade::render('<x-plinth::timeline-event time="09:14" datetime=" ">Closed</x-plinth::timeline-event>')))
        ->toContain('<time class="plinth-timeline-time">09:14</time>');
});

it('escapes the event\'s text', function () {
    expect(Blade::render('<x-plinth::timeline-event :time="$text">{{ $text }}</x-plinth::timeline-event>', ['text' => '<b>x</b>']))
        ->not->toContain('<b>');
});

it('passes extra attributes to the event', function () {
    $html = Blade::render('<x-plinth::timeline-event class="is-new" id="event-1" data-testid="event" wire:key="event-1">x</x-plinth::timeline-event>');

    expect($html)
        ->toContain('class="plinth-timeline-event is-new"')
        ->toContain('id="event-1"')
        ->toContain('data-testid="event"')
        ->toContain('wire:key="event-1"');
});
