<script setup>

</script>

<template>
  <button @click="$emit('click')"
          class="px-3 py-1.5 rounded-full text-[12px] bg-white/5 hover:bg-white/10 border border-white/10 text-purple-100/90 transition">
    <slot/>
  </button>
</template>

<style scoped>

</style>
