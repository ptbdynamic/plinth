<script setup lang="ts">
// Markup contract: packages/css/src/components/app-shell.css
import { useSlots } from 'vue';
import { hasContent } from './slots';

const slots = useSlots();
</script>

<template>
  <div class="plinth-app-shell">
    <div v-if="hasContent(slots.nav?.())" class="plinth-app-shell-nav"><slot name="nav" /></div>
    <div v-if="hasContent(slots.bar?.())" class="plinth-app-shell-bar"><slot name="bar" /></div>
    <main class="plinth-app-shell-main"><slot /></main>
  </div>
</template>
