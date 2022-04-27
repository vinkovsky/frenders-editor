import Cookies from 'js-cookie'

import * as ACTIONS from '@actions/auth'

// Регистрация пользователя
export const registerUser = async (dispatch, register, values) => {
  try {
    dispatch(ACTIONS.requestAuth())
    const { data } = await register({
      variables: {
        input: {
          ...values,
        },
      },
    })
    if (data.register?.user) {
      dispatch(ACTIONS.authSuccess(data.register))
      return data.register
    }
    dispatch(ACTIONS.authError())
    return data.errors[0]
  } catch (error) {
    dispatch(ACTIONS.authError())
    return error
  }
}

// Вход пользователя
export const loginUser = async (dispatch, login, values) => {
  try {
    dispatch(ACTIONS.requestAuth())
    const { data } = await login({
      variables: {
        input: {
          ...values,
        },
      },
    })
    if (data.login?.user) {
      dispatch(ACTIONS.authSuccess(data.login))
      Cookies.set('token', data.login.jwt)
      return data.login
    }
    dispatch(ACTIONS.authError())
    return data.errors[0]
  } catch (error) {
    dispatch(ACTIONS.authError())
    return error
  }
}

// Выход пользователя
export const logoutUser = async (dispatch) => {
  dispatch(ACTIONS.logout())
  Cookies.remove('token')
}

// Восстановление пароля
export const forgotPasswordUser = async (dispatch, forgotPassword, values) => {
  try {
    dispatch(ACTIONS.requestAuth())
    const { data } = await forgotPassword({
      variables: {
        ...values,
      },
    })
    if (data.forgotPassword?.ok) {
      return data.forgotPassword
    }
    dispatch(ACTIONS.authError())
    return data.errors[0]
  } catch (error) {
    dispatch(ACTIONS.authError())
    return error
  }
}

// Сброс пароля
export const resetPasswordUser = async (
  dispatch,
  resetPassword,
  values,
  code
) => {
  try {
    dispatch(ACTIONS.requestAuth())
    const { data } = await resetPassword({
      variables: {
        ...values,
        code,
      },
    })
    if (data.resetPassword?.user) {
      dispatch(ACTIONS.updateUser(data.resetPassword))
      return data.resetPassword
    }
    dispatch(ACTIONS.authError())
    return data.errors[0]
  } catch (error) {
    dispatch(ACTIONS.authError())
    return error
  }
}

// Обновление данных пользователя
export const updateUser = async (state, dispatch, update, values) => {
  try {
    const { data } = await update({
      variables: {
        input: {
          where: {
            id: state.user.id,
          },
          data: { ...values },
        },
      },
    })
    if (data.updateUser?.user) {
      dispatch(ACTIONS.updateUser(data.updateUser.user))
      return data.updateUser
    }
    return data.errors[0]
  } catch (error) {
    return error
  }
}

// Привязка всех моделей пользователю
export const createLibraryCardsUser = async (
  state,
  dispatch,
  update,
  dataLibraryCards
) => {
  try {
    const { data } = await update({
      variables: {
        input: {
          where: {
            id: state.id,
          },
          data: {
            libraryCards: dataLibraryCards,
            textures: state.textures,
            materials: state.materials,
            environments: state.environments,
          },
        },
      },
    })
    if (data.updateUser?.user) {
      dispatch(ACTIONS.updateLibraryCards(data.updateUser.user.libraryCards))
      return data.updateUser
    }
    return data.errors[0]
  } catch (error) {
    return error
  }
}

// Привязка всех ассетов пользователю
export const createAssetsCardsUser = async (
  state,
  dispatch,
  update,
  dataAssets
) => {
  try {
    const { data } = await update({
      variables: {
        input: {
          where: {
            id: state.user.id,
          },
          data: {
            libraryCards: dataAssets.libraryCards,
            textures: dataAssets.textures,
            materials: dataAssets.materials,
            environments: dataAssets.environments,
          },
        },
      },
    })
    if (data.updateUser?.user) {
      dispatch(ACTIONS.updateAssetsUser(data.updateUser.user))
      return data.updateUser
    }
    return data.errors[0]
  } catch (error) {
    return error
  }
}

// Удаление пользователя
export const deleteUser = async (state, dispatch, remove) => {
  const { data } = await remove({
    variables: {
      input: {
        where: {
          id: state.user.id,
        },
      },
    },
  })
  if (data.deleteUser?.user) {
    Cookies.remove('token')
    dispatch(ACTIONS.deleteUser())
    return data.deleteUser
  }
}

// Загрузка аватара
export const loadAvatar = async (dispatch, upload, fileData) => {
  try {
    const { data } = await upload({
      variables: fileData,
    })
    if (data) {
      dispatch(ACTIONS.loadAvatar(data.upload))
      return data.upload
    }
    return data.errors[0]
  } catch (error) {
    return error
  }
}

// Удаление аватара
export const deleteAvatar = async (dispatch, remove, fileData) => {
  try {
    const { data } = await remove({
      variables: {
        input: {
          where: {
            id: fileData.id,
          },
        },
      },
    })
    if (data.deleteFile.file) {
      dispatch(ACTIONS.deleteAvatar())
      return data.deleteFile.file
    }
    return data.errors[0]
  } catch (error) {
    return error
  }
}

// export const confirmEmailUser = async (
//   dispatch,
//   emailConfirmation,
//   confirmation
// ) => {
//   try {
//     const { data } = await emailConfirmation({
//       variables: {
//         input: {
//           confirmation,
//         },
//       },
//     })
//     if (data.emailConfirmation?.user) {
//       dispatch(ACTIONS.authSuccess(data.emailConfirmation))
//       Cookies.set('token', data.emailConfirmation.jwt)
//       return data.emailConfirmation
//     }
//     dispatch(ACTIONS.authError())
//     return data.errors[0]
//   } catch (error) {
//     dispatch(ACTIONS.authError())
//     return error
//   }
// }
