<script setup lang="ts">
// Markup contract: packages/css/src/components/app-shell.css
import { useSlots } from 'vue';
import { hasContent } from './slots';

withDefaults(
  defineProps<{
    /** The section's title, on a row as tall as the app bar, at the top of its column. */
    sectionTitle?: string;
    /** The section column's id, for aria-controls; its title takes "<id>-title". */
    sectionId?: string;
    /** Collapses the section column: data-section="closed". */
    sectionClosed?: boolean;
  }>(),
  { sectionTitle: undefined, sectionId: undefined, sectionClosed: false },
);

const slots = useSlots();
</script>

<template>
  <div class="plinth-app-shell" :data-section="sectionClosed ? 'closed' : undefined">
    <div v-if="hasContent(slots.nav?.())" class="plinth-app-shell-nav"><slot name="nav" /></div>
    <div
      v-if="hasContent(slots.section?.())"
      :id="sectionId || undefined"
      class="plinth-app-shell-section"
    >
      <div v-if="sectionTitle" class="plinth-app-shell-section-header">
        <p
          :id="sectionId ? `${sectionId}-title` : undefined"
          class="plinth-app-shell-section-title"
        >
          {{ sectionTitle }}
        </p>
      </div>
      <div class="plinth-app-shell-section-body"><slot name="section" /></div>
    </div>
    <div v-if="hasContent(slots.bar?.())" class="plinth-app-shell-bar"><slot name="bar" /></div>
    <main class="plinth-app-shell-main"><slot /></main>
  </div>
</template>
