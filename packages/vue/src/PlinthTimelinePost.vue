<script setup lang="ts">
// Markup contract: packages/css/src/components/timeline.css
import { computed, useSlots } from 'vue';
import type { HeadingLevel } from './heading';
import PlinthAvatar from './PlinthAvatar.vue';
import PlinthBadge from './PlinthBadge.vue';
import { hasContent } from './slots';
import { timelineHeadingLevel, timelineKind, type TimelineKind } from './timeline';

const props = withDefaults(
  defineProps<{
    /** Who wrote it: the heading, and where the avatar's initials come from. */
    author: string;
    /** The author's picture, shown instead of the initials. */
    avatar?: string;
    /** Who wrote it, as a ring on the avatar. */
    kind?: TimelineKind;
    /** The meta line's start: an email or a role. */
    detail?: string;
    /** When, as shown (09:14, 10 min ago). */
    time?: string;
    /** The time as a machine-readable date. */
    datetime?: string;
    /** A short id on the end side, shown from 1280px. */
    reference?: string;
    /** The note's badge. */
    noteLabel?: string;
    /** The heading's element, h2 to h6. */
    headingLevel?: HeadingLevel;
  }>(),
  {
    avatar: undefined,
    kind: 'team',
    detail: undefined,
    time: undefined,
    datetime: undefined,
    reference: undefined,
    noteLabel: 'Internal note',
    headingLevel: 'h3',
  },
);

const slots = useSlots();

// Blank counts as missing, as Blade's filled() decides.
const filled = (text: string | undefined) => !!text?.trim();

const dataKind = computed(() => timelineKind(props.kind));
const level = computed(() => timelineHeadingLevel(props.headingLevel));
const hasMeta = computed(() => filled(props.detail) || filled(props.time));
</script>

<template>
  <li class="plinth-timeline-post" :data-kind="dataKind">
    <article class="plinth-timeline-article">
      <PlinthAvatar
        :name="author"
        :src="filled(avatar) ? avatar : undefined"
        size="md"
        decorative
      />
      <header class="plinth-timeline-header">
        <component :is="level" class="plinth-timeline-heading">
          <span class="plinth-timeline-author">{{ author }}</span>
          <PlinthBadge v-if="dataKind === 'note'" tone="warning">{{ noteLabel }}</PlinthBadge>
          <span v-if="filled(reference)" class="plinth-timeline-reference">{{ reference }}</span>
        </component>
        <p v-if="hasMeta" class="plinth-timeline-meta">
          <span v-if="filled(detail)" class="plinth-timeline-detail">{{ detail }}</span>
          <time
            v-if="filled(time)"
            class="plinth-timeline-time"
            :datetime="filled(datetime) ? datetime : undefined"
            >{{ time }}</time
          >
        </p>
      </header>
      <div class="plinth-timeline-body"><slot /></div>
      <div v-if="hasContent(slots.actions?.())" class="plinth-timeline-actions">
        <slot name="actions" />
      </div>
    </article>
  </li>
</template>
