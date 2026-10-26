<script setup lang="ts">
// Markup contract: packages/css/src/components/switch.css
import { computed, useAttrs, useId } from 'vue';
import { fieldDescribedBy } from './text-field';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** The label beside the switch, and its accessible name. */
    label: string;
    /** The input's id; one is generated when it is missing. */
    id?: string;
    /** A line under the label that says more about the setting. */
    description?: string;
    /** What is wrong; it marks the switch invalid. */
    error?: string;
    disabled?: boolean;
  }>(),
  {
    id: undefined,
    description: undefined,
    error: undefined,
    disabled: false,
  },
);

/** Whether it is on, with `v-model`. */
const model = defineModel<boolean>();

if (!props.label?.trim()) {
  throw new Error("<PlinthSwitch> needs a label: it is the switch's accessible name.");
}

const attrs = useAttrs();
const generatedId = useId();
const inputId = computed(() => props.id?.trim() || `plinth-switch-${generatedId}`);
const hasDescription = computed(() => Boolean(props.description?.trim()));
const hasError = computed(() => Boolean(props.error?.trim()));
const describedBy = computed(() => fieldDescribedBy(inputId.value, props.description, props.error));
// The project's class goes on the root; every other attribute on the input, bound last so it
// wins over Plinth's (docs/adr/0002). The model's own change listener comes first, so the
// project's listener sees the new value.
const inputAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class')),
);

function onChange(event: Event) {
  model.value = (event.target as HTMLInputElement).checked;
}
</script>

<template>
  <div :class="['plinth-switch', attrs.class]">
    <input
      :id="inputId"
      type="checkbox"
      role="switch"
      class="plinth-switch-input"
      :checked="model"
      :disabled="disabled || undefined"
      :aria-describedby="describedBy"
      :aria-invalid="hasError ? 'true' : undefined"
      @change="onChange"
      v-bind="inputAttrs"
    />
    <label class="plinth-switch-label" :for="inputId">{{ label }}</label>
    <p v-if="hasDescription" :id="`${inputId}-description`" class="plinth-switch-description">
      {{ description }}
    </p>
    <p v-if="hasError" :id="`${inputId}-error`" class="plinth-switch-error">{{ error }}</p>
  </div>
</template>
