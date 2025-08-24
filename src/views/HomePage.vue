<template>
  <Transition name="fade-scale" mode="out-in">
    <!-- === Форма === -->
    <div v-if="store.step[store.step.length-1] ===  'form'">
      <form key="form" @submit.prevent="submitForm" class="space-y-5">
        <!-- Name -->
        <FormField label="Name">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70"
                 viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.761 0 5-2.462 5-5.5S14.761 1 12 1 7 3.462 7 6.5 9.239 12 12 12zm0 2c-4.418 0-8 2.91-8 6.5 0 .828.895 1.5 2 1.5h12c1.105 0 2-.672 2-1.5 0-3.59-3.582-6.5-8-6.5z"/>
            </svg>
          </template>
          <input v-model.trim="form.name" type="text" required class="field-input" placeholder="e.g., Diana" />
        </FormField>

        <!-- Birthdate -->
        <FormField label="Birthdate">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70"
                 viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 2a1 1 0 1 0 0 2h1v1h8V4h1a1 1 0 1 0 0-2H7zM4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7zm3 3h4v4H7v-4z"/>
            </svg>
          </template>
          <input v-model="form.date" type="date" required class="field-input" />
        </FormField>

        <!-- Country -->
        <FormField label="Country you were born in">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70"
                 viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.486 2 2 6.486 2 12c0 6.213 6.234 9.66 9.36 9.95.422.04.64-.186.64-.414v-2.1c-3.803.858-4.6-1.614-4.6-1.614-.384-.996-.94-1.263-.94-1.263-.768-.54.06-.53.06-.53.85.06 1.298.9 1.298.9.755 1.32 1.983.94 2.466.72.076-.56.296-.94.54-1.157-3.036-.346-6.228-1.548-6.228-6.892 0-1.522.53-2.766 1.398-3.74-.14-.346-.606-1.74.14-3.62 0 0 1.146-.37 3.76 1.43 1.09-.308 2.26-.462 3.42-.468 1.16.006 2.33.16 3.42.468 2.614-1.8 3.76-1.43 3.76-1.43.746 1.88.28 3.274.14 3.62.868.974 1.398 2.218 1.398 3.74 0 5.356-3.2 6.542-6.248 6.882.306.27.58.804.58 1.626v2.41c0 .232.216.458.646.414C15.77 21.66 22 18.21 22 12c0-5.514-4.486-10-10-10z"/>
            </svg>
          </template>
          <input v-model.trim="form.country" type="text" required class="field-input" placeholder="e.g., USA" />
        </FormField>

        <!-- Button -->
        <button type="submit" :disabled="!isFormValid"
                class="relative w-full py-3 rounded-2xl font-semibold tracking-wide
                       bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-violet-600
                       disabled:opacity-60 disabled:cursor-not-allowed
                       shadow-lg shadow-fuchsia-900/30 hover:shadow-indigo-900/40 transition-all">
          <span class="relative z-10">Get Your Reading</span>
          <span class="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <span class="absolute -inset-1 translate-x-[-120%] h-full w-1/3 rotate-12 bg-white/30 blur-md animate-shine"></span>
          </span>
        </button>
      </form>

      <Review class="mt-5" />
    </div>

    <!-- === Лоадер === -->
    <div v-else>
      <div class="flex flex-col items-center justify-center pb-14 space-y-6">
        <div ref="lottieContainer" class="w-70 h-70"></div>

        <div class="mx-auto w-full max-w-sm">
          <div class="relative rounded-2xl p-[1.5px] bg-gradient-to-r from-fuchsia-500/60 via-indigo-500/60 to-violet-500/60 animate-border">
            <div class="relative rounded-2xl bg-white/5 backdrop-blur-md px-5 py-4 overflow-hidden">
              <div class="pointer-events-none absolute -inset-16 blur-2xl animate-aurora"
                   style="background: conic-gradient(from 90deg, rgba(217,70,239,.12), rgba(99,102,241,.12), transparent 60%);"></div>

              <div class="flex items-center justify-center gap-2">
                <span class="relative flex h-3 w-3">
                  <span class="absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75 animate-ping-slow"></span>
                  <span class="relative inline-flex h-3 w-3 rounded-full bg-fuchsia-300"></span>
                </span>
                <p class="text-purple-100/90 text-base sm:text-lg text-center">{{ chantLine }}</p>
              </div>

              <div class="mt-4 relative h-2 rounded-full bg-white/10 overflow-hidden"
                   role="progressbar" aria-busy="true" aria-valuemin="0" aria-valuemax="100">
                <div class="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 via-white/0 to-violet-500/20 animate-glow"></div>
                <div class="h-full w-1/3 rounded-full bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-violet-400 animate-loader"></div>
                <div class="pointer-events-none absolute inset-0 -translate-x-full
                            bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)] animate-sheen"></div>
              </div>

              <div class="mt-2 text-center text-[11px] uppercase tracking-[0.22em] text-purple-200/70">
                establishing link • please wait
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {ref, watch, onBeforeUnmount, computed} from "vue";
import lottie from "lottie-web";
import sphereAnim from "@/assets/lottie-animations/sie.json";
import FormField from "@/components/FormField.vue";
import Review from "@/components/Review.vue";
import {sendHistory} from "@/api/services.js";
import {useMainStore} from "@/stores/main-store.js";
import {useRouter} from "vue-router";
import Cookies from "js-cookie";

const form = ref({name: "", date: "", country: ""});
const lottieContainer = ref(null);
const lottieInstance = ref(null);

const store = useMainStore();
const router = useRouter();

const chants = [
  "Linking to karma…",
  "Reading the stars…",
  "Opening past-life seals…",
  "Finding resonance…",
  "Translating fate…"
];
const chantLine = ref(chants[0]);
let chantTimer = null;

const isFormValid = computed(() =>
    form.value.name.trim().length >= 2 &&
    !!form.value.date &&
    form.value.country.trim().length >= 2
);

async function submitForm() {
  if (!isFormValid.value) return;
  store.setUuid();
  store.step.push('loading')
  startChantCycle();

  await sendHistory({
    uuid: store.userId,
    name: form.value.name,
    date_of_birth: form.value.date,
    country: form.value.country
  });

  stopChantCycle();
  router.push({name: "result", params: {user_id: store.userId}});

  store.step.push('result')
}

function startChantCycle() {
  let i = 0;
  chantTimer = setInterval(() => {
    i = (i + 1) % chants.length;
    chantLine.value = chants[i];
  }, 900);
}

function stopChantCycle() {
  if (chantTimer) {
    clearInterval(chantTimer);
    chantTimer = null;
  }
}

function destroyLottie() {
  if (lottieInstance.value) {
    lottieInstance.value.destroy();
    lottieInstance.value = null;
  }
}

watch(() => store.step, (val) => {
  if (val.includes('loading')) {
    setTimeout(() => {
      lottieInstance.value = lottie.loadAnimation({
        container: lottieContainer.value,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: sphereAnim
      });
    }, 500);
  } else {
    destroyLottie();
  }
},{deep: true});

onBeforeUnmount(() => {
  stopChantCycle();
  destroyLottie();
});
</script>

<style>
@reference 'tailwindcss';
/* Анимации переходов */
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all .35s ease;
}

.field-input { @apply w-full pl-11 pr-3 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-purple-300/60 focus:outline-none focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-400/30 transition; }

.fade-scale-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(.98);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(.98);
}
</style>
