<?php

use BDynamic\Plinth\Support\ToolbarKeys;

it('is the Vue and React layers\' toolbarKeys, as an Alpine x-init', function () {
    $vue = (string) file_get_contents(dirname(__DIR__, 3).'/vue/src/toolbar.ts');
    $react = (string) file_get_contents(dirname(__DIR__, 3).'/react/src/toolbar.ts');

    // The same steps as the Vue and React layers: the controls, the tab stop and the keys.
    foreach ([
        "querySelectorAll<HTMLElement>('button, a[href]')" => "querySelectorAll('button, a[href]')",
        "control.closest('[popover]')" => null,
        '(!popover || popover.contains(toolbar))' => null,
        "!control.matches(':disabled')" => null,
        '(control.checkVisibility?.() ?? true)' => null,
        'if (!current || !list.includes(current)) current = list[0];' => null,
        'control.tabIndex = control === current ? 0 : -1;' => null,
        'if (index < 0 || event.altKey || event.ctrlKey || event.metaKey) return;' => null,
        "toolbar.closest('[dir]')?.getAttribute('dir') === 'rtl' ? -1 : 1" => null,
        'ArrowRight: forward, ArrowLeft: -forward' => null,
        "event.key === 'Home'" => null,
        'list[list.length - 1]' => null,
        '% list.length]' => null,
        'event.preventDefault();' => null,
        'next.focus();' => null,
        "attributeFilter: ['disabled', 'hidden']" => null,
        "addEventListener('resize', update)" => null,
    ] as $step => $alpine) {
        expect($vue)->toContain($step)
            ->and($react)->toContain($step)
            ->and(ToolbarKeys::ALPINE)->toContain($alpine ?? $step);
    }

    expect(ToolbarKeys::ALPINE)->toStartWith('((toolbar) => {')->toEndWith('})($el)');
});
