import { ReactNode } from 'react'

export interface IDragHandlerProps {
  title: ReactNode
}

export type SelectAreaType =
  | 'general'
  | 'advanced'
  | 'models'
  | 'textures'
  | 'environments'
  | 'materials'

export interface ITransformProps {
  x: number
  y: number
  z?: number
}
