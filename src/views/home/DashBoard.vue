<template>
  <a-button type="primary" @click="goLogin">login</a-button>
  <a-button type="primary" @click="goEdit">edit</a-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const goLogin = () => {
  router.push('/login')
}
const goEdit = () => {
  router.push('/edit')
}
</script>

<style scoped></style>
