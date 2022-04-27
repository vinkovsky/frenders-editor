import {
  ICardProps,
  ICategoryChipItemProps,
  ISavedCardProps,
} from '@interfaces/dashboard'
import * as ACTION_TYPES from '../../types/dashboard'

export const createCardLibraryData = (value: ICardProps[]) => {
  return {
    type: ACTION_TYPES.CREATE_CARD_LIBRARY_DATA,
    payload: value,
  }
}

export const changeCardLibraryData = (value: ICardProps) => {
  return {
    type: ACTION_TYPES.CHANGE_CARD_LIBRARY_DATA,
    payload: value,
  }
}

export const getFavoritesCardLibraryData = () => {
  return {
    type: ACTION_TYPES.GET_FAVORITES_CARD_LIBRARY_DATA,
  }
}

export const addFilteredChipData = (value: ICategoryChipItemProps) => {
  return {
    type: ACTION_TYPES.ADD_FILTERED_CHIP_DATA,
    payload: value,
  }
}

export const deleteFilteredChipData = (value: ICategoryChipItemProps) => {
  return {
    type: ACTION_TYPES.DELETE_FILTERED_CHIP_DATA,
    payload: value,
  }
}

export const clearFilteredChipList = () => {
  return {
    type: ACTION_TYPES.CLEAR_FILTERED_CHIP_LIST,
  }
}

export const updateCategoryFilteredChipData = (
  value: ICategoryChipItemProps
) => {
  return {
    type: ACTION_TYPES.UPDATE_FILTERED_CATEGORY_CHIP_DATA,
    payload: value,
  }
}

export const createCardFavoriteData = (value: ICardProps) => {
  return {
    type: ACTION_TYPES.CREATE_CARD_FAVORITE_DATA,
    payload: value,
  }
}

export const addFavoriteCard = (value: ICardProps) => {
  return {
    type: ACTION_TYPES.ADD_FAVORITE_CARD,
    payload: value,
  }
}

export const deleteFavoriteCard = (value: ICardProps) => {
  return {
    type: ACTION_TYPES.DELETE_FAVORITE_CARD,
    payload: value,
  }
}

export const setCurrentCard = (value: ICardProps) => {
  return {
    type: ACTION_TYPES.SET_CURRENT_CARD,
    payload: value,
  }
}

export const setCurrentGroup = (value: string) => {
  return {
    type: ACTION_TYPES.SET_CURRENT_GROUP,
    payload: value,
  }
}

export const initSavedCard = (value: ISavedCardProps) => {
  return {
    type: ACTION_TYPES.INIT_SAVED_CARD,
    payload: value,
  }
}

export const createSavedCard = (value: ISavedCardProps) => {
  return {
    type: ACTION_TYPES.CREATE_SAVED_CARD,
    payload: value,
  }
}

export const deleteSavedCard = (value: ISavedCardProps) => {
  return {
    type: ACTION_TYPES.DELETE_SAVED_CARD,
    payload: value,
  }
}
