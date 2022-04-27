import React, { ChangeEvent, FunctionComponent, useRef } from 'react'
import { Accordion, Slider, Switch } from '@ui/index'
import {
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import { fabric } from 'fabric'
import * as _ from 'lodash'

import { useObjectUvwStore } from '@store/editor/objectUvw'
import { useUvwStore } from '@store/editor/uvw'
import { saveMap } from '@helpers/uvw/saveMap'
import { useObjectSceneStore } from '@store/editor/objectScene'

import { useStyles } from '../Uvw.styles'
import { useHistoryStore } from '@store/editor/history'

const Filters: FunctionComponent = () => {
  const classes = useStyles()
  const { activeObjects } = useObjectUvwStore<any>((state: any) => state.data)
  const { obj } = useObjectUvwStore<any>((state: any) => state.api)
  const { fabricCanvas, canvasTextures, activeCanvas } = useUvwStore<any>(
    (state: any) => state.data
  )
  const { maps } = useObjectSceneStore<any>((state: any) => state.api)
  const { setHistoryUvwDataMap } = useHistoryStore<any>(
    (state: any) => state.api
  )

  const handleToggle = (value: string) => () => {
    if (activeObjects.length === 1) {
      activeObjects.map((activeObject) => {
        const currentIndex = activeObject.filters.findIndex(
          (filter) => filter.type === value
        )
        const newFilters = [...activeObject.filters]
        if (currentIndex === -1) {
          const filter = new fabric.Image.filters[value]()
          newFilters.push(filter)
        } else {
          newFilters.splice(currentIndex, 1)
        }
        obj.setFilters(newFilters)
        activeObject.applyFilters()
        saveMap(
          maps,
          fabricCanvas,
          canvasTextures,
          activeCanvas,
          setHistoryUvwDataMap
        )
        fabricCanvas.renderAll()
      })
    }
  }

  const handleChangeCommitted = () => {
    saveMap(
      maps,
      fabricCanvas,
      canvasTextures,
      activeCanvas,
      setHistoryUvwDataMap
    )
  }

  const handleSliderChange = (
    event: ChangeEvent<any>,
    newValue: number | number[],
    area: any
  ) => {
    activeObjects.map((activeObject) => {
      obj.setValueFilters({
        area,
        value: newValue,
      })
      activeObject.applyFilters()
      fabricCanvas.renderAll()
    })
  }

  const handleInputChange = (event: ChangeEvent<any>, area: any) => {
    activeObjects.map((activeObject) => {
      obj.setValueFilters({
        area,
        value: Number(event.target.value),
      })
      saveMap(
        maps,
        fabricCanvas,
        canvasTextures,
        activeCanvas,
        setHistoryUvwDataMap
      )
      activeObject.applyFilters()
      fabricCanvas.renderAll()
    })
  }

  const filterValue = (area: string) => {
    if (activeObjects.length === 1 && activeObjects[0].type === 'image') {
      if (activeObjects[0].filters.find((filter) => filter.type === area)) {
        const filterArea =
          area === 'HueRotation' ? 'rotation' : area.toLowerCase()
        return activeObjects[0].filters.find((filter) => filter.type === area)[
          filterArea
        ]
      } else return 0
    } else return 0
  }

  return (
    <Accordion
      title={'Filter Settings'}
      icon={'textures'}
      defaultExpanded={true}
    >
      <List className={classes.root_filters}>
        <ListItem className={classes.listItem}>
          <ListItemText id="grayscale" primary="Grayscale" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <FormControlLabel
              control={
                <Switch
                  id={'Grayscale'}
                  checked={
                    activeObjects.length > 0
                      ? activeObjects.length === 1 &&
                        activeObjects[0].type === 'image'
                        ? activeObjects[0].filters.findIndex(
                            (filter) => filter.type === 'Grayscale'
                          ) !== -1
                        : false
                      : false
                  }
                  onChange={handleToggle('Grayscale')}
                  disabled={
                    activeObjects.length > 0
                      ? activeObjects.length === 1
                        ? activeObjects[0].type === 'activeSelection' ||
                          activeObjects[0].type === 'path'
                        : true
                      : true
                  }
                  name="Grayscale"
                />
              }
              labelPlacement="start"
              label=""
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="invert" primary="Invert" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <FormControlLabel
              control={
                <Switch
                  id={'Invert'}
                  checked={
                    activeObjects.length > 0
                      ? activeObjects.length === 1 &&
                        activeObjects[0].type === 'image'
                        ? activeObjects[0].filters.findIndex(
                            (filter) => filter.type === 'Invert'
                          ) !== -1
                        : false
                      : false
                  }
                  onChange={handleToggle('Invert')}
                  disabled={
                    activeObjects.length > 0
                      ? activeObjects.length === 1
                        ? activeObjects[0].type === 'activeSelection' ||
                          activeObjects[0].type === 'path'
                        : true
                      : true
                  }
                  name="Invert"
                />
              }
              labelPlacement="start"
              label=""
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="brightness" primary="Brightness" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      id={'Brightness'}
                      checked={
                        activeObjects.length > 0
                          ? activeObjects.length === 1 &&
                            activeObjects[0].type === 'image'
                            ? activeObjects[0].filters.findIndex(
                                (filter) => filter.type === 'Brightness'
                              ) !== -1
                            : false
                          : false
                      }
                      onChange={handleToggle('Brightness')}
                      disabled={
                        activeObjects.length > 0
                          ? activeObjects.length === 1
                            ? activeObjects[0].type === 'activeSelection' ||
                              activeObjects[0].type === 'path'
                            : true
                          : true
                      }
                      name="Brightness"
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
                  min={-1}
                  max={1}
                  value={filterValue('Brightness')}
                  step={0.1}
                  onChangeCommitted={handleChangeCommitted}
                  onInputChange={(e) => handleInputChange(e, 'Brightness')}
                  onChange={_.debounce(
                    (e, v) => handleSliderChange(e, v, 'Brightness'),
                    10
                  )}
                  disabled={
                    activeObjects.length > 0
                      ? activeObjects.length === 1
                        ? activeObjects[0].type === 'activeSelection' ||
                          activeObjects[0].type === 'path'
                          ? true
                          : activeObjects[0].filters.findIndex(
                              (filter) => filter.type === 'Brightness'
                            ) === -1
                        : true
                      : true
                  }
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem1}>
          <ListItemText id="contrast" primary="Contrast" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      id={'Contrast'}
                      checked={
                        activeObjects.length > 0
                          ? activeObjects.length === 1 &&
                            activeObjects[0].type === 'image'
                            ? activeObjects[0].filters.findIndex(
                                (filter) => filter.type === 'Contrast'
                              ) !== -1
                            : false
                          : false
                      }
                      disabled={
                        activeObjects.length > 0
                          ? activeObjects.length === 1
                            ? activeObjects[0].type === 'activeSelection' ||
                              activeObjects[0].type === 'path'
                            : true
                          : true
                      }
                      onChange={handleToggle('Contrast')}
                      name="Contrast"
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
                  min={-1}
                  max={1}
                  value={filterValue('Contrast')}
                  step={0.1}
                  onChangeCommitted={handleChangeCommitted}
                  onInputChange={(e) => handleInputChange(e, 'Contrast')}
                  onChange={_.debounce(
                    (e, v) => handleSliderChange(e, v, 'Contrast'),
                    10
                  )}
                  disabled={
                    activeObjects.length > 0
                      ? activeObjects.length === 1
                        ? activeObjects[0].type === 'activeSelection' ||
                          activeObjects[0].type === 'path'
                          ? true
                          : activeObjects[0].filters.findIndex(
                              (filter) => filter.type === 'Contrast'
                            ) === -1
                        : true
                      : true
                  }
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem1}>
          <ListItemText id="hue" primary="Hue-rotate" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      id={'HueRotation'}
                      checked={
                        activeObjects.length > 0
                          ? activeObjects.length === 1 &&
                            activeObjects[0].type === 'image'
                            ? activeObjects[0].filters.findIndex(
                                (filter) => filter.type === 'HueRotation'
                              ) !== -1
                            : false
                          : false
                      }
                      onChange={handleToggle('HueRotation')}
                      disabled={
                        activeObjects.length > 0
                          ? activeObjects.length === 1
                            ? activeObjects[0].type === 'activeSelection' ||
                              activeObjects[0].type === 'path'
                            : true
                          : true
                      }
                      name="Hue-rotate"
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
                  min={-1}
                  max={1}
                  value={filterValue('HueRotation')}
                  step={0.1}
                  onChangeCommitted={handleChangeCommitted}
                  onInputChange={(e) => handleInputChange(e, 'HueRotation')}
                  onChange={_.debounce(
                    (e, v) => handleSliderChange(e, v, 'HueRotation'),
                    10
                  )}
                  disabled={
                    activeObjects.length > 0
                      ? activeObjects.length === 1
                        ? activeObjects[0].type === 'activeSelection' ||
                          activeObjects[0].type === 'path'
                          ? true
                          : activeObjects[0].filters.findIndex(
                              (filter) => filter.type === 'HueRotation'
                            ) === -1
                        : true
                      : true
                  }
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem1}>
          <ListItemText id="distance" primary="Blur" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      id={'Blur'}
                      checked={
                        activeObjects.length > 0
                          ? activeObjects.length === 1 &&
                            activeObjects[0].type === 'image'
                            ? activeObjects[0].filters.findIndex(
                                (filter) => filter.type === 'Blur'
                              ) !== -1
                            : false
                          : false
                      }
                      onChange={handleToggle('Blur')}
                      disabled={
                        activeObjects.length > 0
                          ? activeObjects.length === 1
                            ? activeObjects[0].type === 'activeSelection' ||
                              activeObjects[0].type === 'path'
                            : true
                          : true
                      }
                      name="Blur"
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
                  value={filterValue('Blur')}
                  step={0.1}
                  onChangeCommitted={handleChangeCommitted}
                  onInputChange={(e) => handleInputChange(e, 'Blur')}
                  onChange={_.debounce(
                    (e, v) => handleSliderChange(e, v, 'Blur'),
                    10
                  )}
                  disabled={
                    activeObjects.length > 0
                      ? activeObjects.length === 1
                        ? activeObjects[0].type === 'activeSelection' ||
                          activeObjects[0].type === 'path'
                          ? true
                          : activeObjects[0].filters.findIndex(
                              (filter) => filter.type === 'Blur'
                            ) === -1
                        : true
                      : true
                  }
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Accordion>
  )
}

export default Filters
