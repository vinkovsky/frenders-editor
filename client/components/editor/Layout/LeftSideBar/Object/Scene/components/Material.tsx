import React, { ChangeEvent, FunctionComponent, useCallback } from 'react'
import {
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import * as _ from 'lodash'

import { Accordion, ColorPicker, IconButton, Slider, Switch } from '@ui/index'
import { MaterialAreaType } from '@interfaces/editor/objectScene'
import { useObjectSceneStore } from '@store/editor/objectScene'
import { useUvwStore } from '@store/editor/uvw'
import { useHistoryStore } from '@store/editor/history'

import { useStyles } from '../Scene.styles'

const Material: FunctionComponent<any> = () => {
  const classes = useStyles()
  const {
    objectSettings,
    currentObjectScene,
    currentIndexObjectScene,
  } = useObjectSceneStore<any>((state: any) => state.data)
  const { material, maps } = useObjectSceneStore<any>((state: any) => state.api)
  const { activeCanvas } = useUvwStore<any>((state: any) => state.data)
  const { setActiveCanvas } = useUvwStore<any>((state: any) => state.api)
  const {
    setHistoryGeneralMaterial,
    setHistoryNormalMaterial,
    setHistoryModelMap,
  } = useHistoryStore<any>((state: any) => state.api)

  const currentModel = objectSettings.modelItems[currentIndexObjectScene]
  const colorCurrent =
    currentObjectScene && currentObjectScene.type === 'Mesh'
      ? typeof currentModel?.material.color === 'object'
        ? '#' + currentModel?.material.color.getHexString()
        : currentModel?.material.color.toString(16)
      : '#ffffff'

  const handleColorChange = (color: string) => {
    material.setModelMaterial({ area: 'color', value: color })

    setHistoryGeneralMaterial({
      area: 'model',
      attr: 'color',
      value: color,
      name: currentObjectScene.name,
    })
  }

  const handleUseMetalness = (value: boolean) => {
    material.toggleMapMaterial({ area: 'metalnessMap', value })
    material.setToggledMap({ value: 'metalnessMap' })
    maps.setDisabledMap({ mapName: 'metalnessMap', disabledMap: value })
    setHistoryModelMap({
      attr: 'metalnessMap',
      value,
      name: currentObjectScene.name,
    })
    if (activeCanvas === 2) setActiveCanvas(0)
  }
  const handleUseRoughness = (value: boolean) => {
    material.toggleMapMaterial({ area: 'roughnessMap', value })
    material.setToggledMap({ value: 'roughnessMap' })
    maps.setDisabledMap({ mapName: 'roughnessMap', disabledMap: value })
    setHistoryModelMap({
      attr: 'roughnessMap',
      value,
      name: currentObjectScene.name,
    })
    if (activeCanvas === 1) setActiveCanvas(0)
  }
  const handleUseNormal = (value: boolean) => {
    material.toggleMapMaterial({ area: 'normalMap', value })
    material.setToggledMap({ value: 'normalMap' })
    maps.setDisabledMap({ mapName: 'normalMap', disabledMap: value })
    setHistoryModelMap({
      attr: 'normalMap',
      value,
      name: currentObjectScene.name,
    })
    if (activeCanvas === 3) setActiveCanvas(0)
  }

  const handleChangeSliderCommitted = (
    event: ChangeEvent<any>,
    newValue: number | number[],
    area: MaterialAreaType
  ) => {
    setHistoryGeneralMaterial({
      area: 'model',
      attr: area,
      value: newValue,
      name: currentObjectScene.name,
    })
  }

  const handleChangeNormalCommitted = (
    event: ChangeEvent<any>,
    newValue: number | number[],
    area: 'x' | 'y'
  ) => {
    setHistoryNormalMaterial({
      area: 'model',
      attr: area,
      value: newValue,
      name: currentObjectScene.name,
    })
  }

  const handleMaterialReset = () => material.setToDefaultMaterialScene()

  const handleSliderChange = useCallback(
    (
      event: ChangeEvent<any>,
      newValue: number | number[],
      area: MaterialAreaType
    ) => {
      material.setModelMaterial({ area, value: newValue })
    },
    []
  )

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    area: MaterialAreaType
  ) => {
    material.setModelMaterial({ area, value: Number(event.target.value) })
    setHistoryGeneralMaterial({
      area: 'model',
      attr: area,
      value: Number(event.target.value),
      name: currentObjectScene.name,
    })
  }

  const handleNormalChange = (
    event: ChangeEvent<any>,
    newValue: number | number[],
    area: 'x' | 'y'
  ) => {
    material.setNormalMaterial({ area, value: newValue })
  }

  const handleNormalInputChange = (
    event: ChangeEvent<any>,
    area: 'x' | 'y'
  ) => {
    material.setNormalMaterial({ area, value: Number(event.target.value) })
    setHistoryNormalMaterial({
      area: 'model',
      attr: area,
      value: Number(event.target.value),
      name: currentObjectScene.name,
    })
  }

  return (
    <Accordion
      title={'Material settings'}
      icon={'materials'}
      defaultExpanded={true}
    >
      <List className={classes.root}>
        <ListItem className={classes.listItem}>
          <ListItemText id="color" primary="Color" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <ColorPicker
              color={colorCurrent}
              disabled={
                !(currentObjectScene && currentObjectScene.type === 'Mesh')
              }
              onChange={handleColorChange}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="metalness" primary="Metalness" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <FormControlLabel
                  value="useMetalness"
                  control={
                    <Switch
                      color="primary"
                      onChange={(event, value: boolean) =>
                        handleUseMetalness(value)
                      }
                      disabled={
                        !(
                          currentObjectScene &&
                          currentObjectScene.type === 'Mesh'
                        )
                      }
                      checked={
                        currentObjectScene && currentObjectScene.type === 'Mesh'
                          ? currentModel.metalnessMap
                          : false
                      }
                    />
                  }
                  label=""
                  labelPlacement="start"
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem2}>
          <ListItemSecondaryAction
            className={classes.listItemAction}
            style={{ width: '100%' }}
          >
            <Grid
              container
              spacing={1}
              alignItems={'center'}
              className={classes.gridItem}
            >
              <Grid item className={classes.gridItem}>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  disabled={
                    !(currentObjectScene && currentObjectScene.type === 'Mesh')
                  }
                  value={
                    currentObjectScene && currentObjectScene.type === 'Mesh'
                      ? currentModel.material.metalness
                      : undefined
                  }
                  onChangeCommitted={(event, v) =>
                    handleChangeSliderCommitted(event, v, 'metalness')
                  }
                  onChange={_.debounce(
                    (event, v) => handleSliderChange(event, v, 'metalness'),
                    10
                  )}
                  onInputChange={(event) =>
                    handleInputChange(event, 'metalness')
                  }
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem1}>
          <ListItemText id="roughness" primary="Roughness" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <FormControlLabel
                  value="useRoughness"
                  control={
                    <Switch
                      color="primary"
                      onChange={(e, value: boolean) =>
                        handleUseRoughness(value)
                      }
                      disabled={
                        !(
                          currentObjectScene &&
                          currentObjectScene.type === 'Mesh'
                        )
                      }
                      checked={
                        currentObjectScene && currentObjectScene.type === 'Mesh'
                          ? currentModel.roughnessMap
                          : false
                      }
                    />
                  }
                  label=""
                  labelPlacement="start"
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem2}>
          <ListItemSecondaryAction
            className={classes.listItemAction}
            style={{ width: '100%' }}
          >
            <Grid
              container
              spacing={1}
              alignItems={'center'}
              className={classes.gridItem}
            >
              <Grid item className={classes.gridItem}>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  disabled={
                    !(currentObjectScene && currentObjectScene.type === 'Mesh')
                  }
                  value={
                    currentObjectScene && currentObjectScene.type === 'Mesh'
                      ? currentModel.material.roughness
                      : undefined
                  }
                  onChange={_.debounce(
                    (event, v) => handleSliderChange(event, v, 'roughness'),
                    10
                  )}
                  onChangeCommitted={(event, v) =>
                    handleChangeSliderCommitted(event, v, 'roughness')
                  }
                  onInputChange={(event) =>
                    handleInputChange(event, 'roughness')
                  }
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem1}>
          <ListItemText id="normal" primary="Normal" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <FormControlLabel
                  value="useNormal"
                  control={
                    <Switch
                      onChange={(e, value: boolean) => handleUseNormal(value)}
                      disabled={
                        !(
                          currentObjectScene &&
                          currentObjectScene.type === 'Mesh'
                        )
                      }
                      checked={
                        currentObjectScene && currentObjectScene.type === 'Mesh'
                          ? currentModel.normalMap
                          : false
                      }
                    />
                  }
                  label=""
                  labelPlacement="start"
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem} style={{ marginTop: -5 }}>
          <ListItemText id="X" primary="X" />
          <ListItemSecondaryAction
            className={classes.listItemAction}
            style={{ width: '90%' }}
          >
            <Grid
              container
              spacing={1}
              alignItems={'center'}
              className={classes.gridItem}
            >
              <Grid item className={classes.gridItem}>
                <Slider
                  min={-1}
                  max={1}
                  step={0.1}
                  disabled={
                    currentObjectScene && currentObjectScene.type === 'Mesh'
                      ? !currentModel.normalMap
                      : true
                  }
                  value={
                    currentObjectScene && currentObjectScene.type === 'Mesh'
                      ? currentModel.material.normalScale!.x
                      : undefined
                  }
                  onChange={_.debounce(
                    (event, v) => handleNormalChange(event, v, 'x'),
                    10
                  )}
                  onChangeCommitted={(event, v) =>
                    handleChangeNormalCommitted(event, v, 'x')
                  }
                  onInputChange={(event) => handleNormalInputChange(event, 'x')}
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="Y" primary="Y" />
          <ListItemSecondaryAction
            className={classes.listItemAction}
            style={{ width: '90%' }}
          >
            <Grid
              container
              spacing={1}
              alignItems={'center'}
              className={classes.gridItem}
            >
              <Grid item className={classes.gridItem}>
                <Slider
                  min={-1}
                  max={1}
                  step={0.1}
                  className={classes.gridItem}
                  disabled={
                    currentObjectScene && currentObjectScene.type === 'Mesh'
                      ? !currentModel.normalMap
                      : true
                  }
                  value={
                    currentObjectScene && currentObjectScene.type === 'Mesh'
                      ? currentModel.material.normalScale!.y
                      : undefined
                  }
                  onChange={_.debounce(
                    (event, v) => handleNormalChange(event, v, 'y'),
                    10
                  )}
                  onChangeCommitted={(event, v) =>
                    handleChangeNormalCommitted(event, v, 'y')
                  }
                  onInputChange={(event) => handleNormalInputChange(event, 'y')}
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="default" primary="Set to default" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <IconButton icon={'reset'} onClick={() => handleMaterialReset()} />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Accordion>
  )
}

export default Material
