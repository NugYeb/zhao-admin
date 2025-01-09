<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.setTheme(themeStore.theme === 'dark' ? 'light' : 'dark')
}

const routes = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/dashboard',
    label: 'Dashboard',
    children: [
      {
        path: '/users',
        label: 'Users',
      },
      {
        path: '/articles',
        label: 'Articles',
      },
    ],
  },
]
</script>

<template>
  <div class="header">
    <a-space direction="vertical">
      <a-breadcrumb :routes="routes">
        <template #item-render="{ route, paths }">
          <a-link :href="paths.join('/')">
            {{ route.label }}
          </a-link>
        </template>
      </a-breadcrumb>
    </a-space>
    <div class="header-right">
      <a-button type="primary">Logout</a-button>
      <a-button type="primary" @click="toggleTheme">主题</a-button>
      <a-avatar trigger-type="mask">
        <img
          alt="avatar"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
        <template #trigger-icon>
          <IconEdit />
        </template>
      </a-avatar>
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
