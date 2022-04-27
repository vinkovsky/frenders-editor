import * as ACTIONS from '@actions/auth'

// Обновление данных проекта (uvw, модель, ассеты, камера)
export const updateSavedCardUser = async (
  state,
  update,
  model,
  uvw,
  camera,
  assets
) => {
  try {
    const { data } = await update({
      variables: {
        input: {
          where: {
            id: state.id,
          },
          data: {
            savedModelData: model,
            savedUvwData: uvw,
            savedCameraData: camera,
            savedAssetsData: assets,
          },
        },
      },
    })
    if (data.updateSavedCard) {
      return data.updateSavedCard.savedCard
    }
    return data.errors[0]
  } catch (error) {
    return error
  }
}

// Загрузка аватара
export const loadTexture = async (upload, fileData) => {
  try {
    const { data } = await upload({
      variables: fileData,
    })
    if (data) {
      return data.upload
    }
    return data.errors[0]
  } catch (error) {
    return error
  }
}

// Сохранение изображения текущего состояния канваса
export const saveImageCanvas = async (state, saveImage, link) => {
  try {
    const { data } = await saveImage({
      variables: {
        input: {
          where: {
            id: state.id,
          },
          data: {
            savedPreviewImage: link,
          },
        },
      },
    })
    if (data.updateSavedCard) {
      return data.updateSavedCard.savedCard
    }
    return data.errors[0]
  } catch (error) {
    return error
  }
}

// Обновление данных ассетов пользователя
export const updateLibraryCardsUser = async (state, update, assets) => {
  try {
    const { data } = await update({
      variables: {
        input: {
          where: {
            id: state.id,
          },
          data: {
            models: assets.models,
            textures: assets.textures,
            environments: assets.environments,
            materials: assets.materials,
          },
        },
      },
    })
    if (data.updateSavedCard) {
      return data.updateSavedCard.savedCard
    }
    return data.errors[0]
  } catch (error) {
    return error
  }
}
