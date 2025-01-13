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



