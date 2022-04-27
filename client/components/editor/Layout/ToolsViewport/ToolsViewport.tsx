import React, { FunctionComponent, useEffect } from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'

import { Fab, Tooltip, IconButton } from '@ui/index'

import {
  IUpdateMutationProps,
  IUploadFileMutationProps,
} from '@interfaces/auth'

import { useInitDataStore } from '@store/editor/initData'
import { useObjectSceneStore } from '@store/editor/objectScene'
import { useCameraStore } from '@store/editor/camera'
import { useAssetsStore } from '@store/editor/assets'
import { useEnvironmentStore } from '@store/editor/environment'
import { errorMessage } from '@helpers/errorMessage'
import { saveImageCanvas, updateSavedCardUser } from '@utils/editor/editor'

import UPDATE_SAVED_CARD from '@graphql/mutations/dashboard/UpdateSavedCard'
import SAVE_IMAGE_CANVAS from '@graphql/mutations/editor/SaveImageCanvas'

import { useStyles } from './ToolsViewport.styles'
import { useLayoutStore } from '@store/editor/layout'

const ToolsViewport: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { initDataCard } = useInitDataStore<any>((state: any) => state.data)
  const { objectSettings, dataMaps, canvas } = useObjectSceneStore<any>(
    (state: any) => state.data
  )
  const cameraSettings = useCameraStore<any>((state: any) => state.data)
  const { project } = useAssetsStore<any>((state: any) => state.data)
  const { envs, initState } = useEnvironmentStore<any>(
    (state: any) => state.data
  )

  const { changeSavedLayout } = useLayoutStore<any>((state: any) => state.api)

  const [
    update,
    { loading: loadingUpdate },
  ] = useMutation<IUpdateMutationProps>(UPDATE_SAVED_CARD)

  const [
    saveImage,
    { loading: loadingSave },
  ] = useMutation<IUploadFileMutationProps>(SAVE_IMAGE_CANVAS)

  const handleSaveClick = async () => {
    const dataSettings = objectSettings.modelItems.map((modelItem) => {
      const { geometry, material, ...rest } = modelItem
      const { normalScale, visible, metalness, roughness, color } = material
      return {
        ...rest,
        material: { normalScale, visible, metalness, roughness, color },
      }
    })
    const newDataSettings = {
      ...objectSettings,
      modelItems: { ...dataSettings },
    }
    const dataUvw = { dataMaps }
    const dataCamera = {
      dataCamera: {
        ...cameraSettings,
      },
    }
    const dataAssets = {
      models: project.models,
      textures: project.textures,
      environments: {
        envs,
        initState,
      },
      materials: project.materials,
    }

    try {
      const data = await updateSavedCardUser(
        initDataCard,
        update,
        newDataSettings,
        dataUvw,
        dataCamera,
        dataAssets
      )
      if (data.savedModelData) {
        const link = canvas.toDataURL('image/jpeg')
        const dataImageCanvas = await saveImageCanvas(data, saveImage, link)
        if (!dataImageCanvas.savedPreviewImage) {
          enqueueSnackbar(errorMessage(dataImageCanvas), {
            variant: 'error',
          })
        } else {
          enqueueSnackbar('Project saved successfully', {
            variant: 'success',
          })
        }
      } else {
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleResetLayout = () => {
    changeSavedLayout({ layouts: {} })
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      e.stopPropagation()
      if ((e.metaKey || (e.ctrlKey && e.shiftKey)) && e.code === 'KeyS') {
        handleSaveClick()
      } else if (e.code === 'KeyS' && e.shiftKey) {
        handleResetLayout()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handleSaveClick, handleResetLayout])

  return (
    <div className={classes.tools}>
      <Box>
        <Tooltip title={'Reset layout (Shift+S)'} arrow>
          <IconButton
            icon={'layout'}
            onClick={handleResetLayout}
            className={classes.button}
          />
        </Tooltip>
      </Box>
      <Tooltip title={'Save (Shift+Ctrl+S)'} arrow>
        <Fab
          icon={'save'}
          className={classes.fabButton}
          onClick={handleSaveClick}
        />
      </Tooltip>
      {(loadingSave || loadingUpdate) && (
        <CircularProgress size={48} className={classes.fabProgress} />
      )}
    </div>
  )
}

export default ToolsViewport
