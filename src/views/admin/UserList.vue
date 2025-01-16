<script setup lang="ts">
import { Message, type SelectOptionData, type TableColumnData } from '@arco-design/web-vue'
import TableComp from '@/components/common/TableComp.vue'
import { getUserList, type UserInfo } from '@/api/user'
import type { FilterOptType } from '@/components/common/type'
import { ref } from 'vue'

const columns = <TableColumnData[]>[
  { title: 'ID', dataIndex: 'id' },
  { title: '用户名', dataIndex: 'username' },
  { title: '头像', slotName: 'avatar' },
  { title: '昵称', dataIndex: 'nickname' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '角色', slotName: 'role' },
  { title: '注册时间', slotName: 'created_at' },
  { title: '更新时间', slotName: 'updated_at' },
  { title: '操作', slotName: 'action' },
]

const actionGroup = <SelectOptionData[]>[
  {
    label: '批量拉黑',
    callback: async (id_list: (number | string)[]): Promise<boolean> => {
      Message.success(`这只是个测试 ${id_list}`)
      return true
    },
  },
]

const filterGroup = <FilterOptType[]>[
  {
    label: '角色过滤',
    column: 'role',
    options: [
      {
        label: '管理员',
      },
      {
        label: '普通用户',
      },
    ],
  },
]

const visible = ref(false)

const add = () => {
  console.log('add')
  visible.value = true
}
const edit = (record: UserInfo) => {
  console.log(record)
}
const remove = <T,>(id_list: T[]) => {
  console.log(id_list)
}
</script>

<template>
  <a-modal title="创建用户" v-model:visible="visible"></a-modal>
  <div class="user-admin">
    <TableComp
      addLable="添加用户"
      :url="getUserList"
      :limit="6"
      :columns="columns"
      :action-group="actionGroup"
      :filter-group="filterGroup"
      @add="add"
      @edit="edit"
      @remove="remove"
    >
      <template #avatar="{ record }">
        <a-avatar :image-url="record.avatar"></a-avatar>
      </template>
      <template #role="{ record }">
        {{ record.role === 1 ? '管理者' : '用户' }}
      </template>
    </TableComp>
  </div>
</template>

<style scoped>
.user-admin {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}
</style>
