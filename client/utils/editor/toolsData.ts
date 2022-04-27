import { IToolsDataSceneProps } from '@interfaces/editor/transformScene'

// Список инструментов трансформации
export const toolsData: IToolsDataSceneProps[] = [
  {
    icon: 'select',
    value: 'select',
    toolTipText: 'Select (Q)',
  },
  {
    icon: 'move',
    value: 'translate',
    toolTipText: 'Translate (W)',
  },
  {
    icon: 'rotate',
    value: 'rotate',
    toolTipText: 'Rotate (E)',
  },
  {
    icon: 'scale',
    value: 'scale',
    toolTipText: 'Scale (R)',
  },
]
