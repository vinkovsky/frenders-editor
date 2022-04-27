import React, { ChangeEvent, FunctionComponent } from 'react'
import {
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'

import { Accordion, IconButton, Slider, Switch } from '@ui/index'
import { useCameraStore } from '@store/editor/camera'
import TransformData from '../Object/Scene/TransformData'

import { useStyles } from './Camera.styles'

const Camera: FunctionComponent<any> = () => {
  const classes = useStyles()
  const cameraSettings = useCameraStore<any>((state: any) => state.data)
  const {
    toggleLockedCamera,
    setTransformCamera,
    setFovCamera,
    setToDefaultCamera,
  } = useCameraStore<any>((state: any) => state.api)

  const handleLockCamera = (value: boolean) => toggleLockedCamera(value)

  const handleReset = () => setToDefaultCamera()

  const handleFovChange = (
    event: ChangeEvent<any>,
    newValue: number | number[]
  ) => setFovCamera(newValue)

  const handleInputChange = (event: ChangeEvent<any>) =>
    setFovCamera(Number(event.target.value))

  return (
    <Accordion title={'Camera settings'} icon={'camera'} defaultExpanded={true}>
      <List className={classes.root}>
        <ListItem className={classes.listItem}>
          <ListItemText id="position" primary="Position" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <TransformData
              area={'cameraPosition'}
              disabled={cameraSettings.locked}
              state={cameraSettings.cameraPosition}
              handleFunction={setTransformCamera}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="target" primary="Target" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <TransformData
              area={'targetPosition'}
              disabled={cameraSettings.locked}
              state={cameraSettings.targetPosition}
              handleFunction={setTransformCamera}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="fov" primary="FOV" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Slider
              className={classes.slider}
              onInputChange={handleInputChange}
              value={cameraSettings.fov}
              disabled={cameraSettings.locked}
              onChange={handleFovChange}
              min={20}
              max={150}
              step={1}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="lock" primary="Lock camera" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <FormControlLabel
              value="LockCamera"
              control={
                <Switch
                  onChange={(event, value: boolean) => handleLockCamera(value)}
                  checked={cameraSettings.locked}
                />
              }
              label={cameraSettings.locked ? 'On' : 'Off'}
              labelPlacement="start"
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="default" primary="Set to default" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <IconButton icon={'reset'} onClick={handleReset} />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Accordion>
  )
}

export default Camera
