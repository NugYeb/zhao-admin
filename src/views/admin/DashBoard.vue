<template>
  <div>
    <a-button type="primary" @click="goEdit">edit</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const route = useRouter()

const goEdit = () => {
  route.push({ name: 'article_edit' })
}
</script>

<style scoped></style>
