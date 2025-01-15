import instance from './axios'
import type { ListParamsType, ListResponse } from './common'

export interface UserInfo {
  id: number
  role: string
  username: string
  nickname: string
  email: string
  works: number
  avatar: string
  created_at: string
  updated_at: string
}

export interface UserUpdateReq {
  role: number
  nickname: string
  email: string
  avatar: string
}

export const getUserList = (
  params: ListParamsType,
): Promise<ListResponse<UserInfo>> => {
  return instance.get('/api/user', { params })
}
