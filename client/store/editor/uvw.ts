import create from 'zustand'

import { IUvwProps } from '@interfaces/editor/uvw'

const initialState: IUvwProps = {
  fabricCanvas: null,
  cacheCanvas: null,
  drawingCanvas: null,
  activeCanvas: 0,
  isFirstLoad: true,
  canvasTextures: [],
}

export const useUvwStore = create((set) => ({
  data: initialState,
  api: {
    setFabricCanvas: (fabricCanvas: any) =>
      set((state: any) => ({
        data: {
          ...state.data,
          fabricCanvas,
        },
      })),
    setCacheCanvas: (cacheCanvas: any) =>
      set((state: any) => ({
        data: {
          ...state.data,
          cacheCanvas,
        },
      })),
    setDrawingCanvas: (drawingCanvas: any) =>
      set((state: any) => ({
        data: {
          ...state.data,
          drawingCanvas,
        },
      })),
    setActiveCanvas: (activeCanvas: number) =>
      set((state: any) => ({
        data: {
          ...state.data,
          activeCanvas,
        },
      })),
    setIsFirstLoad: (isFirstLoad: boolean) =>
      set((state: any) => ({
        data: {
          ...state.data,
          isFirstLoad,
        },
      })),
    setCanvasTextures: (canvasTextures: Array<any>) =>
      set((state: any) => ({
        data: {
          ...state.data,
          canvasTextures,
        },
      })),
  },
}))
