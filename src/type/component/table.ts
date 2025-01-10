export interface Column {
  title: string
  dataIndex: string
  ellipsis?: boolean
  tooltip?: boolean
  width?: number
}

export interface DataItem {
  id: number
  username: string
  role: string
  nickname: string
  email: string
}
