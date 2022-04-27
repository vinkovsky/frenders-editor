import { IconType } from '@ui/ToggleButton/ToggleButton'

export interface ITransformToolsSceneProps {
  gridVisible: boolean
  transformTool: string
  show: boolean
}

export interface IToolsDataSceneProps {
  icon: IconType
  value: string
  toolTipText: string
}
