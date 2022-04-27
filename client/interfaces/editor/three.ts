import { HTMLAttributes, ReactNode } from 'react'
import { CanvasProps } from 'react-three-fiber'

export interface ContainerProps
  extends CanvasProps,
    HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}
