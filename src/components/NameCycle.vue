<script setup lang="ts">
// "Hi, I'm Bhupha." where the name cycles through Thai and Japanese on hover
// (mouse) or on tap (touch). Screen readers always hear "Bhupha".
// All three names sit stacked in one spot, so the hover area always has the width
// of the longest name and never shrinks out from under the mouse.
// The full stop is part of each name, so it always sits right after the visible one.
import { onBeforeUnmount, ref } from 'vue';

const names = [
  { text: 'Bhupha', lang: 'en', note: '' },
  { text: 'ภูผา', lang: 'th', note: 'in Thai' },
  { text: 'プーパー', lang: 'ja', note: 'in Japanese' },
];

const index = ref(0);
let timer: number | undefined;

function next() {
  index.value = (index.value + 1) % names.length;
}

function start(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || timer) return;
  next();
  timer = window.setInterval(next, 1100);
}

function stop(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return;
  window.clearInterval(timer);
  timer = undefined;
  index.value = 0;
}

function tap(event: PointerEvent) {
  if (event.pointerType !== 'mouse') next();
}

onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <span class="name" @pointerenter="start" @pointerleave="stop" @pointerup="tap">
    <span class="sr-only">Bhupha.</span>
    <span class="stack" aria-hidden="true">
      <span
        v-for="(name, i) in names"
        :key="name.text"
        class="word"
        :class="{ on: i === index }"
        :lang="name.lang"
      ><span class="txt">{{ name.text }}</span>.</span>
    </span>
    <span class="note" aria-hidden="true">{{ names[index].note }}</span>
  </span>
</template>

<style scoped>
.name {
  position: relative;
  display: inline-block;
  cursor: default;
  line-height: 1.1;
}
.stack {
  display: inline-grid;
  /* Keep every name on the same baseline as "Hi, I'm". */
  align-items: baseline;
}
.word {
  grid-area: 1 / 1;
  /* The site gives Japanese text a taller line height for paragraphs; not here. */
  line-height: inherit;
  opacity: 0;
  transform: translateY(0.2em);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.word.on {
  opacity: 1;
  transform: none;
}
/* Japanese glyphs fill the whole em box, so they look bigger than Latin
   letters at the same size. Scale them down to match the Latin cap height. */
.txt {
  text-decoration: underline dotted var(--line);
  text-decoration-thickness: 3px;
  text-underline-offset: 0.14em;
}
.word:lang(ja) {
  font-size: 0.8em;
  letter-spacing: 0.02em;
}
.note {
  position: absolute;
  left: 0;
  top: 100%;
  margin-top: 6px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-soft);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .word {
    transition: none;
    transform: none;
  }
}
</style>
