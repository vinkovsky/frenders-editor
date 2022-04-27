import { SelectAreaType } from '@interfaces/editor/index'

export type SelectZoneType = 'library' | 'project'

export interface IModelProps {
  id: string
  img: string | any
  title: string
  model: any
  size?: any
}

export interface ITextureProps {
  id: string
  img: string | any
  title: string
  size?: any
  active?: boolean
}

export interface IEnvProps {
  id: string
  img: string | any
  hdr: string | any
  title: string
  exposure: number
  size?: any
  active?: boolean
}

export interface IMaterialProps {
  id: string
  img: string | any
  title: string
  size?: any
}

export interface ILibraryProps {
  models: Array<IModelProps>
  textures: Array<ITextureProps>
  environments: Array<IEnvProps>
  materials: Array<IMaterialProps>
}

export interface ISelectedProps {
  selected: ILibraryProps
}

export interface ISettingsLibraryProps {
  selectedIndex: number
}

export interface IAssetProps {
  library: ILibraryProps & ISelectedProps & ISettingsLibraryProps
  project: ILibraryProps & ISelectedProps
}

export interface ICardAssetProps {
  zone: SelectZoneType
  area: SelectAreaType
  item: IModelProps | ITextureProps | IEnvProps | IMaterialProps
  active?: boolean
}
