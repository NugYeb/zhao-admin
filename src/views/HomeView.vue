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
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  height: 100%;
  width: 100%;
  gap: 1rem;
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
  background: var(--color-bg-2);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 2px var(--color-border-3);
}

.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  height: calc(100vh - 3rem);
}
</style>
