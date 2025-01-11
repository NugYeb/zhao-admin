<script setup lang="ts">
import type { DataType } from '@/type/component/table'
import type {
  PaginationProps,
  TableColumnData,
  TableRowSelection,
} from '@arco-design/web-vue'
import { reactive, ref } from 'vue'

const props = defineProps<{
  columns: TableColumnData[]
  data: DataType[]
}>()

const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
})
const selectedKeys = ref([])

const pagination = <PaginationProps>{
  showTotal: true,
  showJumper: true,
  pageSize: 12,
}
</script>

<template>
  <div class="custom-table">
    <div class="table-header">
      <div class="item">
        <a-button type="primary">添加</a-button>
      </div>
      <div class="item">
        <a-select placeholder="操作"></a-select>
      </div>
      <div class="item">
        <a-input-search placeholder="搜索"></a-input-search>
      </div>
      <div class="item">
        <a-select placeholder="过滤"></a-select>
      </div>
      <div class="action"></div>
      <div class="refresh">
        <a-button> <IconRefresh /></a-button>
      </div>
    </div>
    <div class="table-body">
      <a-table
        row-key="id"
        :sticky-header="true"
        :pagination="pagination"
        :columns="props.columns"
        :data="props.data"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
      >
      </a-table>
    </div>
  </div>
</template>

<style scoped>
.table-header {
  display: flex;
  position: relative;
  justify-content: start;
  gap: 1rem;
  align-items: center;
}
.custom-table {
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.6rem;
  background: var(--color-bg-2);
}
.item {
  max-width: 10rem;
}
.refresh {
  position: absolute;
  right: 0;
  button {
    padding: 0;
    width: 2rem;
  }
}
/* .table-body {
  overflow-y: auto;
} */
</style>
