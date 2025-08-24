<script setup>
import {onMounted, ref} from "vue";
import { useMainStore } from "@/stores/main-store.js";
import {getUsersHistory} from "@/api/services.js";
import {useRoute, useRouter} from "vue-router";

const store = useMainStore();
const route = useRoute()
const router = useRouter()
const history = ref(false);

const titles = {
  introduction: "✨ Introduction",
  main_karmic_lesson: "🌌 Main Karmic Lesson",
  repeating_patterns: "🔄 Repeating Patterns",
  strengths_and_talents: "💎 Strengths & Hidden Talents",
  life_transformation: "🌱 Life Transformation",
  practical_recommendations: "📌 Practical Recommendations",
  spiritual_practice: "🕉 Spiritual Practice",
  conclusion: "🌟 Conclusion",
};

function copyResult() {
  const fullText = store.order
      .map((key) => `${titles[key]}\n${store.orderedResult[key] || ""}`)
      .join("\n\n");
  navigator.clipboard?.writeText(fullText);
}

onMounted(async () => {
  if (route.params.user_id){
    try {
      history.value = await getUsersHistory(route.params.user_id);

      if (history.value?.result) {
        store.order.forEach((key) => {
          store.orderedResult[key] = history.value?.result[key] || "";
        });
      }
    } catch (error) {
      console.error(error)
      router.push({name: 'home'})
    }
  }
});
</script>

<template>
  <div class="space-y-6">
    <!-- Заголовок -->
    <div class="text-center">
      <h2
          class="text-3xl font-semibold text-transparent bg-clip-text
               bg-gradient-to-r from-fuchsia-300 via-indigo-300 to-violet-300"
      >
        🔮 Your Guidance
      </h2>
    </div>

    <!-- Контент -->
    <div
        class="bg-black/50 px-5 py-6 min-h-[60dvh] rounded-xl overflow-y-auto space-y-6"
    >
      <div
          v-for="(text, key, idx) in store.orderedResult"
          :key="key"
          class="relative space-y-2"
      >
        <h2 class="text-purple-300 text-lg font-bold tracking-wide">
          {{ titles[key] }}
        </h2>

        <!-- Текст -->
        <p
            class="font-sans text-white/90 text-[15px] leading-relaxed whitespace-pre-line transition duration-500"
            :class="{ 'blur-sm select-none pointer-events-none': idx !== 0 && !unlocked }"
        >
          {{ text }}
        </p>

        <!-- Замочек -->
        <div
            v-if="idx !== 0 && !history.paid"
            class="absolute inset-0 flex flex-col items-center justify-center rounded-lg"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 h-10 text-purple-300 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 11c.828 0 1.5.672 1.5 1.5v4.5a1.5 1.5 0 01-3 0v-4.5c0-.828.672-1.5 1.5-1.5zM6 11V7a6 6 0 1112 0v4h1a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h1z"
            />
          </svg>
          <a
              href="https://buymeacoffee.com/aptashenko/e/450049"
              class="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold hover:opacity-90 transition"
          >
            Read more
          </a>
        </div>
      </div>
    </div>

    <!-- Кнопки -->
    <div class="flex flex-col sm:flex-row gap-3">
      <button
          @click="copyResult"
          class="flex-1 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 transition font-semibold"
      >
        Copy All Text
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';


</style>
