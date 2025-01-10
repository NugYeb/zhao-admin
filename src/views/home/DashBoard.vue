<template>
  <div>
    <a-button type="primary" @click="goEdit">edit</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goEdit = () => {
  router.push('/edit')
}
</script>

<style scoped></style>
