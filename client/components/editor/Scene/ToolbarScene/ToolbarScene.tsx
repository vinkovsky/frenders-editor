import React, { FunctionComponent, useEffect } from 'react'
import {
  Box,
  Toolbar as MuiToolbar,
  AppBar as MuiAppBar,
} from '@material-ui/core'

import { Fab, ToggleButton, Tooltip } from '@ui/index'
import { useRendererStore } from '@store/editor/renderer'
import { useTransformSceneStore } from '@store/editor/transformScene'
import ToolsScene from '../ToolsScene'

import { useStyles } from './ToolbarScene.styles'

const ToolbarScene: FunctionComponent<any> = ({ screenScene }) => {
  const classes = useStyles()
  const { isRayTracing } = useRendererStore<any>((state: any) => state.data)
  const { switchRenderer } = useRendererStore<any>((state: any) => state.api)
  const { toggleSceneFullscreen } = useTransformSceneStore<any>(
    (state: any) => state.api
  )
  const { show } = useTransformSceneStore<any>((state: any) => state.data)

  const handleToggleClick = () => {
    !show ? screenScene.enter() : screenScene.exit()
    toggleSceneFullscreen(!show)
  }

  const handleRendererClick = () => switchRenderer(!isRayTracing)

  useEffect(() => {
    const onKeyDown = (e) => {
      e.stopPropagation()
      if ((e.metaKey || e.shiftKey) && e.code === 'KeyQ') handleRendererClick()
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handleRendererClick])

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
        <ToolsScene />
        <Tooltip
          title={
            isRayTracing ? 'Stop render (Shift+Q)' : 'Run render (Shift+Q)'
          }
          arrow
        >
          <Fab
            icon={isRayTracing ? 'stop' : 'run'}
            className={classes.fabButton}
            onClick={handleRendererClick}
          />
        </Tooltip>
        <Box>
          <ToggleButton
            icon={show ? 'fullscreen' : 'fullscreenExit'}
            value={show ? 'fullscreen' : 'fullscreenExit'}
            selected={show}
            title={'Fullscreen scene'}
            onClick={handleToggleClick}
          />
        </Box>
      </MuiToolbar>
    </MuiAppBar>
  )
}

export default ToolbarScene
