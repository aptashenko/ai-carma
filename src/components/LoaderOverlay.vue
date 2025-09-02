<!-- LoaderOverlay.vue -->
<template>
  <div class="absolute inset-0 flex items-center justify-center">
    <!-- затемнение + блюр -->
    <div class="absolute inset-0 backdrop-blur-md bg-black/50"></div>

    <!-- спиннер -->
    <div class="relative z-10 animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white"></div>
  </div>
</template>
