<script setup lang="ts">
import type { Menu } from '@/type/component/menu'
import { markRaw, ref } from 'vue'

import { MenuItem, SubMenu } from '@arco-design/web-vue'

import { IconApps, IconBug, IconBulb } from '@arco-design/web-vue/es/icon'

const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:collapsed'])

const menuData = ref<Menu[]>([
  {
    key: '1',
    name: '总览',
    path: '/',
    icon: markRaw(IconApps),
  },
  {
    key: '2',
    name: '用户管理',
    path: '/user',
    icon: markRaw(IconBug),
  },
  {
    key: '3',
    name: '文章管理',
    path: '/article',
    icon: markRaw(IconBulb),
    children: [
      {
        key: '3_0',
        name: '文章列表',
        path: '/article/list',
        icon: markRaw(IconBug),
      },
      {
        key: '3_1',
        name: '文章编辑',
        path: '/article/edit',
        icon: markRaw(IconBug),
      },
    ],
  },
])

const toggleCollapsed = () => {
  emit('update:collapsed', !props.collapsed)
}
</script>

<template>
  <div class="menu-demo">
    <a-menu
      showCollapseButton
      :collapsed="collapsed"
      @collapse="toggleCollapsed"
      theme="light"
    >
      <template v-for="item in menuData" :key="item.key">
        <component
          :is="item.children ? SubMenu : MenuItem"
          style="color: var(--color-text-1)"
        >
          <template #icon
            ><component
              :is="item.icon"
              style="color: var(--color-text-1)"
            ></component
          ></template>
          <template v-if="item.children" #title
            ><span style="color: var(--color-text-1)">{{
              item.name
            }}</span></template
          >
          <template v-if="!item.children">{{ item.name }}</template>

          <template v-if="item.children">
            <a-menu-item
              v-for="child in item.children"
              :key="child.key"
              style="color: var(--color-text-1)"
            >
              <template #icon>
                <component
                  :is="child.icon"
                  style="color: var(--color-text-1)"
                ></component>
              </template>
              {{ child.name }}
            </a-menu-item>
          </template>
        </component>
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
  width: 200px;
  height: 100%;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  border-radius: 0.6rem;
}

.menu-demo .arco-menu :deep(.arco-menu-collapse-button) {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.menu-demo
  .arco-menu:not(.arco-menu-collapsed)
  :deep(.arco-menu-collapse-button) {
  right: 0;
  bottom: 8px;
  transform: translateX(50%);
}

.menu-demo .arco-menu.arco-menu-collapsed {
  width: 48px;
  height: 100%;
  padding-top: 24px;
  padding-bottom: 138px;
  border-radius: 22px;
}

.menu-demo .arco-menu.arco-menu-collapsed :deep(.arco-menu-collapse-button) {
  right: 8px;
  bottom: 8px;
}
</style>
