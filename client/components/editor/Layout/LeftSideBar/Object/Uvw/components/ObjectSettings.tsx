import React, { ChangeEvent, FunctionComponent, useEffect } from 'react'
import {
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core'

import { Accordion, IconButton, Switch } from '@ui/index'
import { useObjectUvwStore } from '@store/editor/objectUvw'
import { useUvwStore } from '@store/editor/uvw'

import { useStyles } from '../Uvw.styles'
import { useObjectSceneStore } from '@store/editor/objectScene'
import { saveMap } from '@helpers/uvw/saveMap'
import { useHistoryStore } from '@store/editor/history'

const ObjectSettings: FunctionComponent = () => {
  const classes = useStyles()
  const { activeObjects } = useObjectUvwStore<any>((state: any) => state.data)
  const { obj } = useObjectUvwStore<any>((state: any) => state.api)
  const { maps } = useObjectSceneStore<any>((state: any) => state.api)
  const { setHistoryUvwDataMap } = useHistoryStore<any>(
    (state: any) => state.api
  )
  const { fabricCanvas, activeCanvas, canvasTextures } = useUvwStore<any>(
    (state: any) => state.data
  )

  const handleLockedObjectSettings = (
    event: ChangeEvent<any>,
    value: boolean
  ) => {
    if (activeObjects.length > 1) return
    if (value) {
      fabricCanvas.discardActiveObject()
    }
    obj.toggleLockedObjectUvw(value)
    fabricCanvas.renderAll()
    saveMap(
      maps,
      fabricCanvas,
      canvasTextures,
      activeCanvas,
      setHistoryUvwDataMap
    )
  }

  const handleTransformFunction = (event, area) => {
    if (activeObjects.length > 1) return
    obj.setTransformObjectUvw({
      area,
      value: Number(event.target.value),
    })
    fabricCanvas.renderAll()
    saveMap(
      maps,
      fabricCanvas,
      canvasTextures,
      activeCanvas,
      setHistoryUvwDataMap
    )
  }

  const handleReset = () => {
    if (activeObjects.length > 1) return
    obj.setToDefaultObjectUvw()
    fabricCanvas.renderAll()
    saveMap(
      maps,
      fabricCanvas,
      canvasTextures,
      activeCanvas,
      setHistoryUvwDataMap
    )
  }

  return (
    <Accordion title={'Object settings'} icon={'models'} defaultExpanded={true}>
      <List className={classes.root}>
        <ListItem className={classes.listItem}>
          <ListItemText id="position" primary="Position" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <TextField
                  type={'number'}
                  className={classes.input}
                  value={
                    activeObjects.length
                      ? activeObjects.length === 1
                        ? Number(activeObjects[0].left).toFixed(1)
                        : undefined
                      : ''
                  }
                  disabled={
                    activeObjects.length
                      ? activeObjects.length === 1
                        ? activeObjects[0].lockMovementX
                        : true
                      : true
                  }
                  onChange={(event) => handleTransformFunction(event, 'left')}
                />
              </Grid>
              <Grid item>
                <TextField
                  type={'number'}
                  className={classes.input}
                  value={
                    activeObjects.length
                      ? activeObjects.length === 1
                        ? Number(activeObjects[0].top).toFixed(1)
                        : undefined
                      : ''
                  }
                  disabled={
                    activeObjects.length
                      ? activeObjects.length === 1
                        ? activeObjects[0].lockMovementX
                        : true
                      : true
                  }
                  onChange={(event) => handleTransformFunction(event, 'top')}
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="rotation" primary="Rotation" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <TextField
                  type={'number'}
                  className={classes.input}
                  value={
                    activeObjects.length
                      ? activeObjects.length === 1
                        ? Number(activeObjects[0].angle).toFixed(1)
                        : undefined
                      : ''
                  }
                  disabled={
                    activeObjects.length
                      ? activeObjects.length === 1
                        ? activeObjects[0].lockMovementX
                        : true
                      : true
                  }
                  onChange={(event) => handleTransformFunction(event, 'angle')}
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="scale" primary="Scale" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <TextField
                  type={'number'}
                  inputProps={{
                    min: 0,
                    max: 5,
                    step: 0.1,
                  }}
                  className={classes.input}
                  value={
                    activeObjects.length
                      ? activeObjects.length === 1
                        ? Number(activeObjects[0].scaleX).toFixed(2)
                        : undefined
                      : ''
                  }
                  disabled={
                    activeObjects.length
                      ? activeObjects.length === 1
                        ? activeObjects[0].lockMovementX
                        : true
                      : true
                  }
                  onChange={(event) => handleTransformFunction(event, 'scaleX')}
                />
              </Grid>
              <Grid item>
                <TextField
                  type={'number'}
                  inputProps={{
                    min: 0,
                    max: 5,
                    step: 0.1,
                  }}
                  className={classes.input}
                  value={
                    activeObjects.length
                      ? activeObjects.length === 1
                        ? Number(activeObjects[0].scaleY).toFixed(2)
                        : undefined
                      : ''
                  }
                  disabled={
                    activeObjects.length
                      ? activeObjects.length === 1
                        ? activeObjects[0].lockMovementX
                        : true
                      : true
                  }
                  onChange={(event) => handleTransformFunction(event, 'scaleY')}
                />
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="lock" primary="Lock" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <FormControlLabel
              value="LockObjectSettings"
              control={
                <Switch
                  onChange={(event, value: boolean) =>
                    handleLockedObjectSettings(event, value)
                  }
                  disabled={!activeObjects.length || activeObjects.length > 1}
                  checked={
                    activeObjects.length
                      ? activeObjects[0].lockMovementX
                      : false
                  }
                />
              }
              label={
                activeObjects.length === 1
                  ? activeObjects[0].lockMovementX
                    ? 'On'
                    : 'Off'
                  : ''
              }
              labelPlacement="start"
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="default" primary="Set to default" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <IconButton
              icon={'reset'}
              disabled={!activeObjects.length || activeObjects.length > 1}
              onClick={() => handleReset()}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Accordion>
  )
}

export default ObjectSettings
