import React, { FunctionComponent, useEffect, useRef } from 'react'
import { Divider } from '@material-ui/core'
import { fabric } from 'fabric'
import { nanoid } from 'nanoid'

import { IconButton, ToggleButton, Tooltip } from '@ui/index'
import { useTransformUvwStore } from '@store/editor/transformUvw'
import { useUvwStore } from '@store/editor/uvw'
import { useObjectSceneStore } from '@store/editor/objectScene'
import { useLayersUvwStore } from '@store/editor/layers'
import { saveMap } from '@helpers/uvw/saveMap'
import { useObjectUvwStore } from '@store/editor/objectUvw'
import { useHistoryStore } from '@store/editor/history'

import { useStyles } from './ToolsUvw.styles'

const ToolsUvw: FunctionComponent<any> = () => {
  const classes = useStyles()
  const clipboardRef = useRef<any>([])
  const { gridSnap } = useTransformUvwStore<any>((state: any) => state.data)
  const { toggleGridSnap } = useTransformUvwStore<any>(
    (state: any) => state.api
  )
  const { fabricCanvas, activeCanvas, canvasTextures } = useUvwStore<any>(
    (state: any) => state.data
  )
  const { maps } = useObjectSceneStore<any>((state: any) => state.api)
  const { obj } = useObjectUvwStore<any>((state: any) => state.api)
  const { setLayersUvwData } = useLayersUvwStore<any>((state: any) => state.api)

  const { setHistoryUvwDataMap } = useHistoryStore<any>(
    (state: any) => state.api
  )

  const handleGridSnapChange = () => toggleGridSnap(!gridSnap)

  const handleClear = () => {
    const objects = fabricCanvas.getObjects()
    if (objects) {
      objects.forEach((object) => {
        fabricCanvas.remove(object)
      })
      fabricCanvas.discardActiveObject()
    }
    setLayersUvwData({
      mapName: canvasTextures[activeCanvas].name,
      fabricObjects: fabricCanvas.getObjects(),
    })
    obj.setActiveObjects(objects)
    fabricCanvas.requestRenderAll()

    saveMap(
      maps,
      fabricCanvas,
      canvasTextures,
      activeCanvas,
      setHistoryUvwDataMap
    )
  }

  const handleSelect = () => {
    fabricCanvas.discardActiveObject()
    const sel = new fabric.ActiveSelection(fabricCanvas.getObjects(), {
      canvas: fabricCanvas,
    })
    fabricCanvas.setActiveObject(sel)
    fabricCanvas.requestRenderAll()
  }

  const handleUnselect = () => {
    fabricCanvas.discardActiveObject()
    obj.setActiveObjects([])
    fabricCanvas.requestRenderAll()
  }

  const handleDelete = () => {
    const activeObj = fabricCanvas.getActiveObjects()
    if (activeObj) {
      activeObj.forEach((object) => {
        fabricCanvas.remove(object)
      })
      fabricCanvas.discardActiveObject()
    }
    setLayersUvwData({
      mapName: canvasTextures[activeCanvas].name,
      fabricObjects: fabricCanvas.getObjects(),
    })
    obj.setActiveObjects(activeObj)
    fabricCanvas.requestRenderAll()

    saveMap(
      maps,
      fabricCanvas,
      canvasTextures,
      activeCanvas,
      setHistoryUvwDataMap
    )
  }

  const handleCopy = () => {
    const active = fabricCanvas.getActiveObject()
    if (active) {
      active.clone((cloned) => {
        cloned.set({
          id: nanoid(),
          left: cloned.left + 10,
          top: cloned.top + 10,
        })
        clipboardRef.current = cloned
      })
    }
  }

  const handleCut = () => {
    const active = fabricCanvas.getActiveObject()
    if (active) {
      active.clone((cloned) => {
        clipboardRef.current = cloned
      })
    }
    handleDelete()
  }

  const handlePaste = () => {
    if (!clipboardRef.current) return
    clipboardRef.current.clone((clonedObj) => {
      fabricCanvas.discardActiveObject()

      clonedObj.set({
        id: nanoid(),
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      })

      if (clonedObj.type === 'activeSelection') {
        clonedObj.canvas = fabricCanvas
        clonedObj.forEachObject((object) => {
          object.set({
            id: nanoid(),
          })
          fabricCanvas.add(object)

          clonedObj.setCoords()
          obj.setActiveObjects([{ ...object }])

          obj.setInitSettingsActiveObject([{ ...object }])
          setLayersUvwData({
            mapName: canvasTextures[activeCanvas].name,
            fabricObjects: fabricCanvas.getObjects(),
          })
        })
      } else {
        fabricCanvas.add(clonedObj)
        obj.setInitSettingsActiveObject([{ ...clonedObj }])
        obj.setActiveObjects([{ ...clonedObj }])
        setLayersUvwData({
          mapName: canvasTextures[activeCanvas].name,
          fabricObjects: fabricCanvas.getObjects(),
        })
      }
      fabricCanvas.setActiveObject(clonedObj)
      fabricCanvas.requestRenderAll()

      saveMap(
        maps,
        fabricCanvas,
        canvasTextures,
        activeCanvas,
        setHistoryUvwDataMap
      )
    })
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      e.stopPropagation()
      if ((e.metaKey || e.ctrlKey) && e.code === 'KeyC') handleCopy()
      else if ((e.metaKey || e.ctrlKey) && e.code === 'KeyV') handlePaste()
      else if ((e.metaKey || e.ctrlKey) && e.code === 'KeyX') handleCut()
      else if ((e.metaKey || e.ctrlKey) && e.code === 'KeyA') handleSelect()
      else if ((e.metaKey || e.ctrlKey) && e.code === 'KeyD') handleUnselect()
      else if (e.code === 'Delete') handleDelete()
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [
    handleCopy,
    handlePaste,
    handleCut,
    handleSelect,
    handleUnselect,
    fabricCanvas,
  ])

  return (
    <div className={classes.tools}>
      <ToggleButton
        value="gridSnap"
        icon={gridSnap ? 'gridSnapOn' : 'gridSnapOff'}
        selected={gridSnap}
        title={'Snap grid uvw'}
        onChange={handleGridSnapChange}
      />
      <Divider className={classes.divider} />
      <Tooltip title={'Copy (Ctrl+C)'} arrow>
        <IconButton
          icon={'copy'}
          className={classes.button}
          onClick={handleCopy}
        />
      </Tooltip>
      <Tooltip title={'Cut (Ctrl+X)'} arrow>
        <IconButton
          icon={'cut'}
          className={classes.button}
          onClick={handleCut}
        />
      </Tooltip>
      <Tooltip title={'Paste (Ctrl+V)'} arrow>
        <IconButton
          icon={'paste'}
          className={classes.button}
          onClick={handlePaste}
        />
      </Tooltip>
      <Divider className={classes.divider} />
      <Tooltip title={'Clear'} arrow>
        <IconButton
          icon={'clear'}
          className={classes.button}
          onClick={handleClear}
        />
      </Tooltip>
      <Tooltip title={'Delete (Del)'} arrow>
        <IconButton
          icon={'delete'}
          className={classes.button}
          onClick={handleDelete}
        />
      </Tooltip>
    </div>
  )
}

export default ToolsUvw
