import create from 'zustand'

import { IInitDataProps } from '@interfaces/editor/initData'
import { IUserDataProps } from '@interfaces/auth'
import { ISavedCardProps } from '@interfaces/dashboard'

const initialState: IInitDataProps = {
  initDataCard: null,
  initDataUser: null,
}

export const useInitDataStore = create((set) => ({
  data: initialState,
  api: {
    setInitDataCard: (initDataCard: ISavedCardProps) =>
      set((state: any) => ({
        data: {
          ...state.data,
          initDataCard,
        },
      })),
    setInitDataUser: (initDataUser: IUserDataProps) =>
      set((state: any) => ({
        data: {
          ...state.data,
          initDataUser,
        },
      })),
  },
}))
