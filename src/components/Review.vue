<template>
  <section
      class="relative w-full max-w-4xl mx-auto select-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="User Reviews"
  >
    <!-- Header -->
    <div class="mb-5 text-center">
      <h2 class="text-2xl sm:text-3xl font-semibold tracking-wider text-[#fff] bg-clip-text bg-gradient-to-r from-fuchsia-300 via-indigo-300 to-violet-300">
        ✨ Reviews
      </h2>
      <p class="mt-1 text-sm text-white/70">What people say about their karmic readings</p>
    </div>

    <!-- Frame with animated border -->
    <div class="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-fuchsia-500/60 via-indigo-500/60 to-violet-500/60 animate-border">
      <div
          class="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
          @pointerdown="onPointerDown"
          @pointermove.prevent="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
          @mouseenter="onHover(true)"
          @mouseleave="onHover(false)"
      >
        <!-- Slides track -->
        <div
            ref="track"
            class="flex transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)]"
            :style="trackStyle"
        >
          <article
              v-for="(r, i) in reviewsToShow"
              :key="r.id ?? i"
              class="shrink-0 basis-full px-4 py-8 grid place-items-center"
          >
            <!-- Card -->
            <div class="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 shadow-xl p-6 sm:p-8">
              <!-- Header area -->
              <div class="flex items-center gap-4">
                <div class="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-white/15 bg-gradient-to-br from-fuchsia-500/30 to-indigo-500/30 grid place-items-center">
                  <span v-if="!r.avatar" class="text-white/90 font-semibold">{{ initials(r.name) }}</span>
                  <img v-else :src="r.avatar" alt="" class="h-full w-full object-cover" />
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2 flex-wrap justify-between">
                    <h3 class="font-semibold text-white/95 truncate">{{ r.name }}</h3>
                    <span v-if="r.location" class="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/80">{{ r.location }}</span>
                  </div>
                  <div class="flex items-center gap-2 mt-1 text-xs text-white/60">
                    <div class="flex items-center gap-0.5" aria-hidden="true">
                      <svg v-for="i in 5" :key="i" viewBox="0 0 20 20" class="h-4 w-4"
                           :class="i <= Math.round(5) ? 'fill-yellow-400 text-yellow-400' : 'fill-white/20 text-white/20'">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.5 14.347a1 1 0 0 0-1.176 0l-2.887 2.124c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.803 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.246-3.292z"/>
                      </svg>
                    </div>
                    <span v-if="r.date" class="text-[11px]">{{ formatDate(r.date) }}</span>
                  </div>
                </div>
              </div>

              <!-- Body -->
              <blockquote class="mt-5 text-[15px] leading-relaxed text-white/90">
                <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 inline -translate-x-2 -translate-y-1 opacity-60 fill-current">
                  <path d="M7.17 6.17A5 5 0 0 1 12 11v7H4v-7a9 9 0 0 1 3.17-6.83zm10 0A5 5 0 0 1 22 11v7h-8v-7a9 9 0 0 1 3.17-6.83z"/>
                </svg>
                <span>{{ r.text }}</span>
              </blockquote>
            </div>
          </article>
        </div>

        <!-- Gradient glows -->
        <div class="pointer-events-none absolute inset-0 opacity-30" style="background:
          radial-gradient(800px 400px at 10% 10%, rgba(168,85,247,.18), transparent 60%),
          radial-gradient(600px 300px at 90% 20%, rgba(56,189,248,.15), transparent 60%),
          radial-gradient(700px 350px at 30% 90%, rgba(236,72,153,.15), transparent 60%);
        "></div>

        <!-- Controls -->
        <button
            class="group absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full grid place-items-center bg-black/30 hover:bg-black/50 border border-white/10 backdrop-blur shadow-md"
            @click="prev"
            aria-label="Previous review"
        >
          <svg class="h-5 w-5 text-white/90 group-active:translate-x-[-2px] transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
            class="group absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full grid place-items-center bg-black/30 hover:bg-black/50 border border-white/10 backdrop-blur shadow-md"
            @click="next"
            aria-label="Next review"
        >
          <svg class="h-5 w-5 text-white/90 group-active:translate-x-[2px] transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <!-- Dots -->
        <div class="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
          <button
              v-for="(r, i) in reviews"
              :key="'dot-'+(r.id ?? i)"
              class="h-2.5 w-2.5 rounded-full transition-all"
              :class="i === index ? 'bg-white/90 w-6' : 'bg-white/40 hover:bg-white/60'"
              @click="goTo(i)"
              :aria-label="'Go to slide ' + (i+1)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

