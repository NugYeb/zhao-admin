<script setup lang="ts">
import AsideMenu from '@/components/home/AsideMenu.vue'
import HeaderComp from '@/components/home/HeaderComp.vue'
import { ref } from 'vue'
const isCollapsed = ref(true)
</script>
<template>
  <div class="home">
    <aside
      :class="{
        'collapsed-width': isCollapsed,
        'expanded-width': !isCollapsed,
      }"
    >
      <AsideMenu v-model:collapsed="isCollapsed" />
    </aside>
    <div class="container">
      <header>
        <HeaderComp />
      </header>
      <main>
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 1rem 2rem 1rem 1rem;
  justify-content: center;
  align-items: center;
}

aside {
  width: 14.5rem;
  height: calc(100vh - 2rem);
}

.collapsed-width {
  width: 5rem;
}

.expanded-width {
  width: 13rem;
}

header {
  height: 4rem;
}

main {
  flex: 1;
  border-radius: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  height: calc(100vh - 3rem);
}

/*  组件刚开始离开 */
/* .fade-leave-active {
} */
/* 组件离开结束 */
.fade-leave-to {
  transform: translateX(2rem);
  opacity: 0;
}
/* 组件刚开始进入 */
.fade-enter-active {
  transform: translateX(-2rem);
  opacity: 0;
}
/* 组件进入结束 */
.fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}
/* 正在进入和离开 */
.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s ease-out;
}
</style>
