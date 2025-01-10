<script setup lang="ts">
import type { Column, DataItem } from '@/type/component/table'
import type { TableRowSelection } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'

const props = defineProps<{
  columns: Column[]
  data: DataItem[]
}>()

const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
})

const selectedKeys = ref([1, 2])
</script>

<template>
  <a-table
    row-key="id"
    :columns="props.columns"
    :data="props.data"
    :row-selection="rowSelection"
    :class="'custom-table'"
    v-model:selectedKeys="selectedKeys"
  />
</template>

<style scoped>
.custom-table {
  width: 100%;
  height: auto;
  padding: 1rem;
  border-radius: 0.6rem;
  background: var(--color-bg-2);
}
</style>
