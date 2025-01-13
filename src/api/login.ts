import instance from './axios'
import type { BaseResponse } from './common'

export interface LoginReq {
  username: string
  password: string
}
export interface LoginRes {
  token: string
}
export const loginIn = (
  login_req: LoginReq,
): Promise<BaseResponse<LoginRes>> => {
  return instance.post('/api/login', login_req)
}
