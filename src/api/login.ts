import type { BaseResponse } from '@/type/api/common'
import instance from './axios'
import type { LoginReq, LoginRes } from '@/type/api/login'

export const login_in = (login_req: LoginReq): Promise<BaseResponse<LoginRes>> => {
  return instance.post('/api/login', login_req)
}
