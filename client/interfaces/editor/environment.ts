import { TextureDataType } from 'three'
import { IEnvProps } from '@interfaces/editor/assets'

export type EnvironmentAreaType = 'exposure'

export interface IEnvironmentProps {
  initState: Array<IEnvProps>
  hdr: TextureDataType | null
  currentIndexEnvironment: number
  envs: Array<IEnvProps>
}
