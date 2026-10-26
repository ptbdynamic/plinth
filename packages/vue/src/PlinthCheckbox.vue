<script setup lang="ts">
// Markup contract: packages/css/src/components/checkbox.css
import { computed, ref, useAttrs, useId, watchEffect } from 'vue';
import { fieldDescribedBy } from './text-field';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** The label beside the box, and its accessible name. */
    label: string;
    /** The input's id; one is generated when it is missing. */
    id?: string;
    /** Neither checked nor not, such as a "select all" box when some are checked. */
    indeterminate?: boolean;
    /** A line under the label that says more about the choice. */
    description?: string;
    /** What is wrong; it marks the checkbox invalid. */
    error?: string;
    disabled?: boolean;
  }>(),
  {
    id: undefined,
    indeterminate: false,
    description: undefined,
    error: undefined,
    disabled: false,
  },
);

/** Whether it is checked, with `v-model`. */
const model = defineModel<boolean>();

if (!props.label?.trim()) {
  throw new Error("<PlinthCheckbox> needs a label: it is the checkbox's accessible name.");
}

const attrs = useAttrs();
const generatedId = useId();
const input = ref<HTMLInputElement>();
const inputId = computed(() => props.id?.trim() || `plinth-checkbox-${generatedId}`);
const hasDescription = computed(() => Boolean(props.description?.trim()));
const hasError = computed(() => Boolean(props.error?.trim()));
const describedBy = computed(() => fieldDescribedBy(inputId.value, props.description, props.error));
// The project's class goes on the root; every other attribute on the input, bound last so it
// wins over Plinth's (docs/adr/0002).
const inputAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class')),
);

// Indeterminate is a property with no attribute, so it is set once the input is there.
watchEffect(
  () => {
    if (input.value) input.value.indeterminate = props.indeterminate;
  },
  { flush: 'post' },
);

function onChange(event: Event) {
  model.value = (event.target as HTMLInputElement).checked;
}
</script>

<template>
  <div :class="['plinth-checkbox', attrs.class]">
    <input
      :id="inputId"
      ref="input"
      type="checkbox"
      class="plinth-checkbox-input"
      :checked="model"
      :disabled="disabled || undefined"
      :aria-describedby="describedBy"
      :aria-invalid="hasError ? 'true' : undefined"
      v-bind="inputAttrs"
      @change="onChange"
    />
    <label class="plinth-checkbox-label" :for="inputId">{{ label }}</label>
    <p v-if="hasDescription" :id="`${inputId}-description`" class="plinth-checkbox-description">
      {{ description }}
    </p>
    <p v-if="hasError" :id="`${inputId}-error`" class="plinth-checkbox-error">{{ error }}</p>
  </div>
</template>
