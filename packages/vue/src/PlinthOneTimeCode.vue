<script setup lang="ts">
// Markup contract: packages/css/src/components/one-time-code.css
import { computed, useAttrs, useId } from 'vue';
import PlinthField from './PlinthField.vue';
import { oneTimeCodeDigits, oneTimeCodeLength, pasteOneTimeCode } from './one-time-code';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** The label, and the field's accessible name. */
    label: string;
    /** Hides the label visually; screen readers still read it. */
    hideLabel?: boolean;
    /** The input's id; one is generated when it is missing. */
    id?: string;
    /** How many digits the code has, 4 to 8; 6 for any other. */
    length?: number;
    /** A line under the code that helps fill it in. */
    description?: string;
    /** What is wrong with the code; it marks the field invalid. */
    error?: string;
    disabled?: boolean;
    /** Submits the input's form once every digit is in. */
    autosubmit?: boolean;
  }>(),
  {
    hideLabel: false,
    id: undefined,
    length: 6,
    description: undefined,
    error: undefined,
    disabled: false,
    autosubmit: false,
  },
);

/** The code, with `v-model`: digits only. */
const model = defineModel<string>();

const emit = defineEmits<{
  /** Every digit is in: the code, once it reaches its length. */
  complete: [code: string];
}>();

if (!props.label?.trim()) {
  throw new Error("<PlinthOneTimeCode> needs a label: it is the field's accessible name.");
}

const attrs = useAttrs();
const generatedId = useId();
const inputId = computed(() => props.id?.trim() || `plinth-one-time-code-${generatedId}`);
const digits = computed(() => oneTimeCodeLength(props.length));
// The project's class goes on the root; every other attribute on the input, bound after Plinth's
// so it wins (docs/adr/0002). The project's input listener runs after the digits are cleaned, and
// its paste listener before Plinth's, which leaves a paste it prevented alone.
const inputAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class')),
);

function onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const code = oneTimeCodeDigits(input.value, digits.value);
  if (input.value !== code) input.value = code;
  if (model.value === code) return;
  model.value = code;
  if (code.length < digits.value) return;
  emit('complete', code);
  if (props.autosubmit) input.form?.requestSubmit();
}

function onPaste(event: ClipboardEvent) {
  if (event.defaultPrevented) return;
  pasteOneTimeCode(event.currentTarget as HTMLInputElement, event, digits.value);
}
</script>

<template>
  <PlinthField
    :id="inputId"
    :class="['plinth-one-time-code', attrs.class]"
    :label="label"
    :hide-label="hideLabel"
    :description="description"
    :error="error"
    v-slot="control"
  >
    <input
      :id="control.id"
      type="text"
      class="plinth-one-time-code-input"
      inputmode="numeric"
      autocomplete="one-time-code"
      :pattern="`[0-9]{${digits}}`"
      :maxlength="digits"
      :value="model"
      :aria-describedby="control.describedBy"
      :aria-invalid="control.invalid ? 'true' : undefined"
      :disabled="disabled || undefined"
      @input="onInput"
      v-bind="inputAttrs"
      @paste="onPaste"
    />
  </PlinthField>
</template>
