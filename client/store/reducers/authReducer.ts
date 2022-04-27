import { Reducer } from 'react'
import Cookies from 'js-cookie'

import { IAppProps } from '@interfaces/auth'
import { IActionsProps } from '@interfaces/index'
import * as ACTION_TYPES from '../types/auth'

export const initialState: IAppProps = {
  isAuthenticated: false,
  user: null,
  loading: false,
  token: '',
  avatar: {
    id: '',
    url: '',
  },
}

export const authReducer: Reducer<IAppProps, IActionsProps> = (
  state,
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.REQUEST_AUTH: {
      return {
        ...state,
        loading: true,
      }
    }
    case ACTION_TYPES.AUTH_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
        token: action.payload.token || state.token || Cookies.get('token'),
      }
    }
    case ACTION_TYPES.AUTH_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      }
    }
    case ACTION_TYPES.LOGOUT: {
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
      }
    }
    case ACTION_TYPES.UPDATE_USER: {
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload.username,
          email: action.payload.email,
        },
      }
    }
    case ACTION_TYPES.UPDATE_LIBRARY_CARDS_USER: {
      return {
        ...state,
        user: {
          ...state.user,
          libraryCards: action.payload,
        },
      }
    }
    case ACTION_TYPES.UPDATE_ASSETS_USER: {
      return {
        ...state,
        user: {
          ...state.user,
          libraryCards: action.payload.libraryCards,
          textures: action.payload.textures,
          materials: action.payload.materials,
          environments: action.payload.environments,
        },
      }
    }
    case ACTION_TYPES.DELETE_USER: {
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
      }
    }
    case ACTION_TYPES.LOAD_AVATAR: {
      return {
        ...state,
        avatar: {
          id: action.payload.id,
          url: action.payload.url,
        },
      }
    }
    case ACTION_TYPES.DELETE_AVATAR: {
      return {
        ...state,
        avatar: {
          id: '',
          url: '',
        },
      }
    }
    default:
      return state
  }
}
