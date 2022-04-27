export interface IGeneralCanvasProps {
  hideUvwBound: boolean
  backgroundColor: string
}

export interface IAdvancedCanvasProps {
  toggleModeAction: boolean
  color: string
  width: number
}

export interface ICanvasProps {
  general: IGeneralCanvasProps
  advanced: IAdvancedCanvasProps
}
