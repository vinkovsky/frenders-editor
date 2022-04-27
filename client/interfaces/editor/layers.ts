export interface RenderTree {
  id: string
  name: string
  visible?: boolean
  locked?: boolean
  children?: RenderTree[]
}

export interface ILayersUvwProps {
  layersUvwData: Record<any, Array<RenderTree>>
}
