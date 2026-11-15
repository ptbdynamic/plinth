<script setup lang="ts">
// Markup contract: packages/css/src/components/breadcrumbs.css
// The link is the item's root: the app's attributes land on it, bound last so they win, not on
// the <li> (docs/adr/0002).
defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    /** The page's address; the current page has none. */
    href?: string;
    /** The page being shown: aria-current="page", and no href. */
    current?: boolean;
  }>(),
  { href: undefined, current: false },
);
</script>

<template>
  <li class="plinth-breadcrumbs-item">
    <a
      class="plinth-breadcrumbs-link"
      :href="!current && href?.trim() ? href : undefined"
      :aria-current="current ? 'page' : undefined"
      v-bind="$attrs"
      ><span class="plinth-breadcrumbs-label"><slot /></span
    ></a>
  </li>
</template>
