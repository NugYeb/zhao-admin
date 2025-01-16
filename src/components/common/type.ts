import type { SelectOptionData } from '@arco-design/web-vue'

export interface DropOptType {
  title: string
  name: string
}

export interface FilterOptType {
  label: string
  value?: number
  column: string
  options: SelectOptionData[]
}
