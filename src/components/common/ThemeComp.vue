<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
</script>

<template>
  <IconSunFill
    v-if="themeStore.theme === 'dark'"
    @click="themeStore.setTheme('light')"
  >
  </IconSunFill>
  <IconMoonFill
    v-if="themeStore.theme === 'light'"
    @click="themeStore.setTheme('dark')"
  >
  </IconMoonFill>
</template>

<style scoped></style>
