<script setup lang="ts">
import { defaultDelete, type ListParamsType, type ListResponse } from '@/api/common'
import { dateTimeFormat, relativeCurrentTime } from '@/utils/date'
import {
  Message,
  type PaginationProps,
  type SelectOptionData,
  type TableColumnData,
  type TableData,
  type TableRowSelection,
} from '@arco-design/web-vue'
import type { SelectOptionValue } from '@arco-design/web-vue/es/select/interface'
import { reactive, ref } from 'vue'

interface Props {
  url: (params: ListParamsType) => Promise<ListResponse<unknown>>
  columns: TableColumnData[]
  limit?: number
  rowKey?: string
  addLable?: string
  customDelete?: boolean // 默认不启用自定义删除
  noActionGroup?: boolean // 默认启用操作组
  noCheckbox?: boolean // 默认启用复选框
  actionGroup?: SelectOptionData[]
}
const props = defineProps<Props>()
const { limit = 10, rowKey = 'id', addLable = '添加', customDelete = false, noActionGroup = false } = props

const data = reactive({
  list: [] as TableData[],
  count: 0,
})
const params = reactive<ListParamsType>({
  page: 1,
  limit: limit,
})
const pagination = reactive(<PaginationProps>{
  showTotal: true,
  showJumper: true,
  pageSize: limit,
  total: 0,
  defaultCurrent: 1,
})

const getList = async () => {
  params.page = pagination.current
  const res = await props.url(params)
  data.list = res.data.list as TableData[]
  data.count = res.data.count
  pagination.total = res.data.count
}
getList()
const pageChange = (page: number) => {
  pagination.current = page
  getList()
}

const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
})
const selectedKeys = ref<(string | number)[]>([])

//==================================================================================
//= 操作组
//= action group
const actionOptions = ref<SelectOptionData[]>([{ label: '批量删除', value: 0 }])
const initActionGroup = () => {
  if (!props.actionGroup) return
  for (let i = 0; i < props.actionGroup.length; i++) {
    actionOptions.value.push({
      label: props.actionGroup[i].label,
      value: i + 1,
      callback: props.actionGroup[i].callback,
    })
  }
}
initActionGroup()
const actionValue = ref<SelectOptionValue>()
const actionMethod = () => {
  console.log(actionValue.value)
  if (actionValue.value === 0) {
    if (selectedKeys.value.length === 0) {
      Message.warning('请选择要删除的数据')
      return
    }
    removeIdData(selectedKeys.value)
    return
  }
  const action = actionOptions.value[actionValue.value as number]
  console.log(action)
  if (!action.callback) return
  action.callback(selectedKeys.value).then((res: boolean) => {
    if (res) {
      getList()
      selectedKeys.value = []
    }
  })
}

//==================================================================================
//= 过滤
//= filter
const filterGroup = ref([
  {
    label: '角色过滤',
    column: 'role',
    value: 0,
    options: [
      {
        label: '管理员',
        value: 1,
      },
      {
        label: '普通用户',
        value: 2,
      },
    ],
  },
])
const filterChange = (item: unknown, value: unknown) => {
  console.log(item, value)
}

//==================================================================================
//= 默认操作
//= default action
const emit = defineEmits(['add', 'edit', 'remove'])
const add = () => emit('add')
const edit = (record: TableData) => emit('edit', record)
const urlRegex = /return instance.get\("(.*?)",.*?\)/s
const remove = async (record: TableData) => {
  const id = record[rowKey]
  removeIdData([id])
  emit('remove', [id])
}
const removeIdData = async (id_list: (number | string)[]) => {
  if (!customDelete) {
    const result = urlRegex.exec(props.url.toString())
    if (result === null || result.length !== 2) {
      Message.error('前端内部错误：获取默认删除接口失败')
      return
    }
    const res = await defaultDelete(result[1], id_list)
    if (res.code) {
      Message.error(`操作失败：${res.message}`)
      return
    }
    Message.success(`操作成功：${res.message}`)
    getList()
    return
  }
}
const search = () => {
  pagination.current = 1
  getList()
}

const refresh = () => {
  getList()
  Message.success('数据刷新成功')
}
</script>

<template>
  <div class="custom-table">
    <div class="table-header">
      <div class="action-create">
        <a-button type="primary" @click="add">{{ addLable }}</a-button>
      </div>
      <div class="action-group" v-if="!noActionGroup">
        <a-select
          allow-clear
          placeholder="操作"
          style="min-width: 8rem"
          :options="actionOptions"
          v-model="actionValue"
        ></a-select>
        <a-button type="primary" status="danger" v-if="actionValue || actionValue === 0" @click="actionMethod"
          >执行</a-button
        >
      </div>
      <div class="action-search">
        <a-input-search
          placeholder="搜索"
          v-model="params.keyword"
          @keydown.enter="search"
          @search="search"
        ></a-input-search>
      </div>
      <slot name="action-other-search"></slot>
      <div class="action-filter" v-if="filterGroup.length">
        <a-select
          allow-clear
          v-for="(item, index) in filterGroup"
          :options="item.options"
          :placeholder="item.label"
          :key="index"
          @change="filterChange(item, $event)"
        ></a-select>
      </div>
      <slot name="action-slot"></slot>
      <div class="action-refresh">
        <a-button @click="refresh"> <IconRefresh /></a-button>
      </div>
    </div>
    <div class="table-body">
      <a-table
        :row-key="rowKey"
        :pagination="pagination"
        :columns="props.columns"
        :data="data.list"
        :row-selection="props.noCheckbox ? undefined : rowSelection"
        v-model:selectedKeys="selectedKeys"
        @page-change="pageChange"
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
  align-items: center;
  gap: 1rem;
  padding-right: 3rem;
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
.action-group {
  display: flex;
  gap: 1rem;
}
.action-refresh {
  position: absolute;
  right: 0;
  button {
    padding: 0;
    width: 2rem;
  }
}
.table-body {
  flex: 1;
  padding: 0 0 0.1rem 0;
  overflow-y: auto;
}
.cell-action {
  display: flex;
  gap: 0.6rem;
}
</style>
