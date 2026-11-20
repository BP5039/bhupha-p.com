<script setup lang="ts">
// Hero portrait with two sides and a gentle mouse parallax.
// - Mouse: hovering the card shows the "off duty" side; the card tilts slightly
//   and the doodles around it drift at different depths as the mouse moves.
// - Touch or keyboard: tap / press the card to switch sides. No movement.
// - Reduced motion setting: no tilt or drift, sides still switch.
// Pass real photos with the `front` and `back` props; until then, placeholders show.
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
  front?: string;
  back?: string;
  frontAlt?: string;
  backAlt?: string;
}>();

const stage = ref<HTMLElement | null>(null);
const flipped = ref(false);
let frame = 0;
let hoverCapable = false;

function onMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !stage.value) return;
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const box = stage.value!.getBoundingClientRect();
    const x = (event.clientX - (box.left + box.width / 2)) / (window.innerWidth / 2);
    const y = (event.clientY - (box.top + box.height / 2)) / (window.innerHeight / 2);
    stage.value!.style.setProperty('--mx', Math.max(-1, Math.min(1, x)).toFixed(3));
    stage.value!.style.setProperty('--my', Math.max(-1, Math.min(1, y)).toFixed(3));
  });
}

onMounted(() => {
  hoverCapable = window.matchMedia('(hover: hover)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (hoverCapable && !reduce) window.addEventListener('pointermove', onMove, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove);
  cancelAnimationFrame(frame);
});

function enter(event: PointerEvent) {
  if (event.pointerType === 'mouse') flipped.value = true;
}
function leave(event: PointerEvent) {
  if (event.pointerType === 'mouse') flipped.value = false;
}
function toggle(event: MouseEvent) {
  // Mouse users flip by hovering; a click would undo that, so only touch and keyboard toggle.
  if ((event as PointerEvent).pointerType === 'mouse') return;
  flipped.value = !flipped.value;
}
</script>

<template>
  <div ref="stage" class="stage" :class="{ flipped }">
    <!-- Doodles: decorative outline icons that drift with the mouse. -->
    <svg class="doodle d-code" style="--d: 1.4" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5" /></svg>
    <svg class="doodle d-note" style="--d: -1" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></svg>
    <svg class="doodle d-lantern" style="--d: 1.8" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1v2M10 3h4l3 3v6l-3 3h-4l-3-3V6zM7 6h10M7 12h10M11 15l-1 6M13 15l1 6M12 15v7" /></svg>
    <svg class="doodle d-bass" style="--d: -1.6" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 10.5L21 3M19 2l3 3M8 16l5-5" /><ellipse cx="8.5" cy="15.5" rx="5" ry="3.6" transform="rotate(-45 8.5 15.5)" /></svg>
    <svg class="doodle d-camera" style="--d: 1.1" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>
    <span class="doodle d-kana" style="--d: -1.2" lang="ja" aria-hidden="true">あ</span>

    <button
      type="button"
      class="card"
      :aria-pressed="flipped"
      :aria-label="flipped ? 'Showing Bhupha off duty. Press to show the portrait.' : 'Showing Bhupha\'s portrait. Press to show him off duty.'"
      @pointerenter="enter"
      @pointerleave="leave"
      @click="toggle"
    >
      <span class="face front">
        <img v-if="props.front" :src="props.front" :alt="props.frontAlt ?? 'Portrait of Bhupha'" />
        <span v-else class="placeholder">
          <span class="mono">BP</span>
          <span class="ph-label">Portrait goes here</span>
        </span>
      </span>
      <span class="face back">
        <img v-if="props.back" :src="props.back" :alt="props.backAlt ?? 'Bhupha playing bass'" />
        <span v-else class="placeholder dark">
          <svg class="big-bass" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 10.5L21 3M19 2l3 3M8 16l5-5" /><ellipse cx="8.5" cy="15.5" rx="5" ry="3.6" transform="rotate(-45 8.5 15.5)" /></svg>
          <span class="ph-label">Off duty: bass photo goes here</span>
        </span>
      </span>
    </button>
    <p class="hint" aria-hidden="true"><span class="hint-mouse">Hover the photo</span><span class="hint-touch">Tap the photo</span></p>
  </div>
</template>

<style scoped>
.stage {
  --mx: 0;
  --my: 0;
  position: relative;
  width: min(300px, 78vw);
  margin: 0 auto;
  padding: 28px 0 0;
  perspective: 900px;
}

.card {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--surface);
  overflow: hidden;
  cursor: pointer;
  transform: rotateY(calc(var(--mx) * 7deg)) rotateX(calc(var(--my) * -7deg));
  transition: transform 0.2s ease-out, box-shadow 0.3s ease;
  box-shadow: 0 18px 40px -24px rgba(15, 20, 31, 0.45);
}
.card:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 4px;
}

.face {
  position: absolute;
  inset: 0;
  display: block;
  transition: opacity 0.35s ease;
}
.face img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.back { opacity: 0; }
.flipped .front { opacity: 0; }
.flipped .back { opacity: 1; }

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  color: var(--heading);
}
.placeholder.dark {
  background: var(--accent);
  color: var(--on-accent);
}
.mono {
  font-size: 84px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
}
.ph-label {
  font-size: 13px;
  font-weight: 600;
  opacity: 0.75;
}
.big-bass {
  width: 96px;
  height: 96px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
}

.doodle {
  position: absolute;
  width: 34px;
  height: 34px;
  fill: none;
  stroke: var(--ink-soft);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.55;
  transform: translate(calc(var(--mx) * var(--d) * 14px), calc(var(--my) * var(--d) * 14px));
  transition: transform 0.25s ease-out;
  pointer-events: none;
}
.d-code { top: 6px; left: -46px; }
.d-note { top: 30%; right: -52px; }
.d-lantern { bottom: 22%; left: -54px; width: 38px; height: 38px; }
.d-bass { top: -6px; right: -30px; }
.d-camera { bottom: 34px; right: -44px; }
.d-kana {
  bottom: 40%;
  left: -40px;
  width: auto;
  height: auto;
  font-size: 28px;
  font-weight: 700;
  color: var(--ink-soft);
}

.hint {
  margin: 14px 0 0;
  text-align: center;
  font-size: 13px;
  color: var(--ink-soft);
}
.hint-touch { display: none; }
@media (hover: none) {
  .hint-mouse { display: none; }
  .hint-touch { display: inline; }
}

/* Narrow phones: a smaller card leaves room for the doodles beside it. */
@media (max-width: 480px) {
  .stage { width: min(300px, 64vw); }
  .doodle { width: 26px; height: 26px; }
  .d-lantern { width: 28px; height: 28px; }
  .d-kana { font-size: 22px; }
  .d-code, .d-lantern, .d-kana { left: -42px; }
  .d-note, .d-camera { right: -42px; }
  .d-bass { right: -34px; }
}

@media (prefers-reduced-motion: reduce) {
  .card, .doodle { transform: none; transition: none; }
  .face { transition: none; }
}
</style>
