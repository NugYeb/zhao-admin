<script setup lang="ts">
import type { MenuType } from '@/type/component/menu'
import { markRaw, ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  IconHome,
  IconUser,
  IconBook,
  IconList,
  IconEdit,
} from '@arco-design/web-vue/es/icon'
import router from '@/router'
import IconComp from '../common/IconComp.vue'

const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['update:collapsed'])
const toggleCollapsed = () => {
  emit('update:collapsed', !props.collapsed)
}

const menuData = ref<MenuType[]>([
  {
    title: '总览',
    name: 'dashboard',
    icon: markRaw(IconHome),
  },
  {
    title: '用户管理',
    name: 'user',
    icon: markRaw(IconUser),
  },
  {
    title: '文章管理',
    name: 'article',
    icon: markRaw(IconBook),
    children: [
      {
        title: '文章列表',
        name: 'article_list',
        icon: markRaw(IconList),
      },
      {
        title: '文章编辑',
        name: 'article_edit',
        icon: markRaw(IconEdit),
      },
    ],
  },
  {
    title: '系统设置',
    name: 'system',
    icon: 'iconfont zew-shezhi1-copy',
  },
])

const menuItemClick = (name: string) => {
  router.push({ name: name })
}

const route = useRoute()

const openKeys = ref<string[]>([])
const initComp = () => {
  if (route.matched.length === 3) {
    openKeys.value = [route.matched[1].name as string]
  }
}
initComp()
</script>

<template>
  <div class="menu-demo">
    <a-menu
      show-collapse-button
      :collapsed="collapsed"
      :selected-keys="[route.name]"
      v-model:open-keys="openKeys"
      @collapse="toggleCollapsed"
      @menu-item-click="menuItemClick"
    >
      <template v-for="item in menuData">
        <a-menu-item :key="item.name" v-if="!item.children">
          <template #icon><IconComp :is="item.icon"></IconComp></template>
          <span>{{ item.title }}</span>
        </a-menu-item>
        <a-sub-menu v-if="item.children" :key="item.name">
          <template #icon><IconComp :is="item.icon"></IconComp></template>
          <template #title>
            <span>{{ item.title }}</span>
          </template>
          <a-menu-item :key="sub.name" v-for="sub in item.children">
            <template #icon><IconComp :is="sub.icon"></IconComp></template>
            <span>{{ sub.title }}</span>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<style scoped>
.menu-demo {
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
}

.menu-demo .arco-menu {
  width: 11rem;
  height: 100%;
  box-shadow: 0 0 2px var(--color-border-3);
  border-radius: 0.6rem;
}

.menu-demo .arco-menu :deep(.arco-menu-collapse-button) {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

.menu-demo
  .arco-menu:not(.arco-menu-collapsed)
  :deep(.arco-menu-collapse-button) {
  right: 0;
  bottom: 0.5rem;
  transform: translateX(50%);
}

.menu-demo .arco-menu.arco-menu-collapsed {
  width: 3rem;
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 4rem;
  border-radius: 1rem;
}

.menu-demo .arco-menu.arco-menu-collapsed :deep(.arco-menu-collapse-button) {
  right: 0.5rem;
  bottom: 0.5rem;
}
</style>
