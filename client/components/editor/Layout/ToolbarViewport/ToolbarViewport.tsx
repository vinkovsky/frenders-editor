import React, { FunctionComponent, useEffect } from 'react'
import {
  Box,
  Toolbar as MuiToolbar,
  AppBar as MuiAppBar,
} from '@material-ui/core'

import { IconButton, Tooltip } from '@ui/index'
import { useHistoryStore } from '@store/editor/history'
import { useObjectSceneStore } from '@store/editor/objectScene'
import ToolsViewport from '../ToolsViewport'

import { useStyles } from './ToolbarViewport.styles'

const ToolbarViewport: FunctionComponent = () => {
  const classes = useStyles()
  const { setUndoHistory, setRedoHistory } = useHistoryStore<any>(
    (state: any) => state.api
  )
  const { future, past } = useHistoryStore<any>((state: any) => state.data)
  const { general, maps } = useObjectSceneStore<any>((state: any) => state.api)

  const handleUndoClick = () => {
    general.changeHistory(past[past.length - 1])
    maps.changeHistory({ value: true })
    setUndoHistory()
  }

  const handleRedoClick = () => {
    general.changeHistory(future[0])
    maps.changeHistory({ value: true })
    setRedoHistory()
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      e.stopPropagation()
      if ((e.metaKey || e.ctrlKey) && e.code === 'KeyZ' && past.length > 0) {
        handleUndoClick()
      } else if (
        (e.metaKey || e.ctrlKey) &&
        e.code === 'KeyY' &&
        future.length > 0
      ) {
        handleRedoClick()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [past, future, handleUndoClick, handleRedoClick])

  return (
    <MuiAppBar
      component="div"
      elevation={0}
      classes={{ colorPrimary: classes.colorPrimary }}
      position="relative"
    >
      <MuiToolbar
        classes={{
          dense: classes.dense,
          root: classes.root,
        }}
        variant="dense"
      >
        <ToolsViewport />
        <Box>
          <Tooltip title={'Undo (Ctrl+Z)'} arrow>
            <IconButton
              icon={'undo'}
              disabled={past.length === 0}
              onClick={handleUndoClick}
              className={classes.button}
            />
          </Tooltip>
          <Tooltip title={'Redo (Ctrl+Y)'} arrow>
            <IconButton
              icon={'redo'}
              disabled={future.length === 0}
              onClick={handleRedoClick}
              className={classes.button}
            />
          </Tooltip>
        </Box>
      </MuiToolbar>
    </MuiAppBar>
  )
}

export default ToolbarViewport
