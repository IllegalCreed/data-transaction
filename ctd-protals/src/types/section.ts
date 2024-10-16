import type { Component } from 'vue'
export interface ISection {
  id: string
  label: string
  component: Component
  props: { [key: string]: any }
}
