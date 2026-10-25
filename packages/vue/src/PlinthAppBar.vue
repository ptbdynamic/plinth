<script setup lang="ts">
// Markup contract: packages/css/src/components/app-bar.css
import { useSlots } from 'vue';
import { hasContent } from './slots';

const slots = useSlots();
</script>

<template>
  <header class="plinth-app-bar">
    <div v-if="hasContent(slots.default?.())" class="plinth-app-bar-start"><slot /></div>
    <div v-if="hasContent(slots.actions?.())" class="plinth-app-bar-actions">
      <slot name="actions" />
    </div>
    <div v-if="hasContent(slots.account?.())" class="plinth-app-bar-account">
      <slot name="account" />
    </div>
  </header>
</template>
