<!-- components/LoadingCard.vue -->
<template>
  <div
      class="relative rounded-2xl p-[1.5px] bg-gradient-to-r from-fuchsia-500/60 via-indigo-500/60 to-violet-500/60 animate-border"
  >
    <div
        class="relative rounded-2xl bg-white/5 backdrop-blur-md px-5 py-4 overflow-hidden"
    >
      <!-- Glow -->
      <div
          class="pointer-events-none absolute -inset-16 blur-2xl animate-aurora"
          style="background: conic-gradient(from 90deg, rgba(217,70,239,.12), rgba(99,102,241,.12), transparent 60%);"
      ></div>

      <!-- Chant line -->
      <div class="flex items-center justify-center gap-2">
        <span class="relative flex h-3 w-3">
          <span
              class="absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75 animate-ping-slow"
          ></span>
          <span
              class="relative inline-flex h-3 w-3 rounded-full bg-fuchsia-300"
          ></span>
        </span>
        <p class="text-purple-100/90 text-base sm:text-lg text-center">
          {{ chant }}
        </p>
      </div>

      <!-- Progress bar -->
      <div
          class="mt-4 relative h-2 rounded-full bg-white/10 overflow-hidden"
          role="progressbar"
          aria-busy="true"
          aria-valuemin="0"
          aria-valuemax="100"
      >
        <div
            class="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 via-white/0 to-violet-500/20 animate-glow"
        ></div>
        <div
            class="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-violet-400 animate-loader"
            :style="{ width: progress + '%' }"
        ></div>
        <div
            class="pointer-events-none absolute inset-0 -translate-x-full
                        bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)] animate-sheen"
        ></div>
      </div>

      <!-- Subtext -->
      <div
          class="mt-2 text-center text-[11px] uppercase tracking-[0.22em] text-purple-200/70"
      >
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  chant: string;
  progress: number;
  subtitle?: string;
}>();
</script>
