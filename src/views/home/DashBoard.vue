<template>
  <a-button type="primary" @click="goLogin">login</a-button>
  <a-button>Secondary</a-button>
  <a-button type="dashed">Dashed</a-button>
  <a-button type="outline">Outline</a-button>
  <a-button type="text">Text</a-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const goLogin = () => {
  router.push('/login')
}
</script>

<style scoped></style>
