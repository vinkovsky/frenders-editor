import create from 'zustand'

import { IObjectUvwProps } from '@interfaces/editor/objectUvw'

const initialState: IObjectUvwProps = {
  initState: [],
  activeObjects: [],
}

export const useObjectUvwStore = create((set) => ({
  data: initialState,
  api: {
    obj: {
      setInitSettingsActiveObject: (activeObjects: Array<any>) =>
        set((state: any) => ({
          data: {
            ...state.data,
            initState: state.data.initState.concat(activeObjects),
          },
        })),
      setActiveObjects: (activeObjects: Array<any>) =>
        set((state: any) => ({
          data: {
            ...state.data,
            activeObjects,
          },
        })),
      toggleLockedObjectUvw: (locked: boolean) =>
        set((state: any) => ({
          data: {
            ...state.data,
            activeObjects: state.data.activeObjects.map((activeObject) => {
              return activeObject.set({
                ...activeObject,
                lockMovementX: locked,
                lockMovementY: locked,
                lockRotation: locked,
                lockScalingX: locked,
                lockScalingY: locked,
                lockScalingFlip: locked,
                hasControls: !locked,
                hasBorders: !locked,
              })
            }),
          },
        })),
      toggleVisibleObjectUvw: (visible: boolean) =>
        set((state: any) => ({
          data: {
            ...state.data,
            activeObjects: state.data.activeObjects.map((activeObject) => {
              return activeObject.set({
                ...activeObject,
                visible,
              })
            }),
          },
        })),
      setTransformObjectUvw: ({ area, value }) =>
        set((state: any) => ({
          data: {
            ...state.data,
            activeObjects: state.data.activeObjects.map((activeObject) => {
              return activeObject.set({
                ...activeObject,
                [area]: value,
              })
            }),
          },
        })),
      setFilters: (value: any) =>
        set((state: any) => ({
          data: {
            ...state.data,
            activeObjects: state.data.activeObjects.map((activeObject) => {
              return activeObject.set({
                ...activeObject,
                filters: value,
              })
            }),
          },
        })),
      setValueFilters: ({ area, value }) =>
        set((state: any) => ({
          data: {
            ...state.data,
            activeObjects: state.data.activeObjects.map((activeObject) => {
              const activeFilter = activeObject.filters.find(
                (filter) => filter.type === area
              )
              const filterArea =
                area === 'HueRotation' ? 'rotation' : area.toLowerCase()
              activeFilter[filterArea] = value
              return activeObject
            }),
          },
        })),
      setToDefaultObjectUvw: () =>
        set((state: any) => ({
          data: {
            ...state.data,
            activeObjects:
              state.data.activeObjects.length === 1
                ? state.data.activeObjects.map((activeObject) => {
                    const currentObject = state.data.initState.find(
                      (obj) => obj.id === activeObject.id
                    )
                    return activeObject.set({ ...currentObject })
                  })
                : state.data.activeObjects.map((activeObject, index) => {
                    return activeObject.set({ ...state.data.initState[index] })
                  }),
          },
        })),
    },
  },
}))
