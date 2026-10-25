<?php

namespace BDynamic\Plinth\Support;

final class ToolbarKeys
{
    /**
     * What a toolbar needs beyond the platform (toolbar.css, docs/adr/0002), as the x-init the
     * toolbar puts on its actions. It is the Vue and React layers' toolbarKeys(): the buttons and
     * links are one tab stop, and the arrow keys move between them (Left and Right, the other way
     * round in right-to-left text, Home and End), wrapping at the ends. It keeps the last control
     * focused at tabindex 0 and the rest at -1, and skips disabled controls, controls the CSS
     * hides at this width and the items of a menu inside the toolbar.
     */
    public const ALPINE = '((toolbar) => {'
        .' let current;'
        .' const controls = () => [...toolbar.querySelectorAll(\'button, a[href]\')].filter((control) => {'
        .' const popover = control.closest(\'[popover]\');'
        .' return (!popover || popover.contains(toolbar)) && !control.matches(\':disabled\')'
        .' && (control.checkVisibility?.() ?? true); });'
        .' const update = () => { const list = controls();'
        .' if (!current || !list.includes(current)) current = list[0];'
        .' for (const control of list) control.tabIndex = control === current ? 0 : -1; };'
        .' toolbar.addEventListener(\'focusin\', (event) => {'
        .' if (controls().includes(event.target)) current = event.target; update(); });'
        .' toolbar.addEventListener(\'keydown\', (event) => {'
        .' const list = controls(); const index = list.indexOf(event.target);'
        .' if (index < 0 || event.altKey || event.ctrlKey || event.metaKey) return;'
        .' const forward = toolbar.closest(\'[dir]\')?.getAttribute(\'dir\') === \'rtl\' ? -1 : 1;'
        .' const step = { ArrowRight: forward, ArrowLeft: -forward };'
        .' const next = event.key === \'Home\' ? list[0] : event.key === \'End\' ? list[list.length - 1]'
        .' : event.key in step ? list[(index + step[event.key] + list.length) % list.length] : undefined;'
        .' if (!next) return; event.preventDefault(); next.focus(); });'
        .' new MutationObserver(update).observe(toolbar, { subtree: true, childList: true,'
        .' attributes: true, attributeFilter: [\'disabled\', \'hidden\'] });'
        .' window.addEventListener(\'resize\', update);'
        .' update();'
        .' })($el)';
}
