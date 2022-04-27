import create from 'zustand'

// import { SelectAreaType } from '@interfaces/editor'
import { ICanvasProps } from '@interfaces/editor/canvas'

const initialState: ICanvasProps = {
  general: {
    hideUvwBound: false,
    backgroundColor: '#ffffff',
  },
  advanced: {
    toggleModeAction: false,
    color: '#000000',
    width: 1,
  },
}

export const useCanvasStore = create((set) => ({
  data: initialState,
  api: {
    general: {
      toggleHideUvwBound: (hideUvwBound: boolean) =>
        set((state: any) => ({
          data: {
            ...state.data,
            general: {
              ...state.data.general,
              hideUvwBound,
            },
          },
        })),
      setBackgroundColor: (backgroundColor: string) =>
        set((state: any) => ({
          data: {
            ...state.data,
            general: {
              ...state.data.general,
              backgroundColor,
            },
          },
        })),
    },
    advanced: {
      toggleMode: (toggleModeAction: boolean) =>
        set((state: any) => ({
          data: {
            ...state.data,
            advanced: {
              ...state.data.advanced,
              toggleModeAction,
            },
          },
        })),
      setColor: (color: string) =>
        set((state: any) => ({
          data: {
            ...state.data,
            advanced: {
              ...state.data.advanced,
              color,
            },
          },
        })),
      setWidth: (width: number) =>
        set((state: any) => ({
          data: {
            ...state.data,
            advanced: {
              ...state.data.advanced,
              width,
            },
          },
        })),
    },
    // setToDefaultCanvas: (area: SelectAreaType) =>
    //   set((state: any) => ({
    //     data: {
    //       ...state.data,
    //       [area]: initialState[area],
    //     },
    //   })),
  },
}))
