import instance from './axios'

export interface BaseResponse<T> {
  code: number
  message: string
  data: T
}

export interface ListResponse<T> {
  code: number
  message: string
  data: {
    list: T[]
    count: number
  }
}

export interface ListParamsType {
  page?: number
  limit?: number
  keyword?: string
  sort?: string
}

export const defaultDelete = <T>(url: string, id_list: T[]): Promise<BaseResponse<null>> => {
  return instance.delete(url, { data: { id_list } })
}
