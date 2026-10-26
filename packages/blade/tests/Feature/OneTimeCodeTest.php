<?php

use Illuminate\Support\Facades\Blade;

it('prints the one time code markup contract', function () {
    expect(squish(Blade::render('<x-plinth::one-time-code>Content</x-plinth::one-time-code>')))
        ->toBe('<div class="plinth-one-time-code">Content</div>');
});

it('escapes the content', function () {
    expect(Blade::render('<x-plinth::one-time-code>{{ $label }}</x-plinth::one-time-code>', ['label' => '<b>x</b>']))
        ->toContain('&lt;b&gt;x&lt;/b&gt;');
});

it('keeps extra classes and attributes', function () {
    $html = Blade::render('<x-plinth::one-time-code class="ms-2" id="extra">Content</x-plinth::one-time-code>');

    expect($html)
        ->toContain('class="plinth-one-time-code ms-2"')
        ->toContain('id="extra"');
});
