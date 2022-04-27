import React, { FunctionComponent } from 'react'
import {
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'

import { Accordion, IconButton, Switch } from '@ui/index'
import TransformData from '../TransformData'
import { useObjectSceneStore } from '@store/editor/objectScene'

import { useStyles } from '../Scene.styles'

const ObjectSettings: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { objectSettings, currentObjectScene } = useObjectSceneStore<any>(
    (state: any) => state.data
  )
  const { obj } = useObjectSceneStore<any>((state: any) => state.api)

  const handleLockedObjectSettings = (value: boolean) =>
    obj.toggleLockedObjectScene(value)

  const handleObjectReset = () => obj.setToDefaultObjectScene()

  return (
    <Accordion title={'Object settings'} icon={'models'} defaultExpanded={true}>
      <List className={classes.root}>
        <ListItem className={classes.listItem}>
          <ListItemText id="position" primary="Position" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <TransformData
              area={'position'}
              disabled={
                currentObjectScene && currentObjectScene.type === 'Group'
                  ? objectSettings.locked
                  : true
              }
              state={
                currentObjectScene && currentObjectScene.type === 'Group'
                  ? objectSettings.position
                  : null
              }
              handleFunction={obj.setTransformObjectScene}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="rotation" primary="Rotation" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <TransformData
              area={'rotation'}
              disabled={
                currentObjectScene && currentObjectScene.type === 'Group'
                  ? objectSettings.locked
                  : true
              }
              state={
                currentObjectScene && currentObjectScene.type === 'Group'
                  ? objectSettings.rotation
                  : null
              }
              handleFunction={obj.setTransformObjectScene}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="scale" primary="Scale" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <TransformData
              area={'scale'}
              disabled={
                currentObjectScene && currentObjectScene.type === 'Group'
                  ? objectSettings.locked
                  : true
              }
              state={
                currentObjectScene && currentObjectScene.type === 'Group'
                  ? objectSettings.scale
                  : null
              }
              handleFunction={obj.setTransformObjectScene}
            />
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
                    handleLockedObjectSettings(value)
                  }
                  disabled={
                    !currentObjectScene || currentObjectScene.type !== 'Group'
                  }
                  checked={
                    currentObjectScene && currentObjectScene.type === 'Group'
                      ? objectSettings.locked
                      : false
                  }
                />
              }
              label={
                currentObjectScene && currentObjectScene.type === 'Group'
                  ? objectSettings.locked
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
            <IconButton icon={'reset'} onClick={() => handleObjectReset()} />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Accordion>
  )
}

export default ObjectSettings
