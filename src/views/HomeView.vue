<script setup lang="ts">
import AsideMenu from '@/components/home/AsideMenu.vue'
import HeaderComp from '@/components/home/HeaderComp.vue';
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
        主体

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
  padding: 1rem;
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
  width: 14.5rem;
}

header {
  height: 4rem;
  border-radius: 0.6rem;
}

main {
  flex: 1;
  border-radius: 0.6rem;
}

.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  height: calc(100vh - 3rem);
}
</style>
