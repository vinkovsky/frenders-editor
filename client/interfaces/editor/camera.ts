import { ITransformProps } from '@interfaces/editor'

export type TransformAreaCameraType = 'cameraPosition' | 'targetPosition'

export interface ICameraProps {
  initState?: any
  cameraPosition: ITransformProps
  targetPosition: ITransformProps
  fov: number
  locked: boolean
}
