export interface IGeneralRendererProps {
  transparentBackground: boolean
  backgroundColor: string
  toneMapping: string
}

export interface IAdvancedRendererProps {
  maxHardwareUsage: boolean
  bounces: number
  renderWhenOffscreen: boolean
}

export interface IRendererProps {
  isRayTracing: boolean
  general: IGeneralRendererProps
  advanced: IAdvancedRendererProps
}
