<template>
  <a-button type="primary" @click="goLogin">login</a-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const goLogin = () => {
  router.push('/login')
}
</script>

<style scoped></style>
