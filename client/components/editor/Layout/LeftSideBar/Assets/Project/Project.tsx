import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useRef,
} from 'react'
import { Box, Grid, IconButton } from '@material-ui/core'
import { CloudDownload } from '@material-ui/icons'
import { nanoid } from 'nanoid'
import Compressor from 'compressorjs'

import { Accordion, Button, Loader } from '@ui/index'
import {
  IEnvProps,
  IMaterialProps,
  IModelProps,
  ITextureProps,
} from '@interfaces/editor/assets'
import CardAsset from '../CardAsset'
import { useAssetsStore } from '@store/editor/assets'
import { useEnvironmentStore } from '@store/editor/environment'

import StackGrid from 'react-stack-grid'
import { withSize } from 'react-sizeme'

import { useStyles } from './Project.styles'
import { loadTexture } from '@utils/editor/editor'
import { useMutation } from '@apollo/client'
import LOAD_TEXTURE from '@graphql/mutations/editor/UploadTexture'
import { errorMessage } from '@helpers/errorMessage'
import { useSnackbar } from 'notistack'
import { IUploadFileProps } from '@interfaces/auth'
import { useInitDataStore } from '@store/editor/initData'

const Project: FunctionComponent<any> = ({ size }) => {
  const classes = useStyles()
  const grid = useRef<any>(null)
  const inputRef = useRef<any>(null)
  const { project } = useAssetsStore<any>((state: any) => state.data)
  const { setDeleteEnvironments } = useEnvironmentStore<any>(
    (state: any) => state.api
  )
  const { deleteSelectedAsset, addLoadTexture } = useAssetsStore<any>(
    (state: any) => state.api
  )

  const [
    uploadTexture,
    { loading: loadingUploadTexture, error: errorUploadTexture },
  ] = useMutation<any>(LOAD_TEXTURE)

  const { initDataUser } = useInitDataStore<any>((state: any) => state.data)

  const { enqueueSnackbar } = useSnackbar()

  const handleUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    // try {
    //   const file = (e.target.files as any)[0]
    //   const reader = new FileReader()
    //   reader.onload = (function () {
    //     return function (e) {
    //       const fileData = {
    //         __typename: 'Textures',
    //         id: nanoid(),
    //         title: file.name,
    //         img: {
    //           __typename: 'UploadFile',
    //           id: nanoid(),
    //           url: e.target.result,
    //         },
    //         active: false,
    //       }
    //       loadTexture(addLoadTexture, uploadTexture, fileData)
    //       inputRef.current.value = ''
    //     }
    //   })()
    //   new Compressor(file, {
    //     quality: 0.4,
    //     maxWidth: 500,
    //     maxHeight: 500,
    //     success: (res) => {
    //       reader.readAsDataURL(res)
    //     },
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
    try {
      const file = (e.target.files as any)[0]
      const fileData: IUploadFileProps = {
        file: file,
        ref: 'user',
        refId: initDataUser.id,
        field: 'usertextures',
        source: 'users-permissions',
      }
      if (file) {
        const data = await loadTexture(uploadTexture, fileData)

        if (!data.url) {
          enqueueSnackbar(errorMessage(data), {
            variant: 'error',
          })
        } else {
          addLoadTexture({
            img: {
              url: data.url,
              id: data.id,
            },
            title: data.name,
            id: nanoid(),
            active: false,
          })
        }
      }
    } catch (error) {
      enqueueSnackbar(errorMessage(error), {
        variant: 'error',
      })
    }
  }, [])

  const deleteSelected = () => {
    deleteSelectedAsset()
    setDeleteEnvironments(project.selected.environments)
  }

  const setWidth = () => {
    if (size!.width >= 480 && size!.width <= 768) {
      return '18.25%'
    } else if (size!.width >= 340 && size!.width <= 480) {
      return '25%'
    } else if (size!.width <= 340) {
      return '33.3%'
    } else {
      return '11.25%'
    }
  }

  return (
    <div className={classes.root}>
      <Grid container direction={'column'} alignItems={'center'} spacing={2}>
        <Grid item className={classes.item}>
          <Accordion title={'Models'} icon={'models'} defaultExpanded={true}>
            {project.models.length > 0 ? (
              <StackGrid
                gridRef={(ref) => (grid.current = ref)}
                columnWidth={setWidth()}
                monitorImagesLoaded={true}
                gutterWidth={10}
                gutterHeight={10}
                duration={0}
              >
                {project.models.map((model: IModelProps) => (
                  <CardAsset
                    key={model.id}
                    zone={'project'}
                    area={'models'}
                    item={model}
                  />
                ))}
              </StackGrid>
            ) : (
              <span>No models</span>
            )}
          </Accordion>
        </Grid>
        <Grid item className={classes.item}>
          <Accordion
            title={'Textures'}
            icon={'textures'}
            defaultExpanded={true}
          >
            <StackGrid
              gridRef={(ref) => (grid.current = ref)}
              columnWidth={setWidth()}
              monitorImagesLoaded={true}
              gutterWidth={10}
              gutterHeight={10}
              duration={0}
            >
              <Box>
                <input
                  ref={inputRef}
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={(e) => handleUpload(e)}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    aria-label="upload picture"
                    component="span"
                    className={classes.download}
                  >
                    {loadingUploadTexture ? <Loader /> : <CloudDownload />}
                  </IconButton>
                </label>
              </Box>
              {project.textures.length &&
                project.textures.map((texture: ITextureProps) => {
                  return (
                    <CardAsset
                      key={texture.id}
                      zone={'project'}
                      area={'textures'}
                      item={texture}
                      active={texture.active}
                    />
                  )
                })}
            </StackGrid>
          </Accordion>
        </Grid>
        <Grid item className={classes.item}>
          <Accordion
            title={'Environments'}
            icon={'environments'}
            defaultExpanded={true}
          >
            {project.environments.length > 0 ? (
              <StackGrid
                gridRef={(ref) => (grid.current = ref)}
                columnWidth={setWidth()}
                monitorImagesLoaded={true}
                gutterWidth={10}
                gutterHeight={10}
                duration={0}
              >
                {project.environments.map((environment: IEnvProps) => (
                  <CardAsset
                    key={environment.id}
                    zone={'project'}
                    area={'environments'}
                    item={environment}
                    active={environment.active}
                  />
                ))}
              </StackGrid>
            ) : (
              <span>No environments</span>
            )}
          </Accordion>
        </Grid>
        <Grid item className={classes.item}>
          <Accordion
            title={'Materials'}
            icon={'materials'}
            defaultExpanded={true}
          >
            {project.materials.length > 0 ? (
              <StackGrid
                gridRef={(ref) => (grid.current = ref)}
                columnWidth={setWidth()}
                monitorImagesLoaded={true}
                gutterWidth={10}
                gutterHeight={10}
                duration={0}
              >
                {project.materials.map((material: IMaterialProps) => (
                  <CardAsset
                    key={material.id}
                    zone={'project'}
                    area={'materials'}
                    item={material}
                  />
                ))}
              </StackGrid>
            ) : (
              <span>No materials</span>
            )}
          </Accordion>
        </Grid>
        <Grid item>
          <Button className={classes.button} onClick={deleteSelected}>
            Delete selected
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default withSize()(Project)
