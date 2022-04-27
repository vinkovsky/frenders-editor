import React, { ChangeEvent, FunctionComponent } from 'react'

import {
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core'

import { Accordion, ColorPicker, IconButton, Switch } from '@ui/index'
import { SelectAreaType } from '@interfaces/editor'
import { useRendererStore } from '@store/editor/renderer'

import { useStyles } from '../Renderer.styles'

const tones: Array<string> = [
  'No',
  'Linear',
  'Reinhard',
  'Cineon',
  'ACESFilmic',
]

const General: FunctionComponent<any> = () => {
  const { general: generalData } = useRendererStore<any>(
    (state: any) => state.data
  )
  const { general: generalApi, setToDefaultRenderer } = useRendererStore<any>(
    (state: any) => state.api
  )

  const classes = useStyles({ color: generalData.backgroundColor })

  const handleTransparentBackground = (value: boolean) =>
    generalApi.toggleTransparentBackground(value)

  const handleBackgroundColor = (color: string) =>
    generalApi.setBackgroundColor(color)

  const handleToneMappingChange = (event: ChangeEvent<any>) =>
    handleToneMapping(event)

  const handleToneMapping = (event: ChangeEvent<any>) =>
    generalApi.setToneMapping(event.target.value)

  const handleReset = (area: SelectAreaType) => setToDefaultRenderer(area)

  return (
    <Accordion title={'General'} icon={'general'} defaultExpanded={true}>
      <List className={classes.root}>
        <ListItem className={classes.listItem}>
          <ListItemText
            id="transparentBackground"
            primary="Transp. background"
          />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <FormControlLabel
              value="transparentBackground"
              control={
                <Switch
                  color="primary"
                  onChange={(event: ChangeEvent<any>, value: boolean) =>
                    handleTransparentBackground(value)
                  }
                  checked={generalData.transparentBackground}
                />
              }
              label={generalData.transparentBackground ? 'On' : 'Off'}
              labelPlacement="start"
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="backgroundColor" primary="Background color" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <ColorPicker
              color={generalData.backgroundColor}
              onChange={handleBackgroundColor}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="toneMapping" primary="Tone Mapping" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Select
              value={generalData.toneMapping}
              onChange={handleToneMappingChange}
              className={classes.select}
            >
              {tones.map((tone: string) => (
                <MenuItem value={tone} key={tone}>
                  {tone}
                </MenuItem>
              ))}
            </Select>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="default" primary="Set to default" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <IconButton icon={'reset'} onClick={() => handleReset('general')} />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Accordion>
  )
}

export default General
