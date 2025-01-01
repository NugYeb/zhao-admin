import axios from 'axios'
import { Message } from '@arco-design/web-vue'

const instance = axios.create({
  baseURL: '', // 替换为你的 API 基础 URL
  timeout: 20000, // 请求超时时间
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    Message.error(`请求错误: ${error.message}`)
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    if (response.status === 200) {
      console.log(response.data)
      return response.data
    }
    // 如果状态码不是200，则弹出错误信息
    Message.error(`请求失败，状态码：${response.status}`)
    return Promise.reject(new Error(`请求失败，状态码：${response.status}`))
  },
  (error) => {
    // 对响应错误做些什么
    if (error.response && error.response.status === 401) {
      // 例如，处理未授权错误，重定向到登录页面
      console.error('未授权，请重新登录')
      Message.error('未授权，请重新登录')
    }
    return Promise.reject(error)
  },
)

export default instance
