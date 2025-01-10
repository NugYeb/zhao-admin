<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import BreadCrumb from '../common/BreadCrumb.vue'
import UserDrop from '../common/UserDrop.vue'

const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.setTheme(themeStore.theme === 'dark' ? 'light' : 'dark')
}
</script>

<template>
  <div class="header">
    <BreadCrumb />
    <div class="header-right">
      <a-button type="primary" @click="toggleTheme">主题</a-button>
      <UserDrop />
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 100%;
  background: var(--color-bg-2);
  border-radius: 0.6rem;
  padding: 0 0 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 2px var(--color-border-3);
}
.header-right {
  display: flex;
  align-items: center;
  padding: 0 1rem 0 0;
  gap: 1rem;
}
</style>
