import create from 'zustand'

import { ICameraProps } from '@interfaces/editor/camera'

export const initialStateForReset: ICameraProps = {
  cameraPosition: { x: 0, y: 150, z: 270 },
  targetPosition: { x: 0, y: 0, z: 0 },
  fov: 70,
  locked: false,
}

export const initialState: ICameraProps = {
  initState: null,
  cameraPosition: { x: 0, y: 150, z: 270 },
  targetPosition: { x: 0, y: 0, z: 0 },
  fov: 70,
  locked: false,
}

export const useCameraStore = create((set) => ({
  data: initialState,
  api: {
    initDataCamera: (dataCamera: ICameraProps) =>
      set(() => ({
        data: {
          initState: dataCamera,
          cameraPosition: dataCamera.cameraPosition,
          targetPosition: dataCamera.targetPosition,
          fov: dataCamera.fov,
          locked: dataCamera.locked,
        },
      })),
    toggleLockedCamera: (locked: boolean) => {
      set((state: any) => ({
        data: {
          ...state.data,
          locked,
        },
      }))
    },
    setTransformCamera: ({ area, coords }) => {
      set((state: any) => ({
        data: {
          ...state.data,
          [area]: coords,
        },
      }))
    },
    setFovCamera: (fov: number) =>
      set((state: any) => ({
        data: {
          ...state.data,
          fov,
        },
      })),
    setToDefaultCamera: () =>
      set(() => ({
        data: initialStateForReset,
      })),
  },
}))
