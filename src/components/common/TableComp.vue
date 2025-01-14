<script setup lang="ts">
import { defaultDelete, type ListParams, type ListResponse } from '@/api/common'
import { dateTimeFormat, relativeCurrentTime } from '@/utils/date'
import {
  Message,
  type PaginationProps,
  type TableColumnData,
  type TableData,
  type TableRowSelection,
} from '@arco-design/web-vue'
import { reactive, ref } from 'vue'

interface Props {
  url: (params: ListParams) => Promise<ListResponse<unknown>>
  columns: TableColumnData[]
  limit?: number
  rowKey?: string
  addLable?: string
  isDefaultDelete?: boolean
}
const props = defineProps<Props>()

const { limit = 12, rowKey = 'id', addLable = '添加', isDefaultDelete = true } = props

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

const emit = defineEmits(['add', 'edit', 'remove'])

const add = () => {
  emit('add')
}

const edit = (record: TableData) => {
  emit('edit', record)
}

const urlRegex = /return instance.get\("(.*?)",.*?\)/s

const remove = async (record: TableData) => {
  const id = record[rowKey]
  if (isDefaultDelete) {
    const result = urlRegex.exec(props.url.toString())
    if (result === null || result.length !== 2) {
      return
    }

    const res = await defaultDelete(result[1], [id])

    if (res.code) {
      Message.error(res.message)
      return
    }

    Message.success(res.message)
    refresh()
    return
  }
  emit('remove', [id])
}

const refresh = () => {
  getList()
}

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
        <a-button type="primary" @click="add">{{ addLable }}</a-button>
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
        <a-button @click="refresh"> <IconRefresh /></a-button>
      </div>
    </div>
    <div class="table-body">
      <a-table
        :row-key="rowKey"
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
              :title="item.title as string"
              :data-index="item.dataIndex"
              :ellipsis="item.ellipsis"
              :tooltip="item.tooltip"
            ></a-table-column>
            <a-table-column :title="item.title as string" v-else>
              <template #cell="{ record }" v-if="item.slotName === 'action'">
                <div class="cell-action">
                  <a-button size="small" type="primary" @click="edit(record)">编辑</a-button>
                  <a-popconfirm content="Are you sure you want to delete?" @ok="remove(record)">
                    <a-button size="small" type="primary" status="danger">删除</a-button>
                  </a-popconfirm>
                </div>
              </template>
              <template #cell="{ record }" v-else-if="item.slotName === 'created_at' || item.slotName === 'updated_at'">
                <span v-if="item.slotName === 'created_at'">{{ dateTimeFormat(record.created_at) }}</span>
                <span v-else>{{ relativeCurrentTime(record.updated_at) }}</span>
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
.cell-action {
  display: flex;
  gap: 0.6rem;
}
</style>
