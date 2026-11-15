<script setup lang="ts">
// Markup contract: packages/css/src/components/breadcrumbs.css
import { computed } from 'vue';
import { breadcrumbsCollapse, type BreadcrumbsCollapse } from './breadcrumbs';

const props = withDefaults(
  defineProps<{
    /** The trail's accessible name (aria-label); blank leaves it to the app's aria-labelledby. */
    label?: string;
    /** On a phone, `parent` shows only the current page's parent, as a back link. */
    collapse?: BreadcrumbsCollapse;
  }>(),
  { label: 'Breadcrumb', collapse: 'none' },
);

// An unknown collapse falls back to `none`, as Blade's enum does.
const resolved = computed(() => breadcrumbsCollapse(props.collapse));
</script>

<template>
  <nav
    class="plinth-breadcrumbs"
    :aria-label="label?.trim() ? label : undefined"
    :data-collapse="resolved === 'none' ? undefined : resolved"
  >
    <ol class="plinth-breadcrumbs-list">
      <slot />
    </ol>
  </nav>
</template>
