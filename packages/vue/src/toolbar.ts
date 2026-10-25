import { onBeforeUnmount, onMounted, type Ref } from 'vue';

/**
 * What a toolbar needs beyond the platform (toolbar.css, docs/adr/0002): its buttons and links
 * are one tab stop, and the arrow keys move between them (Left and Right, the other way round in
 * right-to-left text, Home and End), wrapping at the ends. It keeps the last control focused at
 * tabindex 0 and the rest at -1, and skips disabled controls, controls the CSS hides at this
 * width and the items of a menu inside the toolbar. Returns what removes the listeners.
 */
export function toolbarKeys(toolbar: HTMLElement): () => void {
  let current: HTMLElement | undefined;
  const controls = () =>
    [...toolbar.querySelectorAll<HTMLElement>('button, a[href]')].filter((control) => {
      const popover = control.closest('[popover]');
      return (
        (!popover || popover.contains(toolbar)) &&
        !control.matches(':disabled') &&
        (control.checkVisibility?.() ?? true)
      );
    });
  const update = () => {
    const list = controls();
    if (!current || !list.includes(current)) current = list[0];
    for (const control of list) control.tabIndex = control === current ? 0 : -1;
  };
  const focus = (event: FocusEvent) => {
    if (controls().includes(event.target as HTMLElement)) current = event.target as HTMLElement;
    update();
  };
  const keydown = (event: KeyboardEvent) => {
    const list = controls();
    const index = list.indexOf(event.target as HTMLElement);
    if (index < 0 || event.altKey || event.ctrlKey || event.metaKey) return;
    const forward = getComputedStyle(toolbar).direction === 'rtl' ? -1 : 1;
    const step: Record<string, number> = { ArrowRight: forward, ArrowLeft: -forward };
    const next =
      event.key === 'Home'
        ? list[0]
        : event.key === 'End'
          ? list[list.length - 1]
          : event.key in step
            ? list[(index + step[event.key]! + list.length) % list.length]
            : undefined;
    if (!next) return;
    event.preventDefault();
    next.focus();
  };
  // The app adds and removes actions, enables, disables, hides and shows them; the CSS hides some
  // at the toolbar's width (a container query on the root), which changes with the screen's and
  // with the panes', so the root's size is watched, not the window's.
  const observer = new MutationObserver(update);
  observer.observe(toolbar, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['disabled', 'hidden', 'data-overflow', 'class', 'style'],
  });
  const resize = new ResizeObserver(update);
  resize.observe(toolbar.parentElement ?? toolbar);
  toolbar.addEventListener('focusin', focus);
  toolbar.addEventListener('keydown', keydown);
  update();
  return () => {
    observer.disconnect();
    resize.disconnect();
    toolbar.removeEventListener('focusin', focus);
    toolbar.removeEventListener('keydown', keydown);
  };
}

/** `toolbarKeys()` on a component's toolbar, from mounting to unmounting. */
export function useToolbarKeys(toolbar: Ref<HTMLElement | undefined>): void {
  let stop: (() => void) | undefined;
  onMounted(() => {
    stop = toolbar.value ? toolbarKeys(toolbar.value) : undefined;
  });
  onBeforeUnmount(() => stop?.());
}
