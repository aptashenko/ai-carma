<script setup>
defineProps({ active: Boolean, label: String })
</script>

<template>
  <div class="flex flex-col items-center min-w-[70px]">
    <div :class="[
              'w-8 h-8 rounded-full grid place-items-center border',
              active ? 'bg-gradient-to-r from-fuchsia-500 to-violet-500 border-transparent shadow-lg shadow-fuchsia-900/40' : 'bg-white/5 border-white/15'
            ]">
      <span class="text-sm font-semibold">{{ active ? '✓' : '•' }}</span>
    </div>
    <div class="mt-1 text-[12px] tracking-wide text-purple-200/80">{{ label }}</div>
  </div>
</template>

<style scoped>

</style>
