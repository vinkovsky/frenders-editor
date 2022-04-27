import * as ACTIONS from '@actions/dashboard/cards'
import { ISavedCardProps } from '@interfaces/dashboard'

// Создание проекта
export const createSavedCardUser = async (
  dispatch,
  create,
  currentSavedCards
) => {
  try {
    const { data } = await create({
      variables: {
        input: {
          data: {
            ...currentSavedCards,
          },
        },
      },
    })
    if (data.createSavedCard) {
      dispatch(ACTIONS.createSavedCard(data.createSavedCard.savedCard))
      return data.createSavedCard
    }
    return data.errors[0]
  } catch (error) {
    return error
  }
}

// Удаление проекта
export const deleteSavedCardUser = async (dispatch, remove, currentCard) => {
  try {
    const { data } = await remove({
      variables: {
        input: {
          where: {
            id: currentCard.id,
          },
        },
      },
    })
    if (data.deleteSavedCard?.savedCard) {
      dispatch(ACTIONS.deleteSavedCard(currentCard))
      return data.deleteSavedCard
    }
    return data.errors[0]
  } catch (error) {
    return error
  }
}

// Удаление группы проектов
export const deleteSavedGroupCardUser = async (
  state,
  dispatch,
  remove,
  nameGroup
) => {
  try {
    const dataDeletedCards = state.cards.savedCards.filter(
      (saveCard) => saveCard.nameGroup.toUpperCase() === nameGroup
    )

    dataDeletedCards.map(async (dataDeleteCard: ISavedCardProps) => {
      const { data } = await remove({
        variables: {
          input: {
            where: {
              id: dataDeleteCard.id,
            },
          },
        },
      })
      if (data.deleteSavedCard?.savedCard) {
        dispatch(ACTIONS.deleteSavedCard(dataDeleteCard))
      }
    })
  } catch (error) {
    return error
  }
}

// Перименование группы проектов
export const renameGroupSavedCardUser = async (
  state,
  update,
  nameGroup,
  text
) => {
  try {
    state.cards.savedCards.map(async (groupCard: ISavedCardProps) => {
      if (groupCard.nameGroup.toUpperCase() === nameGroup) {
        await update({
          variables: {
            input: {
              where: {
                id: groupCard.id,
              },
              data: {
                nameGroup: text.length ? text : nameGroup,
              },
            },
          },
        })
      }
    })
  } catch (error) {
    return error
  }
}

// Переименование проекта
export const renameSavedCardUser = async (update, savedCard, text) => {
  try {
    await update({
      variables: {
        input: {
          where: {
            id: savedCard.id,
          },
          data: {
            nameProject: text.length ? text : savedCard.nameProject,
          },
        },
      },
    })
  } catch (error) {
    return error
  }
}

// Удаление всех проектов при удалении пользователя
export const deleteAllSavedCardUser = async (state, dispatch, remove) => {
  try {
    state.cards.savedCards.map(async (dataDeleteCard: ISavedCardProps) => {
      const { data } = await remove({
        variables: {
          input: {
            where: {
              id: dataDeleteCard.id,
            },
          },
        },
      })
      if (data.deleteSavedCard?.savedCard) {
        dispatch(ACTIONS.deleteSavedCard(dataDeleteCard))
      }
    })
  } catch (error) {
    return error
  }
}
