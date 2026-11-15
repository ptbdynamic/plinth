<script setup lang="ts">
// Markup contract: packages/css/src/components/data-table.css
import { computed } from 'vue';
import {
  dataTableSort,
  dataTablePriority,
  type DataTableSort,
  type DataTablePriority,
} from './data-table';

const props = withDefaults(
  defineProps<{
    /** A sortable column's state, printed as aria-sort; put a PlinthDataTableSort in the slot. */
    sort?: DataTableSort;
    /** Numbers: aligned to the end, with figures of one width. */
    numeric?: boolean;
    /** Hidden on a phone's card; shown from 768px up. Give the column's cells the same. */
    hideOnPhone?: boolean;
    /**
     * Gives way as the table narrows, in a frame or a container: 3 shows from 960px of it, 2
     * from 640px, 1 always. Give the column's cells the same.
     */
    priority?: DataTablePriority | 1 | 2 | 3;
  }>(),
  { sort: undefined, numeric: false, hideOnPhone: false, priority: undefined },
);

// A blank sort counts as missing, as Blade's filled() decides.
const ariaSort = computed(() => (props.sort?.trim() ? dataTableSort(props.sort) : undefined));
</script>

<template>
  <th
    class="plinth-data-table-column"
    role="columnheader"
    scope="col"
    :aria-sort="ariaSort"
    :data-numeric="numeric ? '' : undefined"
    :data-phone="hideOnPhone ? 'hidden' : undefined"
    :data-priority="dataTablePriority(priority)"
  >
    <slot />
  </th>
</template>
