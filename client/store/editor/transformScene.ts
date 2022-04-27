import create from 'zustand'

import { ITransformToolsSceneProps } from '@interfaces/editor/transformScene'

const initialState: ITransformToolsSceneProps = {
  gridVisible: true,
  transformTool: 'select',
  show: false,
}

export const useTransformSceneStore = create((set) => ({
  data: initialState,
  api: {
    toggleGridVisible: (gridVisible: boolean) =>
      set((state: any) => ({
        data: {
          ...state.data,
          gridVisible,
        },
      })),
    changeTransformTool: (transformTool: string) =>
      set((state: any) => ({
        data: {
          ...state.data,
          transformTool,
        },
      })),
    toggleSceneFullscreen: (show: boolean) =>
      set((state: any) => ({
        data: {
          ...state.data,
          show,
        },
      })),
  },
}))
