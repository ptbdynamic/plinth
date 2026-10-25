<?php

use Illuminate\Support\Facades\Blade;

it('prints the label, the textarea, the description and the error', function () {
    $html = Blade::render('<x-plinth::textarea id="reply" label="Reply" description="The customer sees it." error="Write a reply." />');

    expect(squish($html))->toBe(
        '<div class="plinth-textarea">'
        .'<label class="plinth-textarea-label" for="reply">Reply</label>'
        .'<textarea id="reply" class="plinth-textarea-input" rows="3" aria-describedby="reply-description reply-error" aria-invalid="true"></textarea>'
        .'<p id="reply-description" class="plinth-textarea-description">The customer sees it.</p>'
        .'<p id="reply-error" class="plinth-textarea-error">Write a reply.</p>'
        .'</div>'
    );
});

it('has three rows, no grow and nothing to describe it by default', function () {
    $html = Blade::render('<x-plinth::textarea id="reply" label="Reply" />');

    expect($html)
        ->toContain('rows="3"')
        ->not->toContain('data-grow')
        ->not->toContain('style')
        ->not->toContain('aria-describedby')
        ->not->toContain('data-label');
});

it('grows from its rows to its maximum, never below its rows', function () {
    expect(Blade::render('<x-plinth::textarea id="a" label="A" grow />'))
        ->toContain('data-grow="" style="--plinth-textarea-rows: 3; --plinth-textarea-max-rows: 8"')
        ->and(Blade::render('<x-plinth::textarea id="a" label="A" grow :rows="5" :max-rows="2" />'))
        ->toContain('rows="5" data-grow="" style="--plinth-textarea-rows: 5; --plinth-textarea-max-rows: 5"');
});

it('adds a project style after the grow', function () {
    expect(Blade::render('<x-plinth::textarea id="a" label="A" grow style="color: red" />'))
        ->toContain('style="--plinth-textarea-rows: 3; --plinth-textarea-max-rows: 8; color: red;"');
});

it('hides the label visually, and is disabled or read-only', function () {
    expect(Blade::render('<x-plinth::textarea id="a" label="A" hide-label />'))->toContain('data-label="hidden"')
        ->and(Blade::render('<x-plinth::textarea id="a" label="A" disabled />'))->toContain(' disabled')
        ->and(Blade::render('<x-plinth::textarea id="a" label="A" readonly />'))->toContain(' readonly');
});

it('takes its value from the slot', function () {
    expect(Blade::render('<x-plinth::textarea id="a" label="A">{{ $value }}</x-plinth::textarea>', ['value' => 'A & <B>']))
        ->toContain('>A &amp; &lt;B&gt;</textarea>');
});

it('generates an id when it has none, and points the label at it', function () {
    $html = Blade::render('<x-plinth::textarea label="Reply" error="Wrong" />');

    preg_match('/<textarea id="(plinth-textarea-[a-z0-9]{8})"/', $html, $match);
    expect($match)->toHaveCount(2)
        ->and($html)->toContain('for="'.$match[1].'"')
        ->toContain('aria-describedby="'.$match[1].'-error"');
});

it('needs a label', function () {
    Blade::render('<x-plinth::textarea id="a" />');
})->throws(Exception::class, 'needs a label');

it('escapes the text', function () {
    $html = Blade::render('<x-plinth::textarea id="a" :label="$text" :description="$text" :error="$text" />', ['text' => '<b>x</b>']);

    expect($html)->not->toContain('<b>')->toContain('&lt;b&gt;x&lt;/b&gt;');
});

it('puts the class on the root and every other attribute on the textarea, where it wins', function () {
    $html = Blade::render('<x-plinth::textarea id="reply" label="Reply" error="Wrong" class="mb-4" name="reply" wire:model="reply" x-model="reply" aria-invalid="false" />');

    expect(squish($html))
        ->toContain('<div class="plinth-textarea mb-4">')
        ->toContain('<textarea id="reply" class="plinth-textarea-input" rows="3" aria-describedby="reply-error" aria-invalid="false" name="reply" wire:model="reply" x-model="reply">');
});
