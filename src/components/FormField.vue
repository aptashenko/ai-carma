<script setup>
defineProps({
  label: {
    type: String,
    required: false
  },
  hint: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div>
    <!-- Label -->
    <label v-if="label"
           class="block text-xs uppercase tracking-wider text-white/80 mb-2">
      {{ label }}
    </label>

    <!-- Field wrapper -->
    <div class="relative group">
      <!-- Icon -->
      <div class="absolute left-3 top-1/2 -translate-y-1/2 text-purple-200/80 pointer-events-none">
        <slot name="icon" />
      </div>

      <!-- Input / Slot -->
      <slot />

      <!-- Focus ring -->
      <div class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10
                  group-focus-within:ring-fuchsia-400/50 group-hover:ring-white/20 transition"></div>
    </div>

    <!-- Hint -->
    <p v-if="hint" class="mt-1 text-[11px] text-purple-300/70">{{ hint }}</p>
  </div>
</template>
