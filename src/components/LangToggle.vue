<script setup lang="ts">
// A small "island": the only JavaScript on the lantern page.
// It sets data-lang on <html>, and CSS hides the other language.
// Without JavaScript, both languages simply stay visible.
import { onMounted, ref } from 'vue';

type Lang = 'ja' | 'en';
const KEY = 'yipeng-lang';
const lang = ref<Lang>('ja');

function apply(next: Lang) {
  lang.value = next;
  document.documentElement.dataset.lang = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    // Private browsing can block storage; the toggle still works.
  }
  window.scrollTo({ top: 0 });
}

onMounted(() => {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch {}
  // Japanese by default: this page is for our hosts in Japan.
  apply(saved === 'en' ? 'en' : 'ja');
});
</script>

<template>
  <div class="toggle" role="group" aria-label="Language / 言語">
    <button type="button" lang="ja" :aria-pressed="lang === 'ja'" @click="apply('ja')">日本語</button>
    <button type="button" lang="en" :aria-pressed="lang === 'en'" @click="apply('en')">English</button>
  </div>
</template>

<style scoped>
.toggle {
  display: flex;
  border: 1.5px solid var(--accent);
  border-radius: 999px;
  overflow: hidden;
}
button {
  min-height: 44px;
  padding: 0 14px;
  border: 0;
  background: transparent;
  color: var(--accent);
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
button[aria-pressed='true'] {
  background: var(--accent);
  color: var(--on-accent);
}
</style>
