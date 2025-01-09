import type { Component } from "vue"

export interface MenuType {
  title: string
  name: string
  path: string
  icon: Component
  children?: MenuType[]
}
