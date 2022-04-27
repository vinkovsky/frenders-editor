import React, { FunctionComponent, useEffect } from 'react'
import {
  Toolbar as MuiToolbar,
  AppBar as MuiAppBar,
  Box,
} from '@material-ui/core'

import { ToggleButton } from '@ui/index'
import ToolsUvw from '../ToolsUvw'
import { useTransformUvwStore } from '@store/editor/transformUvw'
import { useUvwStore } from '@store/editor/uvw'

import { useStyles } from './ToolbarUvw.styles'

const ToolbarUvw: FunctionComponent<any> = ({ screenUvw }) => {
  const classes = useStyles()
  const { toggleUvwFullscreen } = useTransformUvwStore<any>(
    (state: any) => state.api
  )
  const { show } = useTransformUvwStore<any>((state: any) => state.data)

  const handleToggleClick = () => {
    !show ? screenUvw.enter() : screenUvw.exit()
    toggleUvwFullscreen(!show)
  }

  const { fabricCanvas } = useUvwStore<any>((state: any) => state.data)

  useEffect(() => {
    if (fabricCanvas) {
      let zoom = 1
      let lastPosX, lastPosY

      if (show) {
        fabricCanvas.setZoom(2)
        fabricCanvas.setDimensions({ width: 1024, height: 1024 })
        fabricCanvas.setViewportTransform([2, 0, 0, 2, 0, 0])
      } else {
        fabricCanvas.setZoom(1)
        fabricCanvas.setDimensions({ width: 512, height: 512 })
        fabricCanvas.setViewportTransform([1, 0, 0, 1, 0, 0])
      }

      const onMouseWheel = (opt) => {
        const delta: number = opt.e.deltaY
        zoom = fabricCanvas.getZoom()
        zoom += delta / 200
        if (zoom > 20) zoom = 20
        const zoomNum = show ? 2 : 1
        if (zoom < zoomNum) zoom = zoomNum
        const ratio: number =
          fabricCanvas.width / fabricCanvas.wrapperEl.offsetWidth
        fabricCanvas.zoomToPoint(
          { x: opt.e.offsetX * ratio, y: opt.e.offsetY * ratio },
          zoom
        )
        if (zoom < 0.1) {
          fabricCanvas.viewportTransform[4] = fabricCanvas.getWidth() * zoom
          fabricCanvas.viewportTransform[5] = fabricCanvas.getWidth() * zoom
        } else {
          if (fabricCanvas.viewportTransform[4] >= 0) {
            fabricCanvas.viewportTransform[4] = 0
          } else if (
            fabricCanvas.viewportTransform[4] <
            fabricCanvas.getHeight() - fabricCanvas.getHeight() * zoom
          ) {
            fabricCanvas.viewportTransform[4] =
              fabricCanvas.getHeight() - fabricCanvas.getHeight() * zoom
          }
          if (fabricCanvas.viewportTransform[5] >= 0) {
            fabricCanvas.viewportTransform[5] = 0
          } else if (
            fabricCanvas.viewportTransform[5] <
            fabricCanvas.getHeight() - fabricCanvas.getHeight() * zoom
          ) {
            fabricCanvas.viewportTransform[5] =
              fabricCanvas.getHeight() - fabricCanvas.getHeight() * zoom
          }
        }
        fabricCanvas.requestRenderAll()
        opt.e.preventDefault()
        opt.e.stopPropagation()
      }

      const onMouseDown = (opt) => {
        const evt = opt.e
        if (evt.altKey === true) {
          fabricCanvas.isDragging = true
          fabricCanvas.selection = false
          fabricCanvas.forEachObject((o) => {
            o.selectable = false
            o.evented = false
            o.setCoords()
          })
          fabricCanvas._currentTransform = null
          lastPosX = evt.clientX
          lastPosY = evt.clientY
          fabricCanvas.discardActiveObject()
        }
      }

      const onMouseMove = (opt) => {
        if (fabricCanvas.isDragging) {
          const e = opt.e
          if (zoom < 0.1) {
            fabricCanvas.viewportTransform[4] = fabricCanvas.getWidth() * zoom
            fabricCanvas.viewportTransform[5] = fabricCanvas.getWidth() * zoom
          } else {
            fabricCanvas.viewportTransform[4] += e.clientX - lastPosX
            fabricCanvas.viewportTransform[5] += e.clientY - lastPosY
            if (fabricCanvas.viewportTransform[4] >= 0) {
              fabricCanvas.viewportTransform[4] = 0
            } else if (
              fabricCanvas.viewportTransform[4] <
              fabricCanvas.getWidth() - fabricCanvas.getHeight() * zoom
            ) {
              fabricCanvas.viewportTransform[4] =
                fabricCanvas.getWidth() - fabricCanvas.getHeight() * zoom
            }
            if (fabricCanvas.viewportTransform[5] >= 0) {
              fabricCanvas.viewportTransform[5] = 0
            } else if (
              fabricCanvas.viewportTransform[5] <
              fabricCanvas.getHeight() - fabricCanvas.getHeight() * zoom
            ) {
              fabricCanvas.viewportTransform[5] =
                fabricCanvas.getHeight() - fabricCanvas.getHeight() * zoom
            }
          }
          fabricCanvas.requestRenderAll()
          lastPosX = e.clientX
          lastPosY = e.clientY
        }
      }

      const onMouseUp = () => {
        fabricCanvas.requestRenderAll()
        fabricCanvas.isDragging = false
        fabricCanvas.selection = true
        fabricCanvas.forEachObject((o) => {
          o.selectable = true
          o.evented = true
          o.setCoords()
        })
      }

      fabricCanvas.on('mouse:wheel', onMouseWheel)
      fabricCanvas.on('mouse:move', onMouseMove)
      fabricCanvas.on('mouse:up', onMouseUp)
      fabricCanvas.on('mouse:down', onMouseDown)

      return () => {
        fabricCanvas.off('mouse:move', onMouseMove)
        fabricCanvas.off('mouse:up', onMouseUp)
        fabricCanvas.off('mouse:wheel', onMouseWheel)
        fabricCanvas.off('mouse:down', onMouseDown)
      }
    }
  }, [fabricCanvas, show])

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
        <ToolsUvw />
        <Box>
          <ToggleButton
            icon={show ? 'fullscreen' : 'fullscreenExit'}
            value={show ? 'fullscreen' : 'fullscreenExit'}
            selected={show}
            title={'Fullscreen uvw'}
            onClick={handleToggleClick}
            // onClick={() => toggleUvwFullscreen((state) => !state)}
          />
        </Box>
      </MuiToolbar>
    </MuiAppBar>
  )
}

export default ToolbarUvw
