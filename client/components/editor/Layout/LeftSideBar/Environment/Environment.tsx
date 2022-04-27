import React, { ChangeEvent, FunctionComponent, useCallback } from 'react'
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import * as _ from 'lodash'

import { Accordion, IconButton, Select, Slider } from '@ui/index'
import { EnvironmentAreaType } from '@interfaces/editor/environment'
import { useEnvironmentStore } from '@store/editor/environment'
import { useAssetsStore } from '@store/editor/assets'

import 'react-colorful/dist/index.css'
import { useStyles } from './Environment.styles'

const Environment: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { currentIndexEnvironment, envs } = useEnvironmentStore<any>(
    (state: any) => state.data
  )
  const { changeActiveEnvironmentIndex } = useAssetsStore<any>(
    (state: any) => state.api
  )
  const {
    setEnvironmentSettings,
    setCurrentIndexEnvironment,
    setToDefaultEnvironment,
  } = useEnvironmentStore<any>((state: any) => state.api)

  const handleEnvironment = useCallback((event: ChangeEvent<any>) => {
    setCurrentIndexEnvironment(event.target.value)
    changeActiveEnvironmentIndex(event.target.value)
  }, [])

  const handleReset = () => setToDefaultEnvironment()

  const handleSliderChange = useCallback(
    (
      event: ChangeEvent<any>,
      newValue: number | number[],
      area: EnvironmentAreaType
    ) => {
      setEnvironmentSettings({ area, value: newValue })
    },
    []
  )

  const handleInputChange = useCallback(
    (event: ChangeEvent<any>, area: EnvironmentAreaType) => {
      setEnvironmentSettings({
        area,
        value: Number(event.target.value),
      })
    },
    []
  )

  return (
    <Accordion
      title={'Environment settings'}
      icon={'env'}
      defaultExpanded={true}
    >
      <List className={classes.root}>
        <ListItem className={classes.listItem}>
          <ListItemText id="position" primary="Choose environment" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Select
              value={currentIndexEnvironment}
              onChange={handleEnvironment}
              items={envs}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText id="exposure" primary="Exposure" />
          <ListItemSecondaryAction className={classes.listItemAction}>
            <Slider
              className={classes.slider}
              onInputChange={(event) => handleInputChange(event, 'exposure')}
              min={0}
              max={5}
              step={0.1}
              value={envs[currentIndexEnvironment].exposure}
              onChange={_.debounce(
                (event, v) => handleSliderChange(event, v, 'exposure'),
                10
              )}
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

export default Environment
