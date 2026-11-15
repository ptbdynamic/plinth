<script setup lang="ts">
// Markup contract: packages/css/src/components/data-table.css

// The table is the root for the project's attributes, framed or not (docs/adr/0002).
defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    /** The table's name, shown above it. Without it, name the table with aria-label. */
    caption?: string;
    /** A card of its own from 768px up: a frame that scrolls a wide table, and a header band. */
    framed?: boolean;
  }>(),
  { caption: undefined, framed: false },
);
</script>

<template>
  <div v-if="framed" class="plinth-data-table-frame">
    <table class="plinth-data-table" role="table" v-bind="$attrs">
      <caption v-if="caption?.trim()" class="plinth-data-table-caption">
        {{
          caption
        }}
      </caption>
      <thead class="plinth-data-table-head" role="rowgroup">
        <tr class="plinth-data-table-head-row" role="row">
          <slot name="head" />
        </tr>
      </thead>
      <tbody class="plinth-data-table-body" role="rowgroup">
        <slot />
      </tbody>
    </table>
  </div>
  <table v-else class="plinth-data-table" role="table" v-bind="$attrs">
    <caption v-if="caption?.trim()" class="plinth-data-table-caption">
      {{
        caption
      }}
    </caption>
    <thead class="plinth-data-table-head" role="rowgroup">
      <tr class="plinth-data-table-head-row" role="row">
        <slot name="head" />
      </tr>
    </thead>
    <tbody class="plinth-data-table-body" role="rowgroup">
      <slot />
    </tbody>
  </table>
</template>
