import create from 'zustand'
import { Group, Mesh } from 'three'
import { IObjectSceneProps } from '@interfaces/editor/objectScene'
import { IObjectSettingsProps } from '@interfaces/editor/objectScene'
import { canvasTextureData } from '@utils/editor/canvasTextureData'
import { fabricJSONData } from '@utils/editor/fabricJSONData'
const initialState: IObjectSceneProps = {
  initModelState: null,
  initDataMapsState: null,
  currentObjectScene: null,
  currentIndexObjectScene: -1,
  objectSettings: {},
  dataMaps: fabricJSONData,
  toggledMap: null,
  changedHistory: false,
  scene: null,
  canvas: null,
}
export const objectSettings = {
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  position: { x: 0, y: 0, z: 0 },
  locked: false,
}
export const useObjectSceneStore = create((set) => ({
  data: initialState,
  api: {
    general: {
      changeHistory: (data: any) => {
        set((state: any) => {
          return {
            data: {
              ...state.data,
              objectSettings: data.model,
              dataMaps: data.uvw,
            },
          }
        })
      },
      setModelSettings: (model: IObjectSettingsProps) =>
        set((state: any) => ({
          data: {
            ...state.data,
            objectSettings: model,
            initModelState: model,
          },
        })),
      setScene: (scene: any) =>
        set((state: any) => ({
          data: {
            ...state.data,
            scene,
          },
        })),
      setCanvas: (canvas: any) =>
        set((state: any) => ({
          data: {
            ...state.data,
            canvas,
          },
        })),
    },
    obj: {
      setToCurrentObject: (
        currentObjectScene: Mesh | Group | null,
        currentIndexObjectScene: number
      ) => {
        set((state: any) => ({
          data: {
            ...state.data,
            currentObjectScene,
            currentIndexObjectScene,
          },
        }))
      },
      toggleLockedObjectScene: (locked: boolean) =>
        set((state: any) => ({
          data: {
            ...state.data,
            objectSettings: {
              ...state.data.objectSettings,
              locked,
            },
          },
        })),
      toggleVisibleObjectScene: (visible: boolean) =>
        set((state: any) => ({
          data: {
            ...state.data,
            objectSettings: {
              ...state.data.objectSettings,
              visible,
            },
          },
        })),
      setTransformObjectScene: ({ area, coords }) =>
        set((state: any) => ({
          data: {
            ...state.data,
            objectSettings: {
              ...state.data.objectSettings,
              [area]: coords,
            },
          },
        })),
      setToDefaultObjectScene: () =>
        set((state: any) => ({
          data: {
            ...state.data,
            objectSettings: {
              ...state.data.objectSettings,
              rotation: state.data.initModelState.rotation,
              scale: state.data.initModelState.scale,
              position: state.data.initModelState.position,
              locked: state.data.initModelState.locked,
            },
          },
        })),
    },
    material: {
      toggleMapMaterial: ({ area, value }) => {
        set((state: any) => ({
          data: {
            ...state.data,
            objectSettings: {
              ...state.data.objectSettings,
              modelItems: state.data.objectSettings.modelItems.map((item) => {
                if (item.name === state.data.currentObjectScene?.name) {
                  return {
                    ...item,
                    [area]: value,
                  }
                } else {
                  return item
                }
              }),
            },
          },
        }))
      },
      setToggledMap: ({ value }) => {
        set((state: any) => ({
          data: {
            ...state.data,
            toggledMap: value,
          },
        }))
      },
      setModelMaterial: ({ area, value }) =>
        set((state: any) => ({
          data: {
            ...state.data,
            objectSettings: {
              ...state.data.objectSettings,
              modelItems: state.data.objectSettings.modelItems.map((item) => {
                if (item.name === state.data.currentObjectScene?.name) {
                  return {
                    ...item,
                    material: {
                      ...item.material,
                      [area]: value,
                    },
                  }
                } else {
                  return item
                }
              }),
            },
          },
        })),
      setNormalMaterial: ({ area, value }) =>
        set((state: any) => ({
          data: {
            ...state.data,
            objectSettings: {
              ...state.data.objectSettings,
              modelItems: state.data.objectSettings.modelItems.map((item) => {
                if (item.name === state.data.currentObjectScene?.name) {
                  return {
                    ...item,
                    material: {
                      ...item.material,
                      normalScale: {
                        ...item.material.normalScale,
                        [area]: value,
                      },
                    },
                  }
                } else {
                  return item
                }
              }),
            },
          },
        })),
      setToDefaultMaterialScene: () =>
        set((state: any) => ({
          data: {
            ...state.data,
            dataMaps: state.data.initDataMapsState,
            objectSettings: {
              ...state.data.objectSettings,
              modelItems: state.data.objectSettings.modelItems.map(
                (item, index) => {
                  if (item.name === state.data.currentObjectScene?.name) {
                    return {
                      ...item,
                      locked:
                        state.data.initModelState.modelItems[index].locked,
                      material:
                        state.data.initModelState.modelItems[index].material,
                      geometry:
                        state.data.initModelState.modelItems[index].geometry,
                      normalMap:
                        state.data.initModelState.modelItems[index].normalMap,
                      metalnessMap:
                        state.data.initModelState.modelItems[index]
                          .metalnessMap,
                      roughnessMap:
                        state.data.initModelState.modelItems[index]
                          .roughnessMap,
                    }
                  } else {
                    return item
                  }
                }
              ),
            },
          },
        })),
    },
    maps: {
      changeHistory: ({ value }) =>
        set((state: any) => ({
          data: {
            ...state.data,
            changedHistory: value,
          },
        })),
      initDataMap: (model: any) => {
        let mapModel
        if (!model) {
          mapModel = canvasTextureData.map(({ value }) => {
            return {
              mapName: value,
              disabled: false,
              dirty: true,
              dataMap:
                value === 'normalMap'
                  ? ['{"version":"4.3.1","objects":[],"background":"#8080ff"}']
                  : ['{"version":"4.3.1","objects":[],"background":"#ffffff"}'],
            }
          })
        } else {
          mapModel = model.dataMaps.map((dataItem) => {
            return {
              mapName: dataItem.mapName,
              disabled: dataItem.disabled,
              dirty: dataItem.dirty,
              dataMap: dataItem.dataMap,
            }
          })
        }
        set((state: any) => ({
          data: {
            ...state.data,
            initDataMapsState: mapModel,
            dataMaps: mapModel,
          },
        }))
      },
      setDisabledMap: ({ mapName, disabledMap }) =>
        set((state: any) => ({
          data: {
            ...state.data,
            dataMaps: state.data.dataMaps.map((dataMapsItem) => {
              if (dataMapsItem.mapName === mapName) {
                return {
                  ...dataMapsItem,
                  disabled: !disabledMap,
                  dataMap: dataMapsItem.dataMap,
                }
              } else {
                return dataMapsItem
              }
            }),
          },
        })),
      setDataMap: ({ mapName, dataMap }) =>
        set((state: any) => ({
          data: {
            ...state.data,
            dataMaps: state.data.dataMaps.map((dataMapsItem) => {
              if (mapName == dataMapsItem.mapName) {
                return {
                  ...dataMapsItem,
                  dirty: true,
                  dataMap: [dataMap],
                }
              } else {
                return { ...dataMapsItem, dirty: false }
              }
            }),
          },
        })),
    },
  },
}))
