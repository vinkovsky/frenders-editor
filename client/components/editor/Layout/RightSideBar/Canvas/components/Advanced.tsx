import React, { ChangeEvent, FunctionComponent } from 'react'
import {
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core'

import { Accordion, ColorPicker, IconButton, Switch } from '@ui/index'
import { SelectAreaType } from '@interfaces/editor'
import { useCanvasStore } from '@store/editor/canvas'

import { useStyles } from '../Canvas.styles'

const Advanced: FunctionComponent<any> = () => {
  const { advanced: advancedData } = useCanvasStore<any>(
    (state: any) => state.data
  )
  const { advanced: advancedApi, setToDefaultCanvas } = useCanvasStore<any>(
    (state: any) => state.api
  )
  const classes = useStyles({ color: advancedData.color })

  const handleToggleMode = (value: boolean) => advancedApi.toggleMode(value)

  const handleChangeColor = (color: string) => advancedApi.setColor(color)

  const handleChangeWidth = (event: ChangeEvent<any>) =>
    advancedApi.setWidth(Number(event.target.value))

  const handleReset = (area: SelectAreaType) => setToDefaultCanvas(area)

  return (
    <Accordion title={'Advanced'} icon={'advanced'} defaultExpanded={true}>
      <List className={classes.root_advanced}>
        <ListItem className={classes.listItem}>
          <ListItemText id="toggleMode" primary="Toggle Mode" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <FormControlLabel
              value="toggleMode"
              control={
                <Switch
                  color="primary"
                  onChange={(event, value: boolean) => handleToggleMode(value)}
                  checked={advancedData.toggleModeAction}
                />
              }
              label={advancedData.toggleModeAction ? 'Brush' : 'Move'}
              labelPlacement="start"
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="color" primary="Color" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <ColorPicker
              color={advancedData.color}
              onChange={handleChangeColor}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="width" primary="Width" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <TextField
              type={'number'}
              inputProps={{
                max: 30,
                min: 1,
              }}
              className={classes.widthInput}
              value={advancedData.width}
              onChange={(event) => handleChangeWidth(event)}
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
