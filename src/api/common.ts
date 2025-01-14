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
    total: number
  }
}

export interface ListParams {
  page?: number
  page_size?: number
  key?: string
  sort?: string
}

export const defaultDelete = <T>(url: string, id_list: T[]): Promise<BaseResponse<null>> => {
  return instance.delete(url, { data: { id_list } })
}
