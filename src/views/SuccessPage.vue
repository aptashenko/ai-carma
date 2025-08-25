<script setup>
import {ref, onMounted, onUnmounted} from "vue";
import Cookies from "js-cookie";
import {getUsersHistory} from "@/api/services.js";

const status = ref("pending");

let intervalId = null;
const uuid = Cookies.get("user_id");

onMounted(() => {
  intervalId = setInterval(async () => {
    const { paid } = await getUsersHistory(uuid);
    if (paid) {
      status.value = "confirmed";
      clearInterval(intervalId);
    }
  }, 3000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="relative z-10 flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-xl rounded-3xl p-[1.5px] bg-gradient-to-r from-fuchsia-500/60 via-indigo-500/60 to-violet-500/60 animate-border">
      <div class="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl text-center">
        <h1 class="text-3xl md:text-4xl font-semibold tracking-wide text-[#fff] mb-4">
          🎉 Thank you for your purchase!
        </h1>

        <div v-if="status === 'pending'" class="mt-2">
          <p class="animate-pulse text-[#fff]">⏳ Confirming your payment...</p>
        </div>

        <div v-else-if="status === 'confirmed'" class="mt-4">
          <p class="text-green-300 mb-6">Your payment is confirmed.</p>
          <router-link
              :to="{name: 'result', params: {user_id: uuid}}"
              class="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            🚀 Go to your lessons
          </router-link>
        </div>

        <div v-else class="mt-4 text-[#fff]">
          ❌ Something went wrong. Please contact support.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

@keyframes slow-pan {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}
.animate-slow-pan {
  animation: slow-pan 16s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.5; }
}
.animate-twinkle {
  animation: twinkle 6s ease-in-out infinite;
}

@keyframes rainbow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
.animate-border {
  animation: rainbow 14s linear infinite;
}
</style>
