import create from 'zustand'

import { ILayoutEditorProps } from '@interfaces/editor/layout'
import { getFromLS } from '@helpers/viewport/getFromLS'

const originalLayouts = getFromLS('layouts') || {}

const initialState: ILayoutEditorProps = {
  openLeftPanel: false,
  openRightPanel: false,
  savedLayout: {
    layouts: JSON.parse(JSON.stringify(originalLayouts)),
  }
}

export const useLayoutStore = create((set) => ({
  data: initialState,
  api: {
    toggleOpenLeftPanel: (openLeftPanel: boolean) =>
      set((state: any) => ({
        data: {
          ...state.data,
          openLeftPanel,
        },
      })),
    toggleOpenRightPanel: (openRightPanel: boolean) =>
      set((state: any) => ({
        data: {
          ...state.data,
          openRightPanel,
        },
      })),
    changeSavedLayout: (savedLayout: object) =>
      set((state: any) => ({
        data: {
          ...state.data,
          savedLayout,
        },
      })),
  },
}))
