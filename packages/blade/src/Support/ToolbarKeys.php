<?php

namespace BDynamic\Plinth\Support;

final class ToolbarKeys
{
    /**
     * What a toolbar needs beyond the platform (toolbar.css, docs/adr/0002), as a function of the
     * toolbar's actions that returns what removes its listeners (X_DATA runs it). It is the Vue
     * and React layers' toolbarKeys(): the buttons and links are one tab stop, and the arrow keys move between them (Left and Right, the other way
     * round in right-to-left text, Home and End), wrapping at the ends. It keeps the last control
     * focused at tabindex 0 and the rest at -1, and skips disabled controls, controls the CSS
     * hides at this width and the items of a menu inside the toolbar.
     */
    public const ALPINE = '(toolbar) => {'
        .' let current;'
        .' const controls = () => [...toolbar.querySelectorAll(\'button, a[href]\')].filter((control) => {'
        .' const popover = control.closest(\'[popover]\');'
        .' return (!popover || popover.contains(toolbar)) && !control.matches(\':disabled\')'
        .' && (control.checkVisibility?.() ?? true); });'
        .' const update = () => { const list = controls();'
        .' if (!current || !list.includes(current)) current = list[0];'
        .' for (const control of list) control.tabIndex = control === current ? 0 : -1; };'
        .' const focus = (event) => {'
        .' if (controls().includes(event.target)) current = event.target; update(); };'
        .' const keydown = (event) => {'
        .' const list = controls(); const index = list.indexOf(event.target);'
        .' if (index < 0 || event.altKey || event.ctrlKey || event.metaKey) return;'
        .' const forward = getComputedStyle(toolbar).direction === \'rtl\' ? -1 : 1;'
        .' const step = { ArrowRight: forward, ArrowLeft: -forward };'
        .' const next = event.key === \'Home\' ? list[0] : event.key === \'End\' ? list[list.length - 1]'
        .' : event.key in step ? list[(index + step[event.key] + list.length) % list.length] : undefined;'
        .' if (!next) return; event.preventDefault(); next.focus(); };'
        .' const observer = new MutationObserver(update);'
        .' observer.observe(toolbar, { subtree: true, childList: true,'
        .' attributes: true, attributeFilter: [\'disabled\', \'hidden\', \'data-overflow\', \'class\', \'style\'] });'
        .' window.addEventListener(\'resize\', update);'
        .' toolbar.addEventListener(\'focusin\', focus);'
        .' toolbar.addEventListener(\'keydown\', keydown);'
        .' update();'
        .' return () => { observer.disconnect(); window.removeEventListener(\'resize\', update);'
        .' toolbar.removeEventListener(\'focusin\', focus); toolbar.removeEventListener(\'keydown\', keydown); };'
        .' }';

    /**
     * The x-data the toolbar puts on its actions: it runs ALPINE when Alpine starts the element,
     * and removes what it added when Alpine tears the element down (a Livewire morph,
     * wire:navigate), as Vue and React do on unmounting.
     */
    public const X_DATA = '{ stop: () => {}, init() { this.stop = ('.self::ALPINE.')(this.$el); }, destroy() { this.stop(); } }';
}
