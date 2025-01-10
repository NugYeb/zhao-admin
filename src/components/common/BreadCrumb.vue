<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <a-breadcrumb>
    <a-breadcrumb-item
      v-for="(r, index) in route.matched"
      :key="r.path || index"
      ><template v-if="index === 0">
        <IconHome />
      </template>
      <template v-else>
        {{ r.meta?.title }}
      </template>
      <!-- 下拉同级菜单，待实现 -->
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<style scoped></style>
