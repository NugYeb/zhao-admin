<script setup lang="ts">
import BreadCrumb from '../common/BreadCrumb.vue'
import UserDrop from '../common/UserDrop.vue'
import ThemeComp from '../common/ThemeComp.vue'
</script>

<template>
  <div class="header">
    <BreadCrumb />
    <div class="header-right">
      <ThemeComp />
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
