import React, { FunctionComponent } from 'react'
import {
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'

import { Accordion, ColorPicker /*, IconButton*/, Switch } from '@ui/index'
// import { SelectAreaType } from '@interfaces/editor'
import { useCanvasStore } from '@store/editor/canvas'
import { useUvwStore } from '@store/editor/uvw'
import { useObjectSceneStore } from '@store/editor/objectScene'

import { useStyles } from '../Canvas.styles'

const General: FunctionComponent<any> = () => {
  const { general: generalData } = useCanvasStore<any>(
    (state: any) => state.data
  )
  const { general: generalApi /*, setToDefaultCanvas*/ } = useCanvasStore<any>(
    (state: any) => state.api
  )
  const { dataMaps } = useObjectSceneStore<any>((state: any) => state.data)
  const { activeCanvas } = useUvwStore<any>((state: any) => state.data)

  const classes = useStyles({
    color: dataMaps[activeCanvas].dataMap
      ? JSON.parse(dataMaps[activeCanvas].dataMap[0]).background
      : generalData.backgroundColor,
  })

  const handleHideUvwBound = (value: boolean) =>
    generalApi.toggleHideUvwBound(value)

  const handleBackgroundColor = (color: string) =>
    generalApi.setBackgroundColor(color)

  // const handleReset = (area: SelectAreaType) => setToDefaultCanvas(area)

  return (
    <Accordion title={'General'} icon={'general'} defaultExpanded={true}>
      <List className={classes.root_general}>
        <ListItem className={classes.listItem}>
          <ListItemText id="hideUvwBound" primary="Hide uvw bound" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <FormControlLabel
              value="hideUvwBound"
              control={
                <Switch
                  color="primary"
                  onChange={(event, value: boolean) =>
                    handleHideUvwBound(value)
                  }
                  checked={generalData.hideUvwBound}
                />
              }
              label={generalData.hideUvwBound ? 'On' : 'Off'}
              labelPlacement="start"
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="backgroundColor" primary="Background color" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <ColorPicker
              color={
                dataMaps[activeCanvas].dataMap
                  ? JSON.parse(dataMaps[activeCanvas].dataMap[0]).background
                  : generalData.backgroundColor
              }
              onChange={handleBackgroundColor}
            />
          </ListItemSecondaryAction>
        </ListItem>
        {/*<ListItem className={classes.listItem}>*/}
        {/*  <ListItemText id="default" primary="Set to default" />*/}
        {/*  <ListItemSecondaryAction className={classes.listItemAction}>*/}
        {/*    <IconButton icon={'reset'} onClick={() => handleReset('general')} />*/}
        {/*  </ListItemSecondaryAction>*/}
        {/*</ListItem>*/}
      </List>
    </Accordion>
  )
}

export default General
