<script setup lang="ts">
import TableComp from '@/components/common/TableComp.vue'
import type { Column, DataItem } from '@/type/component/table'
import { reactive } from 'vue'

const columns = <Column[]>[
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '角色',
    dataIndex: 'role',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
]

const data = reactive<DataItem[]>([
  {
    id: 1,
    username: 'admin',
    role: '管理员',
    nickname: '管理员',
    email: 'admin@example.com',
  },
  {
    id: 2,
    username: 'user',
    role: '普通用户',
    nickname: '普通用户',
    email: 'user@example.com',
  },
  {
    id: 3,
    username: 'guest',
    role: '游客',
    nickname: '游客',
    email: 'guest@example.com',
  },
  {
    id: 4,
    username: 'test',
    role: '测试用户',
    nickname: '测试用户',
    email: 'test@example.com',
  },
  {
    id: 5,
    username: 'dev',
    role: '开发人员',
    nickname: '开发人员',
    email: 'dev@example.com',
  },
])
</script>

<template>
  <div class="user-admin">
    <TableComp :columns="columns" :data="data" />
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
