<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Cookies from "js-cookie";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth-store.js";

const status = ref("pending"); // "login" | "pending" | "confirmed" | "error"
const email = ref("");
const route = useRoute();
const auth = useAuthStore();
let intervalId = null;

const sessionEmail = Cookies.get("email");
const sessionId = computed(() => auth.user?.id);

if (!sessionEmail || !sessionId.value) {
  status.value = "login";
}

const startPolling = () => {
  intervalId = setInterval(async () => {
    try {
      const res = await auth.fetchMe(sessionId.value);
      if (res.ok) {
        status.value = "confirmed";
      }
    } catch (e) {
      status.value = "error";
      clearInterval(intervalId);
    }
  }, 3000);
};

const handleLogin = async () => {
  status.value = "pending"
  try {
    const res = await auth.login(email.value);
    if (res.ok) {
      Cookies.set("email", res.user.email);
      Cookies.set("user_id", res.user.id);
      startPolling();
    }
  } catch (e) {
    status.value = "error";
  }
};

onMounted(() => {
  if (status.value === "pending") {
    startPolling();
  }
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="relative z-10 flex items-center justify-center py-12 px-4">
    <div
        class="w-full max-w-xl rounded-3xl p-[1.5px] bg-gradient-to-r from-fuchsia-500/60 via-indigo-500/60 to-violet-500/60 animate-border"
    >
      <div
          class="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl text-center"
      >
        <h1
            class="text-3xl md:text-4xl font-semibold tracking-wide text-[#fff] mb-4"
        >
          🎉 Thank you for your purchase!
        </h1>

        <!-- ЛОГИН -->
        <div v-if="status === 'login'" class="mt-4">
          <p class="text-[#fff] mb-4">Please enter your email to continue:</p>
          <input
              v-model="email"
              type="email"
              placeholder="your@email.com"
              class="px-4 py-2 rounded-lg border border-gray-300 w-full mb-4"
          />
          <button
              @click="handleLogin"
              class="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            🔑 Login
          </button>
        </div>

        <!-- ОЖИДАНИЕ -->
        <div v-else-if="status === 'pending'" class="mt-2">
          <p class="animate-pulse text-[#fff]">
            ⏳ Checking your data...
          </p>
        </div>

        <!-- УСПЕХ -->
        <div v-else-if="status === 'confirmed'" class="mt-4 text-left">
          <p class="text-green-300 mb-6 text-center">
            ✅ Here are your reports:
          </p>

          <ul class="space-y-4">
            <li
                v-for="(report, idx) in auth.reports"
                :key="report.id"
                class="p-4 rounded-xl bg-white/10 text-white flex justify-between items-center"
            >
              <div>
                <p class="font-semibold">
                  Lesson {{ auth.reports.length - idx }}
                </p>
                <p class="text-sm text-gray-300">
                  Created: {{ new Date(report.created_at).toLocaleString() }}
                </p>
              </div>
              <span
                  class="font-bold text-[#fff] p-2 rounded-xl"
              >
                {{ !report.paid ? 'Unpaid' : 'Paid' }}
              </span>
              <router-link
                  :to="{name: 'result', params: {report_id: report.reportUuid}}"
                  class="font-bold text-[#fff] bg-green-600 p-2 rounded-xl"
              >
                Open lesson
              </router-link>
            </li>
          </ul>
        </div>

        <!-- ОШИБКА -->
        <div v-else class="mt-4 text-[#fff]">
          ❌ Something went wrong. Please contact support.
        </div>
      </div>
      <a
          href="https://t.me/ptash_enko"
          class="font-bold  block w-fit mx-auto my-10 cursor-pointer text-[#fff] bg-green-600 p-2 rounded-xl"
      >
        Chat with support
      </a>
    </div>
  </div>
</template>
