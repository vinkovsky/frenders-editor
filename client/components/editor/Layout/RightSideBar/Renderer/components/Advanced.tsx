import React, { ChangeEvent, FunctionComponent } from 'react'
import {
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core'

import { Accordion, IconButton, Switch } from '@ui/index'
import { SelectAreaType } from '@interfaces/editor'
import { useRendererStore } from '@store/editor/renderer'

import { useStyles } from '../Renderer.styles'

const Advanced: FunctionComponent<any> = () => {
  const { advanced: advancedData } = useRendererStore<any>(
    (state: any) => state.data
  )
  const { advanced: advancedApi, setToDefaultRenderer } = useRendererStore<any>(
    (state: any) => state.api
  )
  const classes = useStyles({ color: '#ffffff' })

  const handleMaxHardwareUsage = (value: boolean) =>
    advancedApi.toggleMaxHardwareUsage(value)

  const handleRenderWhenOffscreen = (value: boolean) =>
    advancedApi.toggleRenderWhenOffscreen(value)

  const handleBounces = (event: ChangeEvent<any>) =>
    advancedApi.setBounces(Number(event.target.value))

  const handleReset = (area: SelectAreaType) => setToDefaultRenderer(area)

  return (
    <Accordion title={'Advanced'} icon={'advanced'} defaultExpanded={true}>
      <List className={classes.root}>
        <ListItem className={classes.listItem}>
          <ListItemText id="maxHardwareUsage" primary="Max hardware usage" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <FormControlLabel
              value="maxHardwareUsage"
              control={
                <Switch
                  color="primary"
                  onChange={(event, value: boolean) =>
                    handleMaxHardwareUsage(value)
                  }
                  checked={advancedData.maxHardwareUsage}
                />
              }
              label={advancedData.maxHardwareUsage ? 'On' : 'Off'}
              labelPlacement="start"
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="bounces" primary="Bounces" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <TextField
              type={'number'}
              inputProps={{
                max: 6,
                min: 1,
              }}
              className={classes.bouncesInput}
              value={advancedData.bounces}
              onChange={(event) => handleBounces(event)}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText
            id="renderWhenOffscreen"
            primary="Render when offscreen"
          />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <FormControlLabel
              value="renderWhenOffscreen"
              control={
                <Switch
                  onChange={(e, value: boolean) =>
                    handleRenderWhenOffscreen(value)
                  }
                  checked={advancedData.renderWhenOffscreen}
                />
              }
              label={advancedData.renderWhenOffscreen ? 'On' : 'Off'}
              labelPlacement="start"
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="default" primary="Set to default" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <IconButton
              icon={'reset'}
              onClick={() => handleReset('advanced')}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Accordion>
  )
}

export default Advanced
