import instance from './axios'

interface LoginResponse {
  username: string
  id: number
  role: string
  token: string
}

export const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const res = await instance.post('/api/login', { username, password })
  return res.data
}
