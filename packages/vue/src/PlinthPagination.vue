<script setup lang="ts">
// Markup contract: packages/css/src/components/pagination.css
import { computed, useSlots } from 'vue';
import PlinthIconButton from './PlinthIconButton.vue';
import { currentPage, pageCount, pageHref, pageItems } from './pagination';
import { hasContent } from './slots';

const props = withDefaults(
  defineProps<{
    /** The current page, from 1. */
    page?: number | string;
    /** How many pages there are. */
    pages?: number | string;
    /** The pages' URL with {page} in it (?page={page}); without it the pages are buttons. */
    href?: string;
    /** The nav's accessible name. */
    label?: string;
    /** Previous's accessible name. */
    previousLabel?: string;
    /** Next's accessible name. */
    nextLabel?: string;
  }>(),
  {
    page: 1,
    pages: 1,
    href: undefined,
    label: 'Pagination',
    previousLabel: 'Previous page',
    nextLabel: 'Next page',
  },
);

const emit = defineEmits<{
  /** A page button was chosen (only without href): the page to show. */
  'update:page': [page: number];
}>();

defineSlots<{
  /** The summary, in the app's words (Showing 1 to 25 of 120 results). */
  default?: () => unknown;
  /** The page-size form. */
  size?: () => unknown;
}>();

const slots = useSlots();
const last = computed(() => pageCount(props.pages));
const current = computed(() => currentPage(props.page, last.value));
const items = computed(() => pageItems(current.value, last.value));
const isLink = computed(() => Boolean(props.href?.trim()));
const target = (page: number) => (isLink.value ? pageHref(props.href!, page) : undefined);

/**
 * Previous's or next's own attributes: rel on a link, data-page on a button. A button at the end
 * keeps focus, so it is aria-disabled rather than disabled.
 */
function step(page: number, enabled: boolean, rel: string): Record<string, unknown> {
  if (!enabled) return isLink.value ? {} : { 'aria-disabled': 'true' };
  if (isLink.value) return { rel };
  return { 'data-page': String(page), onClick: () => go(page) };
}

function go(page: number) {
  if (page !== current.value) emit('update:page', page);
}
</script>

<template>
  <nav class="plinth-pagination" :aria-label="label">
    <p v-if="hasContent(slots.default?.())" class="plinth-pagination-summary" role="status">
      <slot />
    </p>
    <div v-if="hasContent(slots.size?.())" class="plinth-pagination-size"><slot name="size" /></div>
    <div class="plinth-pagination-pages">
      <PlinthIconButton
        :label="previousLabel"
        icon="chevron-left"
        variant="secondary"
        size="md"
        :href="target(current - 1)"
        :disabled="isLink && current <= 1"
        v-bind="step(current - 1, current > 1, 'prev')"
      />
      <ol class="plinth-pagination-list">
        <li v-for="(item, index) in items" :key="item === 'gap' ? `gap-${index}` : item">
          <span v-if="item === 'gap'" class="plinth-pagination-gap">…</span>
          <a
            v-else-if="isLink"
            class="plinth-pagination-page"
            :href="pageHref(href!, item)"
            :aria-current="item === current ? 'page' : undefined"
            >{{ item }}</a
          >
          <button
            v-else
            type="button"
            class="plinth-pagination-page"
            :data-page="item"
            :aria-current="item === current ? 'page' : undefined"
            @click="go(item)"
          >
            {{ item }}
          </button>
        </li>
      </ol>
      <PlinthIconButton
        :label="nextLabel"
        icon="chevron-right"
        variant="secondary"
        size="md"
        :href="target(current + 1)"
        :disabled="isLink && current >= last"
        v-bind="step(current + 1, current < last, 'next')"
      />
    </div>
  </nav>
</template>
