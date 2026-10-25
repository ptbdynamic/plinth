<script setup lang="ts">
// Markup contract: packages/css/src/components/split-view.css
import { computed, useSlots } from 'vue';
import { hasContent } from './slots';
import { splitViewPane, type SplitViewPane } from './split-view';

const props = withDefaults(
  defineProps<{
    /** The one pane a phone shows: the list (the default) or the detail. */
    pane?: SplitViewPane;
    /** Collapses the secondary column: data-secondary="closed". */
    secondaryClosed?: boolean;
  }>(),
  { pane: 'list', secondaryClosed: false },
);

const slots = useSlots();
const dataPane = computed(() => splitViewPane(props.pane));
</script>

<template>
  <div
    class="plinth-split-view"
    :data-pane="dataPane"
    :data-secondary="secondaryClosed ? 'closed' : undefined"
  >
    <div v-if="hasContent(slots.secondary?.())" class="plinth-split-view-secondary">
      <slot name="secondary" />
    </div>
    <div class="plinth-split-view-list"><slot name="list" /></div>
    <div class="plinth-split-view-detail">
      <slot />
      <div v-if="hasContent(slots.footer?.())" class="plinth-split-view-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
