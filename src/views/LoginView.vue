<script setup lang="ts">
import { loginIn } from '@/api/login'
import { Message } from '@arco-design/web-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const loginData = reactive({
  username: 'admin',
  password: '123456',
})

const router = useRouter()

const submit = () => {
  loginIn(loginData).then((res) => {
    Message.success('登录成功')
    localStorage.setItem('token', res.data.token)
    goAdmin()
  })
}

const reset = () => {
  loginData.username = ''
  loginData.password = ''
}

const goAdmin = () => {
  router.push('/')
}
</script>

<template>
  <div class="login-box">
    <a-card class="login-card" bordered>
      <template #title>
        <h3>登录</h3>
      </template>
      <a-form :model="loginData">
        <a-form-item label="用户名" field="username">
          <a-input v-model="loginData.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="密码" field="password">
          <a-input-password
            v-model="loginData.password"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="submit" class="login-button"
            >登录</a-button
          >
          <a-button @click="reset" class="login-button">重置</a-button>
          <a-button type="primary" @click="goAdmin" class="login-button"
            >admin</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-bg-1);
}

.login-card {
  width: 400px;
  border-radius: 10px;
}

.login-button {
  margin: 0 0.8rem 0 0;
}
</style>
