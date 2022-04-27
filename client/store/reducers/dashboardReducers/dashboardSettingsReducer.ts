import { Reducer } from 'react'

import { IDashboardSettingsProps } from '@interfaces/dashboard'
import { IActionsProps } from '@interfaces/index'
import * as ACTION_TYPES from '../../types/dashboard'

export const initialDashboardSettingsState: IDashboardSettingsProps = {
  openSidebar: false,
  selectedIndex: 0,
  settingsMenu: {
    anchor: null,
    openMenu: false,
  },
}

export const dashboardSettingsReducer: Reducer<
  IDashboardSettingsProps,
  IActionsProps
> = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_OPEN_SIDEBAR: {
      return {
        ...state,
        openSidebar: !action.payload,
      }
    }
    case ACTION_TYPES.SET_CHANGE_PROFILELAYOUT: {
      return {
        ...state,
        selectedIndex: action.payload,
      }
    }
    case ACTION_TYPES.SET_OPEN_MENU: {
      return {
        ...state,
        settingsMenu: {
          anchor: action.payload.anchor,
          openMenu: !action.payload.openMenu,
        },
      }
    }
    default:
      return state
  }
}
