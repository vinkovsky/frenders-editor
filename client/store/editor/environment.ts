import create from 'zustand'
import { TextureDataType } from 'three'

import { IEnvironmentProps } from '@interfaces/editor/environment'
import { IEnvProps } from '@interfaces/editor/assets'

const initialState: IEnvironmentProps = {
  initState: [],
  hdr: null,
  currentIndexEnvironment: 0,
  envs: [],
}

export const useEnvironmentStore = create((set) => ({
  data: initialState,
  api: {
    initEnvsData: (initData: any) =>
      set((state: any) => ({
        data: {
          ...state.data,
          envs: initData,
          initState: initData,
        },
      })),
    initEnvsSavedData: (initData: any) =>
      set((state: any) => ({
        data: {
          ...state.data,
          envs: initData.envs,
          initState: initData.initState,
        },
      })),
    setEnvironmentSettings: ({ area, value }) =>
      set((state: any) => ({
        data: {
          ...state.data,
          envs: state.data.envs.map((env, index) => {
            if (index === state.data.currentIndexEnvironment) {
              return {
                ...env,
                [area]: value,
              }
            } else {
              return env
            }
          }),
        },
      })),
    setCurrentEnvironment: (hdr: TextureDataType | null) =>
      set((state: any) => ({
        data: {
          ...state.data,
          hdr,
        },
      })),
    setCurrentIndexEnvironment: (currentIndexEnvironment: number) =>
      set((state: any) => ({
        data: {
          ...state.data,
          envs: state.data.envs.map((env, index) => {
            if (index === currentIndexEnvironment) {
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
          currentIndexEnvironment,
        },
      })),
    setAddEnvironments: (envs) =>
      set((state: any) => ({
        data: {
          ...state.data,
          envs: state.data.envs.concat(envs),
          initState: state.data.envs.concat(envs),
        },
      })),
    setDeleteEnvironments: (envs: Array<IEnvProps>) => {
      set((state: any) => ({
        data: {
          ...state.data,
          envs: state.data.envs.filter((data) => !envs.includes(data)),
          initState: state.data.envs.filter((data) => !envs.includes(data)),
        },
      }))
    },
    setToDefaultEnvironment: () =>
      set((state: any) => ({
        data: {
          ...state.data,
          envs: state.data.envs.map((env, index) => {
            if (index === state.data.currentIndexEnvironment) {
              return state.data.initState[state.data.currentIndexEnvironment]
            } else {
              return env
            }
          }),
        },
      })),
  },
}))