// Props (runtime only)
const props = defineProps({
  reviews: { type: Array, default: () => [] },
  autoplay: { type: Boolean, default: true },
  interval: { type: Number, default: 4500 },
  pauseOnHover: { type: Boolean, default: true },
})

// Sample data if none provided
const fallback = [
  {
    id: 1,
    name: 'Jessica L.',
    location: 'Los Angeles, CA',
    rating: 5,
    date: '2025-08-10',
    text: 'Wow… reading this was like a mirror. 💫 I’ve been stuck in the same relationship patterns for YEARS, and suddenly it clicked — it’s my karmic lesson. Feels crazy but also sooo freeing.'
  },
  {
    id: 2,
    name: 'Michael R.',
    location: 'Austin, TX',
    rating: 5,
    date: '2025-08-14',
    text: 'Never thought I’d say this, but the “repeating cycles” part hit me hard. 😅 Always chasing the same type of job, same type of stress. Now I see it’s not random — it’s karma pushing me to change.'
  },
  {
    id: 3,
    name: 'Sophia A.',
    location: 'New York, NY',
    rating: 5,
    date: '2025-08-18',
    text: 'My karmic lesson showed up EXACTLY how I feel inside. 🕊️ Procrastination, fear of speaking up… reading it felt like the universe calling me out but with love. 🥹💜'
  },
  {
    id: 4,
    name: 'Daniel K.',
    location: 'Seattle, WA',
    rating: 4,
    date: '2025-08-21',
    text: 'I kept seeing 11:11 everywhere this week 🔮 then got this reading… and it literally mentioned karmic debt around trust. Like, okay Universe, I hear you 👀✨.'
  },
  {
    id: 5,
    name: 'Emily S.',
    location: 'Miami, FL',
    rating: 5,
    date: '2025-08-23',
    text: 'The way it described my lesson about setting boundaries 😭🔥 it’s EXACTLY what I’ve been journaling about. Feels less like “fortune telling” and more like soul reminders.'
  },
];

const reviews = computed(() => (props.reviews && props.reviews.length ? props.reviews : fallback))

// Carousel state
const index = ref(0)
const track = ref(null)
const width = ref(1)
const isHovering = ref(false)

// Swipe state
let startX = 0
let deltaX = 0
let dragging = false

const slidesCount = computed(() => reviews.value.length)

const trackStyle = computed(() => {
  const dxPercent = (deltaX / Math.max(width.value, 1)) * 100
  const base = -index.value * 100
  return { transform: `translateX(calc(${base}% + ${dxPercent}%))` }
})

function measure () {
  width.value = track.value?.clientWidth || 1
}

function next () { index.value = (index.value + 1) % slidesCount.value }
function prev () { index.value = (index.value - 1 + slidesCount.value) % slidesCount.value }
function goTo (i) { index.value = (i + slidesCount.value) % slidesCount.value }

function initials (name) {
  return (name || '')
      .split(/\s+/)
      .map(n => n.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase()
}

function formatDate (d) {
  if (!d) return ''
  try {
    const dt = new Date(d)
    if (!isNaN(dt.getTime())) return dt.toLocaleDateString()
    return d
  } catch { return d }
}

// Swipe handlers
function onPointerDown (e) {
  dragging = true
  startX = e.clientX
  deltaX = 0
  e.target?.setPointerCapture?.(e.pointerId)
}
function onPointerMove (e) {
  if (!dragging) return
  deltaX = e.clientX - startX
}
function onPointerUp () {
  if (!dragging) return
  const threshold = Math.max(40, width.value * 0.08)
  if (Math.abs(deltaX) > threshold) {
    if (deltaX < 0) next()
    else prev()
  }
  dragging = false
  startX = 0
  deltaX = 0
}

// Autoplay
let timer = null
function clearTimer () { if (timer) { window.clearInterval(timer); timer = null } }
function setupAutoplay () {
  clearTimer()
  if (!props.autoplay) return
  if (props.pauseOnHover && isHovering.value) return
  timer = window.setInterval(() => { next() }, Math.max(1500, props.interval))
}
function onHover (v) { isHovering.value = v; setupAutoplay() }

watch([() => props.autoplay, () => props.interval, isHovering], setupAutoplay)
watch(index, async () => { await nextTick() })

onMounted(() => { measure(); window.addEventListener('resize', measure); setupAutoplay() })
onBeforeUnmount(() => { clearTimer(); window.removeEventListener('resize', measure) })

const reviewsToShow = computed(() => reviews.value)
</script>

<style>
/* Animated border hue shift */
@keyframes borderHue { from { filter: hue-rotate(0deg) } to { filter: hue-rotate(360deg) } }
.animate-border { animation: borderHue 18s linear infinite; }
</style>
