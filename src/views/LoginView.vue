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

<script setup lang="ts">
import { login } from '@/api/login'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const loginData = reactive({
  username: '',
  password: '',
})

const router = useRouter()

const submit = () => {
  console.log('用户名:', loginData.username)
  console.log('密码:', loginData.password)

  login(loginData.username, loginData.password).then((res) => {
    console.log('登录成功:', res)
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

<style scoped>
.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-bg-3);
}

.login-card {
  width: 400px;
  border-radius: 10px;
}

.login-button {
  margin: 0 0.8rem 0 0;
}
</style>
