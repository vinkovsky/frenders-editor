import * as ACTION_TYPES from '../../types/dashboard'

export const setChangeProfileMenu = (value: number) => {
  return {
    type: ACTION_TYPES.SET_CHANGE_PROFILELAYOUT,
    payload: value,
  }
}

export const setOpenMenu = (value: any) => {
  return {
    type: ACTION_TYPES.SET_OPEN_MENU,
    payload: value,
  }
}

export const setOpenSidebar = (value: boolean) => {
  return {
    type: ACTION_TYPES.SET_OPEN_SIDEBAR,
    payload: value,
  }
}
