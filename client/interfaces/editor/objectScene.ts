import { Group, Mesh } from 'three'
import { ITransformProps } from '@interfaces/editor/index'

export type TransformAreaType = 'position' | 'rotation' | 'scale'
export type MaterialAreaType =
  | 'metalness'
  | 'roughness'
  | 'normal'
  | 'visible'
  | 'color'

export interface IObjectSettingsProps {
  id: number
  position: ITransformProps
  rotation: ITransformProps
  scale: ITransformProps
  modelItems: IMaterialSettingsProps
  visible: boolean
  locked: boolean
  name: string
}

export interface IMaterialSettingsProps {
  id: number
  material: any
  geometry: any
  map: boolean
  metalnessMap: boolean
  roughnessMap: boolean
  normalMap: boolean
}

export interface IDataMapProps {
  mapName: string
  disabled: boolean
  dataMap: Array<any>
}

export interface IObjectSceneProps {
  initModelState: any
  initDataMapsState: any
  currentObjectScene: Mesh | Group | null
  currentIndexObjectScene: number
  objectSettings: any
  dataMaps: Array<IDataMapProps>
  toggledMap: null | string
  changedHistory: boolean
  scene: any
  canvas: any
}
