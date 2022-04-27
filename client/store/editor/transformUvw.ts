import create from 'zustand'

import { ITransformToolsUvwProps } from '@interfaces/editor/transformUvw'

const initialState: ITransformToolsUvwProps = {
  gridSnap: true,
  show: false,
}

export const useTransformUvwStore = create((set) => ({
  data: initialState,
  api: {
    toggleGridSnap: (gridSnap: boolean) =>
      set((state: any) => ({
        data: {
          ...state.data,
          gridSnap,
        },
      })),
    toggleUvwFullscreen: (show: boolean) =>
      set((state: any) => ({
        data: {
          ...state.data,
          show,
        },
      })),
  },
}))
