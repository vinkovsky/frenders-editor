import create from 'zustand'

import { IHistoryProps } from '@interfaces/history'
import { canvasTextureData } from '@utils/editor/canvasTextureData'

export const initialState: IHistoryProps = {
  past: [],
  present: null,
  future: [],
}

export const useHistoryStore = create((set) => ({
  data: initialState,
  api: {
    setInitHistory: ({ model, uvw }: any) => {
      let mapModel
      if (!uvw) {
        mapModel = canvasTextureData.map(({ value }) => {
          return {
            mapName: value,
            disabled: false,
            dataMap:
              value === 'normalMap'
                ? ['{"version":"4.3.1","objects":[],"background":"#8080ff"}']
                : ['{"version":"4.3.1","objects":[],"background":"#ffffff"}'],
            dirty: value === 'map',
          }
        })
      } else {
        mapModel = uvw.dataMaps.map((dataItem) => {
          return {
            mapName: dataItem.mapName,
            disabled: dataItem.disabled,
            dataMap: dataItem.dataMap,
            dirty: dataItem.dirty,
          }
        })
      }
      return set((state: any) => ({
        data: {
          ...state.data,
          present: {
            model,
            uvw: mapModel,
          },
        },
      }))
    },
    setUndoHistory: () =>
      set((state: any) => ({
        data: {
          past: state.data.past.slice(0, state.data.past.length - 1),
          present: state.data.past[state.data.past.length - 1],
          future: [state.data.present, ...state.data.future],
        },
      })),
    setRedoHistory: () =>
      set((state: any) => ({
        data: {
          past: [...state.data.past, state.data.present],
          present: state.data.future[0],
          future: state.data.future.slice(1),
        },
      })),
    setHistoryGeneralMaterial: ({ area, attr, value, name }: any) =>
      set((state: any) => {
        return {
          data: {
            past: [...state.data.past, state.data.present],
            present: {
              ...state.data.present,
              [area]: {
                ...state.data.present[area],
                modelItems: state.data.present[area].modelItems.map((item) => {
                  if (item.name === name) {
                    return {
                      ...item,
                      material: {
                        ...item.material,
                        [attr]: value,
                      },
                    }
                  } else {
                    return item
                  }
                }),
              },
            },
            future: [],
          },
        }
      }),
    setHistoryNormalMaterial: ({ area, attr, value, name }: any) =>
      set((state: any) => ({
        data: {
          ...state.data,
          past: [...state.data.past, state.data.present],
          present: {
            ...state.data.present,
            [area]: {
              ...state.data.present[area],
              modelItems: state.data.present[area].modelItems.map((item) => {
                if (item.name === name) {
                  return {
                    ...item,
                    material: {
                      ...item.material,
                      normalScale: {
                        ...item.material.normalScale,
                        [attr]: value,
                      },
                    },
                  }
                } else {
                  return item
                }
              }),
            },
          },
          future: [],
        },
      })),
    setHistoryModelTransform: ({ area, attr, value: { x, y, z } }: any) =>
      set((state: any) => {
        return {
          data: {
            ...state.data,
            past: [...state.data.past, state.data.present],
            present: {
              ...state.data.present,
              [area]: {
                ...state.data.present[area],
                [attr]: { x, y, z },
              },
            },
            future: [],
          },
        }
      }),
    setHistoryModelMap: ({ attr, value, name }: any) =>
      set((state: any) => {
        return {
          data: {
            ...state.data,
            past: [...state.data.past, state.data.present],
            present: {
              uvw: state.data.present.uvw.map((dataMapsItem) => {
                if (dataMapsItem.mapName === attr) {
                  return {
                    ...dataMapsItem,
                    disabled: !value,
                    dataMap: dataMapsItem.dataMap,
                  }
                } else {
                  return dataMapsItem
                }
              }),
              model: {
                ...state.data.present.model,
                modelItems: state.data.present.model.modelItems.map((item) => {
                  if (item.name === name) {
                    return {
                      ...item,
                      [attr]: value,
                    }
                  } else {
                    return item
                  }
                }),
              },
            },
            future: [],
          },
        }
      }),
    setHistoryFilters: ({ area, value, filter, activeObjects }) =>
      set((state: any) => ({
        data: {
          ...state.data,
          past: [...state.data.past, state.data.present],
          present: {
            ...state.data.present,
            [area]: activeObjects.map((activeObject) => {
              const activeFilter = activeObject.filters.find(
                (f) => f.type === filter
              )
              const filterArea =
                filter === 'HueRotation' ? 'rotation' : filter.toLowerCase()
              activeFilter[filterArea] = value
              return activeObject
            }),
          },
          future: [],
        },
      })),
    setHistoryUvwDataMap: ({ area, attr, value }: any) =>
      set((state: any) => {
        return {
          data: {
            ...state.data,
            past: [...state.data.past, state.data.present],
            present: {
              ...state.data.present,
              [area]: state.data.present[area].map((dataMapsItem) => {
                if (attr === dataMapsItem.mapName) {
                  return {
                    ...dataMapsItem,
                    dataMap: [value],
                    dirty: true,
                  }
                } else {
                  return {
                    ...dataMapsItem,
                    dirty: false,
                  }
                }
              }),
            },
            future: [],
          },
        }
      }),
  },
}))
