import axios from 'axios'
import { Message } from '@arco-design/web-vue'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:7456',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Message.error(`请求错误: ${error.message}`)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    }
    return Promise.reject(response)
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          Message.error('请求错误，请检查参数')
          console.error(
            `请求错误，状态码：${error.response.status}`,
            error.response.data,
          )
          break
        case 401:
          Message.error('未授权，请重新登录')
          console.error(
            `未授权，请重新登录，状态码：${error.response.status}`,
            error.response.data,
          )
          break
        case 402:
          Message.error('请求错误，请检查参数')
          console.error(
            `请求错误，请检查参数，状态码：${error.response.status}`,
            error.response.data,
          )
          break
        case 403:
          Message.error('拒绝访问')
          console.error(
            `拒绝访问，状态码：${error.response.status}`,
            error.response.data,
          )
          break
        case 404:
          Message.error('请求错误，未找到该资源')
          console.error(
            `请求错误，未找到该资源，状态码：${error.response.status}`,
            error.response.data,
          )
          break
        case 500:
          Message.error('服务器错误，请联系管理员')
          console.error(
            `服务器错误，请联系管理员，状态码：${error.response.status}`,
            error.response.data,
          )
          break
        case 503:
          Message.error('服务不可用，请稍后再试')
          console.error(
            `服务不可用，请稍后再试，状态码：${error.response.status}`,
            error.response.data,
          )
          break
        case 504:
          Message.error('网关超时，请稍后再试')
          console.error(
            `网关超时，请稍后再试，状态码：${error.response.status}`,
            error.response.data,
          )
          break
        case 505:
          Message.error('HTTP版本不受支持')
          console.error(
            `HTTP版本不受支持，状态码：${error.response.status}`,
            error.response.data,
          )
        default:
          Message.error(`请求失败，状态码：${error.response.status}`)
      }
    } else {
      Message.error('未知错误')
      console.error(`未知错误: ${error.response.status}`, error.message)
    }
    return Promise.reject(error)
  },
)

export default instance
