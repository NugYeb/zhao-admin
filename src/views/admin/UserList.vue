<script setup lang="ts">
import type { TableColumnData } from '@arco-design/web-vue'
import TableComp from '@/components/common/TableComp.vue'
import { getUserList } from '@/api/user'

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
</script>

<template>
  <div class="user-admin">
    <TableComp :url="getUserList" :columns="columns">
      <template #avatar="{ record }">
        <a-avatar :image-url="record.avatar"></a-avatar>
      </template>
      <template #role="{ record }">
        {{ record.role === 1 ? '管理者' : '普通用户' }}
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
