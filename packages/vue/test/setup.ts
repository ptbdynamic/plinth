/**
 * jsdom has no ResizeObserver. This one records what each observer watches, and `resize()` plays
 * a change of an element's size, as the browser reports it.
 */
const observers = new Set<ResizeObserverStub>();

class ResizeObserverStub {
  readonly targets = new Set<Element>();
  private readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element): void {
    this.targets.add(target);
    observers.add(this);
  }

  unobserve(target: Element): void {
    this.targets.delete(target);
  }

  disconnect(): void {
    observers.delete(this);
  }

  call(target: Element): void {
    if (this.targets.has(target)) this.callback([], this as unknown as ResizeObserver);
  }
}

globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver;

/** Tells every observer watching the element that its size changed. */
export function resize(target: Element): void {
  for (const observer of observers) observer.call(target);
}
