<script setup lang="ts">
// Markup contract: packages/css/src/components/textarea.css
import { computed, mergeProps, useAttrs, useId } from 'vue';
import { fieldDescribedBy } from './text-field';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** The label, and the field's accessible name. */
    label: string;
    /** Hides the label visually; screen readers still read it. */
    hideLabel?: boolean;
    /** The textarea's id; one is generated when it is missing. */
    id?: string;
    /** The lines it shows, and where it starts when it grows. */
    rows?: number;
    /** Grows with its content, from rows lines to maxRows, then scrolls. */
    grow?: boolean;
    /** The most lines it grows to. */
    maxRows?: number;
    /** A line under the field that helps fill it in. */
    description?: string;
    /** What is wrong with the value; it marks the field invalid. */
    error?: string;
    disabled?: boolean;
    readonly?: boolean;
  }>(),
  {
    hideLabel: false,
    id: undefined,
    rows: 3,
    grow: false,
    maxRows: 8,
    description: undefined,
    error: undefined,
    disabled: false,
    readonly: false,
  },
);

/** The value, with `v-model`. */
const model = defineModel<string>();

if (!props.label?.trim()) {
  throw new Error("<PlinthTextarea> needs a label: it is the field's accessible name.");
}

const attrs = useAttrs();
const generatedId = useId();
const inputId = computed(() => props.id?.trim() || `plinth-textarea-${generatedId}`);
const hasDescription = computed(() => Boolean(props.description?.trim()));
const hasError = computed(() => Boolean(props.error?.trim()));
const describedBy = computed(() => fieldDescribedBy(inputId.value, props.description, props.error));
// The project's class goes on the root; every other attribute on the textarea, after Plinth's so
// it wins (docs/adr/0002), and a style after the grow's.
const inputAttrs = computed(() =>
  mergeProps(
    props.grow
      ? {
          style: `--plinth-textarea-rows: ${props.rows}; --plinth-textarea-max-rows: ${Math.max(props.maxRows, props.rows)}`,
        }
      : {},
    Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class')),
  ),
);

function onInput(event: Event) {
  model.value = (event.target as HTMLTextAreaElement).value;
}
</script>

<template>
  <div :class="['plinth-textarea', attrs.class]" :data-label="hideLabel ? 'hidden' : undefined">
    <label class="plinth-textarea-label" :for="inputId">{{ label }}</label>
    <textarea
      :id="inputId"
      class="plinth-textarea-input"
      :rows="rows"
      :data-grow="grow ? '' : undefined"
      :value="model"
      :disabled="disabled || undefined"
      :readonly="readonly || undefined"
      :aria-describedby="describedBy"
      :aria-invalid="hasError ? 'true' : undefined"
      v-bind="inputAttrs"
      @input="onInput"
    ></textarea>
    <p v-if="hasDescription" :id="`${inputId}-description`" class="plinth-textarea-description">
      {{ description }}
    </p>
    <p v-if="hasError" :id="`${inputId}-error`" class="plinth-textarea-error">{{ error }}</p>
  </div>
</template>
