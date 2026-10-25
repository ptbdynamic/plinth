<script setup lang="ts">
// Markup contract: packages/css/src/components/app-nav.css
import { computed, useSlots } from 'vue';
import { hasContent } from './slots';

const props = withDefaults(
  defineProps<{
    /** The navigation's accessible name (aria-label). */
    label?: string;
    /** The app's name, beside its mark; the rail hides it but keeps it as the brand's name. */
    brandName?: string;
    /** Makes the brand a link, to the app's home. */
    brandHref?: string;
  }>(),
  { label: undefined, brandName: undefined, brandHref: undefined },
);

const slots = useSlots();
// Blank text counts as missing, as Blade's filled() decides.
const brandName = computed(() => (props.brandName?.trim() ? props.brandName : undefined));
const brandTag = computed(() => (props.brandHref?.trim() ? 'a' : 'div'));
</script>

<template>
  <nav class="plinth-app-nav" :aria-label="label?.trim() ? label : undefined">
    <component
      :is="brandTag"
      v-if="brandName || hasContent(slots.mark?.())"
      class="plinth-app-nav-brand"
      :href="brandTag === 'a' ? brandHref : undefined"
      ><span
        v-if="hasContent(slots.mark?.())"
        class="plinth-app-nav-mark"
        :aria-hidden="brandName ? 'true' : undefined"
        ><slot name="mark" /></span
      ><span v-if="brandName" class="plinth-app-nav-name">{{ brandName }}</span></component
    >
    <div class="plinth-app-nav-items"><slot /></div>
    <div v-if="hasContent(slots.footer?.())" class="plinth-app-nav-footer">
      <slot name="footer" />
    </div>
  </nav>
</template>
