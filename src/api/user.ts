import instance from './axios'
import type { BaseResponse } from './common'

export interface UserInfo {
  id: number
  username: string
  role: string
  nickname: string
  email: string
}

export const getUserList = (): Promise<BaseResponse<UserInfo[]>> => {
  return instance.get('/api/user')
}
