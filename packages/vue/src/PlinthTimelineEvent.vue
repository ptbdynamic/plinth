<script setup lang="ts">
// Markup contract: packages/css/src/components/timeline.css
withDefaults(
  defineProps<{
    /** When, as shown (09:14, 10 min ago). */
    time?: string;
    /** The time as a machine-readable date. */
    datetime?: string;
  }>(),
  { time: undefined, datetime: undefined },
);
</script>

<template>
  <li class="plinth-timeline-event">
    <span class="plinth-timeline-dot" aria-hidden="true"></span>
    <p class="plinth-timeline-text">
      <slot /><time
        v-if="time?.trim()"
        class="plinth-timeline-time"
        :datetime="datetime?.trim() ? datetime : undefined"
        >{{ time }}</time
      >
    </p>
  </li>
</template>
