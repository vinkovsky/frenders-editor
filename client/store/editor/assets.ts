import create from 'zustand'

import {
  IAssetProps,
  IEnvProps,
  IMaterialProps,
  IModelProps,
  ITextureProps,
} from '@interfaces/editor/assets'

export const initialState: IAssetProps = {
  library: {
    selectedIndex: 0,
    models: [],
    textures: [],
    environments: [],
    materials: [],
    selected: {
      models: [],
      textures: [],
      environments: [],
      materials: [],
    },
  },
  project: {
    models: [],
    textures: [],
    environments: [],
    materials: [],
    selected: {
      models: [],
      textures: [],
      environments: [],
      materials: [],
    },
  },
}

export const useAssetsStore = create((set) => ({
  data: initialState,
  api: {
    initProjectPresetData: (presetData: any) => {
      set((state: any) => ({
        data: {
          ...state.data,
          project: {
            ...state.data.project,
            environments: presetData.environments,
            textures: presetData.textures,
          },
        },
      }))
    },
    initLibraryData: (libraryCards, textures, environments, materials) => {
      set((state: any) => ({
        data: {
          ...state.data,
          library: {
            ...state.data.library,
            models: libraryCards,
            textures: textures,
            environments: environments,
            materials: materials,
          },
        },
      }))
    },
    initProjectData: (projectAssetsData: any) => {
      set((state: any) => ({
        data: {
          ...state.data,
          project: {
            ...state.data.project,
            models: projectAssetsData.models,
            textures: projectAssetsData.textures,
            environments: projectAssetsData.environments.envs,
            materials: projectAssetsData.materials,
          },
        },
      }))
    },
    changeActiveEnvironmentIndex: (currentIndex: number) => {
      set((state: any) => ({
        data: {
          ...state.data,
          project: {
            ...state.data.project,
            environments: state.data.project.environments.map((env, index) => {
              if (index === currentIndex) {
                return {
                  ...env,
                  active: true,
                }
              } else {
                return {
                  ...env,
                  active: false,
                }
              }
            }),
          },
        },
      }))
    },
    setSelectedIndex: (selectedIndex: number) =>
      set((state: any) => ({
        data: {
          ...state.data,
          library: {
            ...state.data.library,
            selectedIndex,
          },
        },
      })),
    selectedItemAsset: ({ zone, area, item }) =>
      set((state: any) => ({
        data: {
          ...state.data,
          [zone]: {
            ...state.data[zone],
            selected: {
              ...state.data[zone].selected,
              [area]: Array.from(
                new Set(state.data[zone].selected[area].concat([item]))
              ),
            },
          },
        },
      })),
    unSelectedItemAsset: ({ zone, area, item }) =>
      set((state: any) => ({
        data: {
          ...state.data,
          [zone]: {
            ...state.data[zone],
            selected: {
              ...state.data[zone].selected,
              [area]: state.data.library.selected[area].filter(
                (i) => i.id !== item.id
              ),
            },
          },
        },
      })),
    addSelectedAsset: () =>
      set((state: any) => ({
        data: {
          ...state.data,
          library: {
            ...state.data.library,
            selected: initialState.library.selected,
          },
          project: {
            ...state.data.project,
            models: Array.from(
              new Set(
                state.data.project.models.concat(
                  state.data.library.selected.models
                )
              )
            ),
            textures: Array.from(
              new Set(
                state.data.project.textures.concat(
                  state.data.library.selected.textures
                )
              )
            ),
            environments: Array.from(
              new Set(
                state.data.project.environments.concat(
                  state.data.library.selected.environments
                )
              )
            ),
            materials: Array.from(
              new Set(
                state.data.project.materials.concat(
                  state.data.library.selected.materials
                )
              )
            ),
          },
        },
      })),
    deleteSelectedAsset: () =>
      set((state: any) => ({
        data: {
          ...state.data,
          project: {
            ...state.data.project,
            models: state.data.project.models.filter(
              (model: IModelProps) =>
                state.data.project.selected.models.indexOf(model) === -1
            ),
            textures: state.data.project.textures.filter(
              (texture: ITextureProps) =>
                state.data.project.selected.textures.indexOf(texture) === -1
            ),
            environments: state.data.project.environments.filter(
              (env: IEnvProps) =>
                state.data.project.selected.environments.indexOf(env) === -1
            ),
            materials: state.data.project.materials.filter(
              (material: IMaterialProps) =>
                state.data.project.selected.materials.indexOf(material) === -1
            ),
            selected: initialState.project.selected,
          },
        },
      })),
    addLoadTexture: (texture: any) =>
      set((state: any) => ({
        data: {
          ...state.data,
          project: {
            ...state.data.project,
            textures: Array.from(
              new Set(
                state.data.project.textures.concat({
                  ...texture,
                })
              )
            ),
          },
        },
      })),
  },
}))
