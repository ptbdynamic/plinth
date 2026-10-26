/** The lengths a one-time code can have (one-time-code.css). 6 is the default. */
export const oneTimeCodeLengths = [4, 5, 6, 7, 8] as const;

export type OneTimeCodeLength = (typeof oneTimeCodeLengths)[number];

/** A length from the list, or 6 when it is not one of them. */
export function oneTimeCodeLength(value: number | string | undefined): OneTimeCodeLength {
  const length = Number(value);
  return oneTimeCodeLengths.find((option) => option === length) ?? 6;
}

/** The digits of a typed, pasted or autofilled value, at most `length` of them. */
export function oneTimeCodeDigits(value: string, length: number): string {
  return value.replace(/\D/g, '').slice(0, length);
}

/**
 * A paste into a one-time code: the pasted text replaces the selection, and only digits stay, so
 * "123 456" or "Code: 123456" fills the field, with the caret after it. It sets the input's value and fires `input`, as
 * typing does, so v-model, wire:model and the app's own listeners see it.
 */
export function pasteOneTimeCode(
  input: HTMLInputElement,
  event: ClipboardEvent,
  length: number,
): void {
  const text = event.clipboardData?.getData('text') ?? '';
  event.preventDefault();
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const value = oneTimeCodeDigits(
    input.value.slice(0, start) + text + input.value.slice(end),
    length,
  );
  // The prototype's setter, so React sees the change too.
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(input, value);
  input.setSelectionRange(value.length, value.length);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}
