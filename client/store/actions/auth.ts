import { IUserDataProps, IAvatarProps } from '@interfaces/auth'
import { ICardProps } from '@interfaces/dashboard'
import * as ACTION_TYPES from '../types/auth'

export const requestAuth = () => {
  return {
    type: ACTION_TYPES.REQUEST_AUTH,
  }
}

export const authSuccess = (value: any) => {
  return {
    type: ACTION_TYPES.AUTH_SUCCESS,
    payload: value,
  }
}

export const authError = () => {
  return {
    type: ACTION_TYPES.AUTH_ERROR,
  }
}

export const logout = () => {
  return {
    type: ACTION_TYPES.LOGOUT,
  }
}

export const updateUser = (value: IUserDataProps) => {
  return {
    type: ACTION_TYPES.UPDATE_USER,
    payload: value,
  }
}

export const loadAvatar = (value: IAvatarProps) => {
  return {
    type: ACTION_TYPES.LOAD_AVATAR,
    payload: value,
  }
}

export const deleteUser = () => {
  return {
    type: ACTION_TYPES.DELETE_USER,
  }
}

export const deleteAvatar = () => {
  return {
    type: ACTION_TYPES.DELETE_AVATAR,
  }
}

export const updateLibraryCards = (value: ICardProps[]) => {
  return {
    type: ACTION_TYPES.UPDATE_LIBRARY_CARDS_USER,
    payload: value,
  }
}

export const updateAssetsUser = (value: ICardProps[]) => {
  return {
    type: ACTION_TYPES.UPDATE_ASSETS_USER,
    payload: value,
  }
}
