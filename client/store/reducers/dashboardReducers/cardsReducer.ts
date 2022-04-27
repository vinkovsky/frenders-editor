import { Reducer } from 'react'

import {
  ICardProps,
  ICategoryChipItemProps,
  ICategoryChipListProps,
  IDashboardCardsProps,
} from '@interfaces/dashboard'
import { IActionsProps } from '@interfaces/index'
import * as ACTION_TYPES from '../../types/dashboard'
import { filteredListData } from '@utils/dashboard/filteredListData'

export const initialCardsState: IDashboardCardsProps = {
  cardLibraryListData: [],
  filteredUserListData: [],
  filteredListData: filteredListData,
  favoriteCardList: [],
  currentCard: null,
  currentGroup: null,
  savedCards: [],
}

export const cardsReducer: Reducer<IDashboardCardsProps, IActionsProps> = (
  state,
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_CARD_LIBRARY_DATA: {
      return {
        ...state,
        cardLibraryListData: action.payload,
        favoriteCardList: action.payload,
      }
    }
    case ACTION_TYPES.CHANGE_CARD_LIBRARY_DATA: {
      const newCardLibraryListData = state.cardLibraryListData.map(
        (item: ICardProps) => {
          if (item.title === action.payload.title) {
            return {
              ...item,
              favorite: action.payload.favorite,
            }
          }
          return item
        }
      )
      return {
        ...state,
        cardLibraryListData: newCardLibraryListData,
      }
    }
    case ACTION_TYPES.GET_FAVORITES_CARD_LIBRARY_DATA: {
      const newCardLibraryListData = state.cardLibraryListData.filter(
        (item: ICardProps) => item.favorite === true
      )
      return {
        ...state,
        favoriteCardList: newCardLibraryListData,
      }
    }
    case ACTION_TYPES.ADD_FILTERED_CHIP_DATA: {
      return {
        ...state,
        filteredUserListData: state.filteredUserListData.concat({
          ...action.payload,
        }),
      }
    }
    case ACTION_TYPES.DELETE_FILTERED_CHIP_DATA: {
      return {
        ...state,
        filteredUserListData: state.filteredUserListData.filter(
          (item: ICategoryChipItemProps) =>
            item.categoryItem !== action.payload.categoryItem
        ),
      }
    }
    case ACTION_TYPES.CLEAR_FILTERED_CHIP_LIST: {
      return {
        ...state,
        filteredUserListData: [],
      }
    }
    case ACTION_TYPES.UPDATE_FILTERED_CATEGORY_CHIP_DATA: {
      return {
        ...state,
        filteredListData: state.filteredListData.map(
          (item: ICategoryChipListProps) => {
            return {
              ...item,
              categoryItems: item.categoryItems.map(
                (el: ICategoryChipItemProps) => {
                  if (el.categoryItem === action.payload.categoryItem) {
                    return {
                      ...el,
                      disabled: action.payload.disabled,
                    }
                  }
                  return el
                }
              ),
            }
          }
        ),
      }
    }
    case ACTION_TYPES.CREATE_CARD_FAVORITE_DATA: {
      return {
        ...state,
        favoriteCardList: action.payload,
      }
    }
    case ACTION_TYPES.ADD_FAVORITE_CARD: {
      return {
        ...state,
        favoriteCardList: state.favoriteCardList.concat({
          ...action.payload,
        }),
      }
    }
    case ACTION_TYPES.DELETE_FAVORITE_CARD: {
      return {
        ...state,
        favoriteCardList: state.favoriteCardList.filter(
          (item) => item.title !== action.payload.title
        ),
      }
    }
    case ACTION_TYPES.SET_CURRENT_CARD: {
      return {
        ...state,
        currentCard: action.payload,
      }
    }
    case ACTION_TYPES.SET_CURRENT_GROUP: {
      return {
        ...state,
        currentGroup: action.payload,
      }
    }
    case ACTION_TYPES.INIT_SAVED_CARD: {
      return {
        ...state,
        savedCards: action.payload,
      }
    }
    case ACTION_TYPES.CREATE_SAVED_CARD: {
      return {
        ...state,
        savedCards: state.savedCards.concat(action.payload),
      }
    }
    case ACTION_TYPES.DELETE_SAVED_CARD: {
      return {
        ...state,
        savedCards: state.savedCards.filter(
          (item) => item.id !== action.payload.id
        ),
      }
    }
    default:
      return state
  }
}
