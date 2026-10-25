<script setup lang="ts">
// Markup contract: packages/css/src/components/text-field.css
import { computed, useAttrs, useId, useSlots } from 'vue';
import { hasContent } from './slots';
import { fieldDescribedBy, textFieldSize, type TextFieldSize } from './text-field';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** The label, and the field's accessible name. */
    label: string;
    /** Hides the label visually; screen readers still read it. */
    hideLabel?: boolean;
    /** The input's id; one is generated when it is missing. */
    id?: string;
    /** The input's type: text, email, url, tel, password, number, search… */
    type?: string;
    size?: TextFieldSize;
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
    type: 'text',
    size: 'md',
    description: undefined,
    error: undefined,
    disabled: false,
    readonly: false,
  },
);

/** The value, with `v-model`. */
const model = defineModel<string>();

if (!props.label?.trim()) {
  throw new Error("<PlinthTextField> needs a label: it is the field's accessible name.");
}

const attrs = useAttrs();
const slots = useSlots();
const generatedId = useId();
const inputId = computed(() => props.id?.trim() || `plinth-text-field-${generatedId}`);
const dataSize = computed(() => textFieldSize(props.size));
const hasDescription = computed(() => Boolean(props.description?.trim()));
const hasError = computed(() => Boolean(props.error?.trim()));
const describedBy = computed(() => fieldDescribedBy(inputId.value, props.description, props.error));
// The project's class goes on the root; every other attribute on the input, bound last so it
// wins over Plinth's (docs/adr/0002).
const inputAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class')),
);

function onInput(event: Event) {
  model.value = (event.target as HTMLInputElement).value;
}
</script>

<template>
  <div
    :class="['plinth-text-field', attrs.class]"
    :data-size="dataSize"
    :data-label="hideLabel ? 'hidden' : undefined"
  >
    <label class="plinth-text-field-label" :for="inputId">{{ label }}</label>
    <div class="plinth-text-field-control">
      <span v-if="hasContent(slots.icon?.())" class="plinth-icon" data-size="sm" aria-hidden="true"
        ><slot name="icon"
      /></span>
      <input
        :id="inputId"
        :type="type"
        class="plinth-text-field-input"
        :value="model"
        :disabled="disabled || undefined"
        :readonly="readonly || undefined"
        :aria-describedby="describedBy"
        :aria-invalid="hasError ? 'true' : undefined"
        v-bind="inputAttrs"
        @input="onInput"
      />
      <span v-if="hasContent(slots.trailing?.())" class="plinth-text-field-trailing"
        ><slot name="trailing"
      /></span>
    </div>
    <p v-if="hasDescription" :id="`${inputId}-description`" class="plinth-text-field-description">
      {{ description }}
    </p>
    <p v-if="hasError" :id="`${inputId}-error`" class="plinth-text-field-error">{{ error }}</p>
  </div>
</template>
