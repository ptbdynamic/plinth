<script setup lang="ts">
// Markup contract: packages/css/src/components/breadcrumbs.css
import PlinthIcon from './PlinthIcon.vue';

// The button is the root: the app's attributes land on it, bound last so they win, and the app's
// menu (the default slot) follows it (docs/adr/0002).
defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** The id of the menu the button opens (popovertarget). */
    menu: string;
    /** The button's accessible name. */
    label?: string;
  }>(),
  { label: 'More pages' },
);

if (!props.menu?.trim()) {
  throw new Error('<PlinthBreadcrumbsMore> needs a menu: the id of the menu its button opens.');
}
if (!props.label?.trim()) {
  throw new Error("<PlinthBreadcrumbsMore> needs a label: it is the button's name.");
}
</script>

<template>
  <li class="plinth-breadcrumbs-item">
    <button
      class="plinth-breadcrumbs-more"
      type="button"
      :popovertarget="menu.trim()"
      :aria-label="label"
      v-bind="$attrs"
    >
      <PlinthIcon name="more" size="sm" /></button
    ><slot />
  </li>
</template>
