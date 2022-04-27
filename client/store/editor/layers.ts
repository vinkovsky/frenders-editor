import create from 'zustand'

import { ILayersUvwProps } from '@interfaces/editor/layers'

const initialState: ILayersUvwProps = {
  layersUvwData: {
    map: [
      {
        id: 'map',
        name: 'map',
        visible: undefined,
        locked: undefined,
        children: [],
      },
    ],
    roughnessMap: [
      {
        id: 'roughnessMap',
        name: 'roughnessMap',
        visible: undefined,
        locked: undefined,
        children: [],
      },
    ],
    metalnessMap: [
      {
        id: 'metalnessMap',
        name: 'metalnessMap',
        visible: undefined,
        locked: undefined,
        children: [],
      },
    ],
    normalMap: [
      {
        id: 'normalMap',
        name: 'normalMap',
        visible: undefined,
        locked: undefined,
        children: [],
      },
    ],
  },
}

export const useLayersUvwStore = create((set) => ({
  data: initialState,
  api: {
    initLayersUvwData: (dataMaps: any) => {
      const data = dataMaps.map((dataMap) => {
        return {
          [dataMap.mapName]: [
            {
              id: dataMap.mapName,
              name: dataMap.mapName,
              visible: undefined,
              locked: undefined,
              children: JSON.parse(dataMap.dataMap[0]).objects.map(
                (dataMapItem) => {
                  return {
                    id: dataMapItem.id,
                    name:
                      dataMapItem.type +
                      '_' +
                      dataMapItem.id.toString().slice(0, 3),
                    visible: dataMapItem.visible,
                    locked: dataMapItem.lockMovementX,
                  }
                }
              ),
            },
          ],
        }
      })
      set(() => ({
        data: {
          layersUvwData: { ...data[0], ...data[1], ...data[2], ...data[3] },
        },
      }))
    },
    setLayersUvwData: ({ mapName, fabricObjects, visible, locked }) => {
      set((state: any) => ({
        data: {
          layersUvwData: {
            ...state.data.layersUvwData,
            [mapName]: [
              {
                id: mapName,
                name: mapName,
                visible,
                locked,
                children: fabricObjects.map((fabricObjectsItem) => {
                  return {
                    id: fabricObjectsItem.id,
                    name:
                      fabricObjectsItem.type +
                      '_' +
                      fabricObjectsItem.id.toString().slice(0, 3),
                    visible: fabricObjectsItem.visible,
                    locked: fabricObjectsItem.lockMovementX,
                  }
                }),
              },
            ],
          },
        },
      }))
    },
  },
}))
