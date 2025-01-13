<script setup lang="ts">
import type { ListParams, ListResponse } from '@/api/common'
import type { PaginationProps, TableColumnData, TableData, TableRowSelection } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'

interface Props {
  url: (params: ListParams) => Promise<ListResponse<unknown>>
  columns: TableColumnData[]
}
const props = defineProps<Props>()

const data = reactive({
  list: [] as TableData[],
  total: 0,
})

const getList = async () => {
  const res = await props.url({})
  console.log(res)
  data.list = res.data.list as TableData[]
  data.total = res.data.total
}
getList()

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
        :pagination="pagination"
        :columns="props.columns"
        :data="data.list"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
      >
        <template #columns>
          <template v-for="(item, index) in props.columns" :key="index">
            <a-table-column v-if="item.render" :title="item.title as string">
              <template #cell="data">
                <component :is="item.render(data)"></component>
              </template>
            </a-table-column>
            <a-table-column
              v-else-if="!item.slotName"
              :title="(item.title as string)"
              :data-index="item.dataIndex"
              :ellipsis="item.ellipsis"
              :tooltip="item.tooltip"
            ></a-table-column>
            <a-table-column :title="item.title as string" v-else>
              <template #cell="{ record }" v-if="item.slotName === 'action'">
                <div class="cell-action">
                  <a-button size="small" type="primary">编辑</a-button>
                  <a-button size="small" type="primary" status="danger">删除</a-button>
                </div>
              </template>
              <template #cell="{ record }" v-else-if="item.slotName === 'created_at' || item.slotName === 'updated_at'">
                <span>自定义时间</span>
              </template>
              <template #cell="{ record }" v-else>
                <slot :name="item.slotName" :record="record"></slot>
              </template>
            </a-table-column>
          </template>
        </template>
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
  gap: 1rem;
  flex-direction: column;
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
.table-body {
  flex: 1;
  padding: 0 0 1rem 0;
  overflow-y: auto;
}
.cell-action{
  display: flex;
  gap: 0.6rem;
}
</style>
