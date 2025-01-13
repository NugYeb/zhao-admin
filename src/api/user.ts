import instance from './axios'
import type { ListParams, ListResponse } from './common'

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

export const getUserList = (
  params: ListParams,
): Promise<ListResponse<UserInfo>> => {
  return instance.get('/api/user', { params })
}
