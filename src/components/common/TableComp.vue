<script setup lang="ts">
import { defaultDelete, defaultOption, type BaseResponse, type ListParamsType, type ListResponse } from '@/api/common'
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
import type { FilterOptType } from './type'

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
  filterGroup?: FilterOptType[] //后续可能会包含接口请求数据
  noConfirm?: boolean // 二次确认，默认启用
  noAdd?: boolean // 默认启用添加
  noEdit?: boolean // 默认启用编辑
  noDelete?: boolean // 默认启用删除
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

const loading = ref(false)

const getList = async (p?: ListParamsType) => {
  loading.value = true
  // 原写法，会产生类似？role= 空字符串情况
  // params.page = pagination.current
  // if (p) {
  //   Object.assign(params, p)
  // }
  // let res = await props.url(params)
  // if (res.data.list.length === 0 && (pagination.current as number) > 1) {
  //   pagination.current = 1
  //   params.page = pagination.current
  //   res = await props.url(params)
  // }

  // 改进写法，空字符串时不传
  // let valid = false
  // for (const key in p) {
  //   if (p[key as keyof ListParamsType] !== '') {
  //     valid = true
  //     break
  //   }
  // }
  // params.page = pagination.current
  // let x = { ...params }
  // if (valid) {
  //   Object.assign(x, p)
  // }
  // let res = await props.url(x)
  // if (res.data.list.length === 0 && (pagination.current as number) > 1) {
  //   pagination.current = 1
  //   params.page = pagination.current
  //   x = { ...params }
  //   res = await props.url(x)
  // }

  // 精简写法
  // 合并参数，排除空字符串值（因为后台不支持query传空字符串,后面改了能支持，写都写了）
  const mergedParams: ListParamsType = {
    ...params,
    ...Object.fromEntries(Object.entries(p || {}).filter(([, value]) => value !== '')),
    page: pagination.current,
  }

  // 获取数据
  let res = await props.url(mergedParams)
  if (res.data.list.length === 0 && (pagination.current as number) > 1) {
    pagination.current = 1
    mergedParams.page = 1
    res = await props.url(mergedParams)
  }

  data.list = res.data.list as TableData[]
  data.count = res.data.count
  pagination.total = res.data.count
  loading.value = false
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
const filter_group = ref<FilterOptType[]>([])
const initFilterGroup = async () => {
  if (!props.filterGroup) return
  for (let i = 0; i < props.filterGroup.length; i++) {
    const item = props.filterGroup[i]
    let source = <SelectOptionData[]>[]
    switch (typeof item.options) {
      case 'function':
        const res1 = await (item.options as (param?: unknown) => Promise<BaseResponse<SelectOptionData[]>>)()
        source = res1.data
        break
      case 'object':
        source = item.options as SelectOptionData[]
        break
      case 'string':
        // 不完全能用，待完善
        const res2 = await defaultOption(item.options as string)
        source = res2.data
        break
    }

    filter_group.value.push({
      label: item.label,
      value: i,
      column: item.column,
      options: source,
    })
  }
}
initFilterGroup()

const filterChange = (item: SelectOptionData, value: unknown) => {
  getList({ [item.column]: value })
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
      <div class="action-create" v-if="!props.noAdd">
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
        <a-popconfirm content="确定执行吗?" v-if="!props.noConfirm" @ok="actionMethod">
          <a-button type="primary" status="danger" v-if="actionValue || actionValue === 0">执行</a-button>
        </a-popconfirm>
        <template v-else>
          <a-button type="primary" status="danger" v-if="actionValue || actionValue === 0" @click="actionMethod"
            >执行</a-button
          >
        </template>
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
      <div class="action-filter" v-if="filter_group.length">
        <a-select
          allow-clear
          v-for="(item, index) in filter_group"
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
    <a-spin class="table-body" :loading="loading" tip="加载中...">
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
                  <slot name="action-left" :record="record"></slot>
                  <a-button size="small" type="primary" @click="edit(record)" v-if="!props.noEdit">编辑</a-button>
                  <slot name="action-middle" :record="record"></slot>
                  <a-popconfirm content="确定删除吗?" @ok="remove(record)" v-if="!props.noDelete">
                    <a-button size="small" type="primary" status="danger">删除</a-button>
                  </a-popconfirm>
                  <slot name="action-right" :record="record"></slot>
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
    </a-spin>
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
.action-filter {
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
  width: 100%;
}
.cell-action {
  display: flex;
  gap: 0.6rem;
}
</style>
