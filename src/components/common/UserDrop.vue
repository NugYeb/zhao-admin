<script setup lang="ts">
import type { DropOptType } from './type'
import router from '@/router'

const handleSelect = (
  value: string | number | Record<string, unknown> | undefined,
) => {
  if (value === 'logout') {
    localStorage.removeItem('token')
    router.push({ name: 'login' })
    return
  }

  router.push({ name: value as string })
}

const options = <DropOptType[]>[
  {
    title: '个人信息',
    name: 'user',
  },
  {
    title: '系统信息',
    name: 'system',
  },
  {
    title: '退出登录',
    name: 'logout',
  },
]
</script>

<template>
  <a-dropdown @select="handleSelect" :popup-max-height="false" trigger="hover">
    <a-avatar trigger-type="mask">
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      />
      <template #trigger-icon>
        <IconUser />
      </template>
    </a-avatar>
    <template #content>
      <a-doption
        v-for="(item, index) in options"
        :key="index"
        :value="item.name"
        >{{ item.title }}</a-doption
      >
    </template>
  </a-dropdown>
</template>

<style scoped></style>
