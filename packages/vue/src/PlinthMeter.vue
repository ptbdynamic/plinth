<script setup lang="ts">
// Markup contract: packages/css/src/components/meter.css
import { computed, useId } from 'vue';
import { calloutIcons } from './callout';
import { meterRange, meterTone } from './meter';
import type { Tone } from './tones';

const props = withDefaults(
  defineProps<{
    /** What is measured: "Spend this month". The meter's accessible name. */
    label: string;
    /** The amount so far. */
    value?: number | string | null;
    /** The bottom of the range. */
    min?: number | string | null;
    /** The limit. */
    max?: number | string | null;
    /** Where the low part of the range ends. */
    low?: number | string | null;
    /** Where the high part of the range starts. */
    high?: number | string | null;
    /** The best value: below low, within the range, or above high. */
    optimum?: number | string | null;
    /** The numbers in words, formatted by the app: "€120 of €150". */
    valueText?: string;
    /** A line under the bar: what happens at the limit. */
    description?: string;
    /** The tone the app chooses; without one, the numbers decide it. */
    tone?: Tone;
    /** The meter's id; one is made up without it. */
    id?: string;
  }>(),
  {
    value: null,
    min: 0,
    max: 100,
    low: null,
    high: null,
    optimum: null,
    valueText: undefined,
    description: undefined,
    tone: undefined,
    id: undefined,
  },
);

if (!props.label?.trim()) {
  throw new Error("<PlinthMeter> needs a label: it is the meter's accessible name.");
}

const generatedId = useId();
const meterId = computed(() => props.id?.trim() || `plinth-meter-${generatedId}`);
const range = computed(() => meterRange(props));
const dataTone = computed(() => meterTone(props, props.tone));
const text = computed(() => (props.valueText?.trim() ? props.valueText : undefined));
const note = computed(() => (props.description?.trim() ? props.description : undefined));
</script>

<template>
  <div class="plinth-meter" :data-tone="dataTone">
    <span :id="`${meterId}-label`" class="plinth-meter-label">{{ label }}</span>
    <span v-if="text" class="plinth-meter-value" aria-hidden="true">{{ text }}</span>
    <meter
      :id="meterId"
      class="plinth-meter-bar"
      :min="range.min"
      :max="range.max"
      :low="range.low"
      :high="range.high"
      :optimum="range.optimum"
      :value="range.value"
      :aria-labelledby="`${meterId}-label`"
      :aria-describedby="note ? `${meterId}-description` : undefined"
      :aria-valuetext="text"
    >
      {{ text ?? range.value }}
    </meter>
    <span v-if="note" :id="`${meterId}-description`" class="plinth-meter-description"
      ><span
        v-if="dataTone !== 'neutral'"
        class="plinth-icon plinth-meter-tone"
        data-size="sm"
        aria-hidden="true"
        v-html="calloutIcons[dataTone]"
      ></span
      >{{ note }}</span
    >
  </div>
</template>
