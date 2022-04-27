import create from 'zustand'

import { SelectAreaType } from '@interfaces/editor'
import { IRendererProps } from '@interfaces/editor/renderer'

const initialState: IRendererProps = {
  isRayTracing: false,
  general: {
    transparentBackground: false,
    backgroundColor: '#000000',
    toneMapping: 'Linear',
  },
  advanced: {
    maxHardwareUsage: false,
    bounces: 3,
    renderWhenOffscreen: true,
  },
}

export const useRendererStore = create((set) => ({
  data: initialState,
  api: {
    switchRenderer: (isRayTracing: boolean) =>
      set((state: any) => ({
        data: {
          ...state.data,
          isRayTracing,
        },
      })),
    general: {
      toggleTransparentBackground: (transparentBackground: boolean) =>
        set((state: any) => ({
          data: {
            ...state.data,
            general: {
              ...state.data.general,
              transparentBackground,
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
      setToneMapping: (toneMapping: number) =>
        set((state: any) => ({
          data: {
            ...state.data,
            general: {
              ...state.data.general,
              toneMapping,
            },
          },
        })),
    },
    advanced: {
      toggleMaxHardwareUsage: (maxHardwareUsage: boolean) =>
        set((state: any) => ({
          data: {
            ...state.data,
            advanced: {
              ...state.data.advanced,
              maxHardwareUsage,
            },
          },
        })),
      setBounces: (bounces: number) =>
        set((state: any) => ({
          data: {
            ...state.data,
            advanced: {
              ...state.data.advanced,
              bounces,
            },
          },
        })),
      toggleRenderWhenOffscreen: (renderWhenOffscreen: boolean) =>
        set((state: any) => ({
          data: {
            ...state.data,
            advanced: {
              ...state.data.advanced,
              renderWhenOffscreen,
            },
          },
        })),
    },
    setToDefaultRenderer: (area: SelectAreaType) =>
      set((state: any) => ({
        data: {
          ...state.data,
          [area]: initialState[area],
        },
      })),
  },
}))
