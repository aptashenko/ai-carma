<script setup>
import { ref } from "vue";
import Step from "@/components/Step.vue";
import {useMainStore} from "@/stores/main-store.js";
const paymentError = ref(null);
const store = useMainStore();
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-black text-white">
    <!-- Анимированный фон -->
    <div class="pointer-events-none absolute inset-0">
      <div
          class="absolute inset-0 opacity-40 animate-slow-pan"
          style="background:
             radial-gradient(1200px 800px at 10% 10%, rgba(168,85,247,.25), transparent 60%),
             radial-gradient(900px 600px at 90% 20%, rgba(236,72,153,.18), transparent 60%),
             radial-gradient(1000px 700px at 30% 90%, rgba(56,189,248,.15), transparent 60%);
             filter: blur(30px);"
      ></div>
      <div
          class="absolute inset-0 opacity-30 mix-blend-screen animate-twinkle"
          style="background-image:
             radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.8), transparent 60%),
             radial-gradient(1.5px 1.5px at 70% 15%, rgba(255,255,255,.7), transparent 60%),
             radial-gradient(1.8px 1.8px at 80% 75%, rgba(255,255,255,.6), transparent 60%),
             radial-gradient(2px 2px at 35% 60%, rgba(255,255,255,.8), transparent 60%),
             radial-gradient(1.6px 1.6px at 55% 45%, rgba(255,255,255,.7), transparent 60%)"
      ></div>
    </div>

    <div class="relative z-10 flex items-center justify-center py-10 px-4">
      <!-- Карточка -->
      <div
          class="w-full max-w-2xl rounded-3xl p-[1.5px] bg-gradient-to-r from-fuchsia-500/60 via-indigo-500/60 to-violet-500/60 animate-border"
      >
        <div
            class="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 px-3 shadow-2xl"
        >
          <!-- Заголовок -->
          <div class="text-center mb-8">
            <h1
                class="text-2xl md:text-4xl font-semibold tracking-widest text-[#fff] bg-clip-text bg-gradient-to-r from-fuchsia-300 via-indigo-300 to-violet-300 drop-shadow"
            >
              ✨ Your Karmic Lessons
            </h1>
            <p class="mt-2 text-xs md:text-sm text-purple-200/80">
              Enter your birth details to discover your karmic lessons.
            </p>
          </div>

          <!-- Степпер -->
          <div class="mb-8">
            <div class="flex items-center gap-3">
              <Step :active="store.step.includes('form')" label="Your data" />
              <div
                  :class="[
                  'h-[2px] flex-1 rounded',
                  store.step.includes('form')
                    ? 'bg-white/10'
                    : 'bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-violet-400',
                ]"
              ></div>
              <Step :active="store.step.includes('loading') || store.step.includes('result')" label="Connection" />
              <div
                  :class="[
                  'h-[2px] flex-1 rounded',
                  step !== 'result'
                    ? 'bg-white/10'
                    : 'bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-violet-400',
                ]"
              ></div>
              <Step :active="store.step.includes('result')" label="Lesson" />
            </div>
          </div>

          <!-- Основной контент -->
          <router-view />

          <!-- Ошибка платежа -->
          <div v-if="paymentError" class="text-center text-red-400 mt-4">
            {{ paymentError }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@reference 'tailwindcss';
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.35s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

@keyframes slow-pan {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}
.animate-slow-pan {
  animation: slow-pan 16s ease-in-out infinite;
}
@keyframes twinkle {
  0%,
  100% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-twinkle {
  animation: twinkle 6s ease-in-out infinite;
}
@keyframes shine {
  0% {
    transform: translateX(-120%) rotate(12deg);
  }
  100% {
    transform: translateX(220%) rotate(12deg);
  }
}
.animate-shine {
  animation: shine 2.6s ease-in-out infinite;
}
@keyframes rainbow {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
.animate-border {
  animation: rainbow 14s linear infinite;
}
</style>
