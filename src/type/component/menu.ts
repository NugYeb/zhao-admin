import type { Component } from 'vue'

export interface MenuType {
  title: string
  name: string
  icon: Component | string
  children?: MenuType[]
}

export interface DropOptType {
  title: string
  name: string
}
