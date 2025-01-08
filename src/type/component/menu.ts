import type { Component } from "vue"

export interface Menu {
  key: string
  name: string
  path: string
  icon: Component
  children?: Menu[]
}
