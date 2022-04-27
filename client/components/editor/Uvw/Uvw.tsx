import React, {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { fabric } from 'fabric'
import { nanoid } from 'nanoid'
import { useUnmount } from 'react-use'

import { AligningGuidelines } from '@helpers/uvw/aligningGuidelines'
import { customControls } from '@helpers/uvw/customControls'
import { drawCopy } from '@helpers/uvw/drawCopy'
import { copyThePencil } from '@helpers/uvw/copyThePencil'
import { saveMap } from '@helpers/uvw/saveMap'

import { useObjectSceneStore } from '@store/editor/objectScene'
import { useUvwStore } from '@store/editor/uvw'
import { useObjectUvwStore } from '@store/editor/objectUvw'
import { useCanvasStore } from '@store/editor/canvas'
import { useLayersUvwStore } from '@store/editor/layers'
import { useHistoryStore } from '@store/editor/history'
import { useTransformUvwStore } from '@store/editor/transformUvw'

import { useStyles } from './Uvw.styles'

const canvasOptions = {
  preserveObjectStacking: true,
  selection: true,
  defaultCursor: 'default',
  backgroundColor: '#ffffff',
  width: 512,
  height: 512,
}

const Uvw: FunctionComponent<any> = () => {
  const classes = useStyles()
  const {
    fabricCanvas,
    cacheCanvas,
    drawingCanvas,
    activeCanvas,
    isFirstLoad,
    canvasTextures,
  } = useUvwStore<any>((state: any) => state.data)
  const { advanced, general } = useCanvasStore<any>((state: any) => state.data)
  const { dataMaps, toggledMap, changedHistory, objectSettings } =
    useObjectSceneStore<any>((state: any) => state.data)
  const { activeObjects } = useObjectUvwStore<any>((state: any) => state.data)
  const { gridSnap } = useTransformUvwStore<any>((state: any) => state.data)
  const { setHistoryUvwDataMap } = useHistoryStore<any>(
    (state: any) => state.api
  )
  const { material, maps } = useObjectSceneStore<any>((state: any) => state.api)
  const { setLayersUvwData } = useLayersUvwStore<any>((state: any) => state.api)
  const { setFabricCanvas, setCacheCanvas, setIsFirstLoad, setDrawingCanvas } =
    useUvwStore<any>((state: any) => state.api)
  const { obj } = useObjectUvwStore<any>((state: any) => state.api)

  const isDrawing = useRef<boolean>(false)
  const [pathCreated, setPathCreated] = useState<boolean>(false)

  const [uvwBound, setUvwBound] = useState<any>(null)

  const cacheCanvasRef = useRef<any>([])

  useUnmount(() => setIsFirstLoad(true))


  const initFabricCanvas = useCallback((el) => {
    if (el) {
      const canvas = new fabric.Canvas(el, canvasOptions)
      customControls(canvas)
      setFabricCanvas(canvas)
    }
  }, [])

  useEffect(() => {
    if (fabricCanvas) {
      let alignControls
      if (gridSnap) {
        alignControls = new AligningGuidelines(fabricCanvas)
      }
      return () => alignControls && alignControls.dispose()
    }
  }, [fabricCanvas, gridSnap])

  useEffect(() => {
    if (cacheCanvasRef.current.length > 0) {
      setCacheCanvas(cacheCanvasRef.current)
    }
  }, [])

  const initDrawingCanvas = useCallback((el) => {
    if (el) {
      const canvas = new fabric.Canvas(el, {
        ...canvasOptions,
        containerClass: 'drawingCanvas',
      })
      setDrawingCanvas(canvas)
    }
  }, [])

  useEffect(() => {
    if (
      fabricCanvas &&
      canvasTextures.length > 0 &&
      cacheCanvas.length > 0 &&
      !isFirstLoad
    ) {
      if (changedHistory) {
        dataMaps.map((map, i) => {
          //  if (map.dirty) {
          fabricCanvas.discardActiveObject()
          fabricCanvas.loadFromJSON(dataMaps[i].dataMap[0], () => {
            fabricCanvas.renderAll()
            drawCopy(fabricCanvas, cacheCanvas[i])
            canvasTextures[i].needsUpdate = true
            fabricCanvas.loadFromJSON(dataMaps[activeCanvas].dataMap[0], () => {
              fabricCanvas.renderAll()
              drawCopy(fabricCanvas, cacheCanvas[activeCanvas])
              canvasTextures[activeCanvas].needsUpdate = true
              const fabricObjects = fabricCanvas.getObjects()
              setLayersUvwData({
                mapName: canvasTextures[activeCanvas].name,
                fabricObjects: fabricObjects,
              })

              activeObjects.map((active) => {
                // if (!active) return

                if (active.type === 'activeSelection') {
                  const objects = fabricObjects.filter(
                    (el, i) => active._objects[i]?.id == el.id
                  )

                  const sel = new fabric.ActiveSelection(objects, {
                    canvas: fabricCanvas,
                  })

                  obj.setActiveObjects([sel])
                  fabricCanvas.setActiveObject(sel).renderAll()
                } else {
                  const o = fabricObjects.filter((el) => active.id === el.id)[0]

                  if (o) {
                    obj.setActiveObjects([o])

                    // fabricCanvas.discardActiveObject().renderAll()
                    fabricCanvas.setActiveObject(o).renderAll()
                  }
                }
              })
            })
          })
          //   }
        })

        maps.changeHistory({ value: false })
      }
    }
  }, [
    dataMaps,
    canvasTextures,
    isFirstLoad,
    changedHistory,
    activeObjects,
    cacheCanvas,
    fabricCanvas,
    activeCanvas,
  ])

  useEffect(() => {
    if (
      fabricCanvas &&
      canvasTextures.length > 0 &&
      cacheCanvas.length > 0 &&
      !isFirstLoad
    ) {
      if (toggledMap) {
        dataMaps.map(({ mapName, disabled }, i) => {
          if (disabled) {
            const ctx = cacheCanvasRef.current[i].getContext('2d')
            ctx.fillStyle = mapName == 'normalMap' ? '#8080ff' : '#ffffff'
            ctx.fillRect(0, 0, canvasOptions.width, canvasOptions.height)
            canvasTextures[i].needsUpdate = true
          } else if (toggledMap == mapName) {
            fabricCanvas.loadFromJSON(dataMaps[i].dataMap[0], () => {
              fabricCanvas.renderAll()
              drawCopy(fabricCanvas, cacheCanvas[i])
              canvasTextures[i].needsUpdate = true
              fabricCanvas.loadFromJSON(
                dataMaps[activeCanvas].dataMap[0],
                () => {
                  fabricCanvas.renderAll()
                  drawCopy(fabricCanvas, cacheCanvas[activeCanvas])
                  canvasTextures[activeCanvas].needsUpdate = true
                }
              )
            })
          }
        })
        material.setToggledMap({ value: null })
      }
    }
  }, [
    dataMaps,
    canvasTextures,
    isFirstLoad,
    toggledMap,
    cacheCanvas,
    fabricCanvas,
    activeCanvas,
  ])

  // update cache canvas & canvasTexture data
  useEffect(() => {
    if (fabricCanvas && cacheCanvas.length > 0 && canvasTextures.length > 0) {
      const afterRender = () => {
        fabricCanvas.off('after:render', afterRender)
        drawCopy(fabricCanvas, cacheCanvas[activeCanvas])
        canvasTextures[activeCanvas].needsUpdate = true
        setTimeout(() => {
          fabricCanvas.on('after:render', afterRender)
        })
      }
      fabricCanvas.on('after:render', afterRender)
      return () => {
        fabricCanvas.off('after:render', afterRender)
      }
    }
  }, [fabricCanvas, cacheCanvas, activeCanvas, canvasTextures])

  //save current fabric canvas data
  useEffect(() => {
    if (
      fabricCanvas &&
      canvasTextures.length > 0 /* && activeObjects.length > 0*/
    ) {
      const saveCurrentMap = ({ target }) => {
        if (target) {
          saveMap(
            maps,
            fabricCanvas,
            canvasTextures,
            activeCanvas,
            setHistoryUvwDataMap
          )
        }
      }

      fabricCanvas.on('mouse:up', saveCurrentMap)

      return () => {
        fabricCanvas.off('mouse:up', saveCurrentMap)
      }
    }
  }, [fabricCanvas, maps, canvasTextures, activeCanvas])

  // load all fabric canvas data
  useEffect(() => {
    if (
      isFirstLoad &&
      fabricCanvas &&
      canvasTextures.length > 0 &&
      cacheCanvas.length > 0
    ) {
      // load all fabric canvas data
      const loadMap = (fabricCanvas, cacheCanvas, index) => {
        if (dataMaps[index].mapName == 'normalMap') {
          fabricCanvas.backgroundColor = '#8080ff'
        }
        fabricCanvas.renderAll()
        const json = dataMaps[index].disabled
          ? JSON.stringify(fabricCanvas.toJSON())
          : dataMaps[index].dataMap
            ? dataMaps[index].dataMap[0]
            : JSON.stringify(fabricCanvas.toJSON())
        fabricCanvas.loadFromJSON(json, () => {
          drawCopy(fabricCanvas, cacheCanvas[index])
          canvasTextures[index].needsUpdate = true
          if (index > 0) {
            return loadMap(fabricCanvas, cacheCanvas, --index)
          } else {
            return setIsFirstLoad(false)
          }
        })
      }

      // const uvw_url =
      //   currentObjectScene.name === 'Base'
      //     ? '/editor/uvw/uv.svg'
      //     : '/editor/uvw/uvw.svg'
      const url = objectSettings.name == 'sceneobj' ? '/editor/uvw/uvw.svg' : '/editor/uvw/cup_uvw.svg'
      fabric.loadSVGFromURL(url, (objects, options) => {
        const svg = fabric.util.groupSVGElements(objects, options)

        svg.left = svg.width / 4
        svg.top = svg.height / 4
        svg.selectable = false
        svg.evented = true

        svg.scaleToWidth(fabricCanvas.width)
        svg.scaleToHeight(fabricCanvas.height)
        svg.width = 512
        svg.height = 512

        svg.excludeFromExport = true

        loadMap(fabricCanvas, cacheCanvas, canvasTextures.length - 1)
        setUvwBound(svg)
      })
    }
  }, [
    fabricCanvas,
    cacheCanvas,
    dataMaps,
    isFirstLoad,
    canvasTextures,
    setIsFirstLoad,
  ])

  useEffect(() => {
    if (uvwBound && fabricCanvas) {
      if (general.hideUvwBound) {
        fabricCanvas.setOverlayImage(
          null,
          fabricCanvas.renderAll.bind(fabricCanvas)
        )
      } else {
        fabricCanvas.setOverlayImage(
          uvwBound,
          fabricCanvas.renderAll.bind(fabricCanvas)
        )
      }
    }
  }, [general.hideUvwBound, uvwBound, fabricCanvas])

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.backgroundColor = general.backgroundColor
      fabricCanvas.renderAll()
      saveMap(
        maps,
        fabricCanvas,
        canvasTextures,
        activeCanvas,
        setHistoryUvwDataMap
      )
    }
  }, [general.backgroundColor])

  //update fabric canvas data after switching map
  useEffect(() => {
    if (!isFirstLoad) {
      if (dataMaps[activeCanvas].dataMap) {
        fabricCanvas.discardActiveObject()
        fabricCanvas.loadFromJSON(dataMaps[activeCanvas].dataMap[0])
      } else {
        if (fabricCanvas.getObjects().length > 0) {
          fabricCanvas.getObjects().forEach((obj) => {
            fabricCanvas.remove(obj)
          })
        }
        // fabricCanvas.renderAll()
      }
    }
  }, [activeCanvas, fabricCanvas, isFirstLoad])

  useEffect(() => {
    if (fabricCanvas) {
      const onMouseDown = (e) => {
        if (e.target === null) {
          obj.setActiveObjects([])
        } else {
          if (e.e.shiftKey && e.target.group) {
            obj.setActiveObjects(e.target.group._objects)
          } else {
            obj.setActiveObjects([e.target])
          }
        }
      }
      fabricCanvas.on('mouse:down', onMouseDown)
      return () => {
        fabricCanvas.off('mouse:down', onMouseDown)
      }
    }
  }, [fabricCanvas, obj])

  useEffect(() => {
    if (fabricCanvas && canvasTextures.length > 0) {
      const onPathCreated = (e) => {
        const pathId = nanoid()
        e.path.id = pathId
        obj.setInitSettingsActiveObject([
          {
            ...e.path,
            id: pathId,
            angle: e.path.angle,
            lockMovementX: false,
            lockMovementY: false,
            lockRotation: false,
            lockScalingX: false,
            lockScalingY: false,
            lockScalingFlip: false,
            hasControls: true,
            hasBorders: true,
          },
        ])
        setPathCreated(true)
        fabricCanvas.setActiveObject(e.path)
      }
      fabricCanvas.on('path:created', onPathCreated)
      return () => {
        fabricCanvas.off('path:created', onPathCreated)
      }
    }
  }, [fabricCanvas, canvasTextures, obj])

  useEffect(() => {
    if (fabricCanvas && pathCreated) {
      setLayersUvwData({
        mapName: canvasTextures[activeCanvas].name,
        fabricObjects: fabricCanvas.getObjects(),
      })
      saveMap(
        maps,
        fabricCanvas,
        canvasTextures,
        activeCanvas,
        setHistoryUvwDataMap
      )
      setPathCreated(false)
    }
  }, [
    fabricCanvas,
    activeCanvas,
    pathCreated,
    setLayersUvwData,
    canvasTextures,
    maps,
  ])

  // useEffect(() => {
  //   if (fabricCanvas) {
  //     fabricCanvas.discardActiveObject()
  //     obj.setActiveObjects([])
  //   }
  // }, [fabricCanvas, obj])

  useEffect(() => {
    if (fabricCanvas) {
      const onSelectionCreated = (e) => {
        obj.setActiveObjects(e.selected)
        if (e.target.type === 'activeSelection') {
          e.selected.map((elem) => {
            if (elem.lockMovementX) {
              elem.selectable = false
              elem.evented = false
              fabricCanvas.discardActiveObject()
            }
          })
        }
      }
      fabricCanvas.on('selection:created', onSelectionCreated)
      return () => {
        fabricCanvas.off('selection:created', onSelectionCreated)
      }
    }
  }, [fabricCanvas, obj])

  useEffect(() => {
    if (fabricCanvas) {
      const onObjectMoving = (e) => {
        if (e.target.type != 'activeSelection') {
          obj.setTransformObjectUvw({
            area: 'left',
            value: e.target.left,
          })
          obj.setTransformObjectUvw({
            area: 'top',
            value: e.target.top,
          })
        }
      }
      fabricCanvas.on('object:moving', onObjectMoving)
      return () => {
        fabricCanvas.off('object:moving', onObjectMoving)
      }
    }
  }, [fabricCanvas, obj])

  useEffect(() => {
    if (fabricCanvas) {
      const onObjectRotating = (e) => {
        if (e.target.type != 'activeSelection') {
          obj.setTransformObjectUvw({
            area: 'angle',
            value: e.target.angle,
          })
        }
      }
      fabricCanvas.on('object:rotating', onObjectRotating)
      return () => {
        fabricCanvas.off('object:rotating', onObjectRotating)
      }
    }
  }, [fabricCanvas, obj])

  useEffect(() => {
    if (fabricCanvas) {
      const onObjectScaling = (e) => {
        if (e.target.type != 'activeSelection') {
          obj.setTransformObjectUvw({
            area: 'scaleX',
            value: e.target.scaleX,
          })
          obj.setTransformObjectUvw({
            area: 'scaleY',
            value: e.target.scaleY,
          })
        }
      }
      fabricCanvas.on('object:scaling', onObjectScaling)
      return () => {
        fabricCanvas.off('object:scaling', onObjectScaling)
      }
    }
  }, [fabricCanvas, obj])

  // Draw settings
  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.isDrawingMode = advanced.toggleModeAction
      fabricCanvas.freeDrawingBrush.width = advanced.width
      fabricCanvas.freeDrawingBrush.color = advanced.color
    }
  }, [fabricCanvas, advanced])

  useEffect(() => {
    if (drawingCanvas && fabricCanvas) {
      drawingCanvas.freeDrawingBrush.width = fabricCanvas.freeDrawingBrush.width
      drawingCanvas.freeDrawingBrush.color = fabricCanvas.freeDrawingBrush.color
      drawingCanvas.isDrawingMode = fabricCanvas.isDrawingMode
    }
  }, [drawingCanvas, fabricCanvas])

  useEffect(() => {
    if (fabricCanvas && drawingCanvas && canvasTextures.length > 0) {
      const onMouseMove = (opt) => {
        copyThePencil(fabricCanvas, drawingCanvas, cacheCanvas[activeCanvas])
        canvasTextures[activeCanvas].needsUpdate = true
        if (fabricCanvas.isDrawingMode && isDrawing.current) {
          const pointer = fabricCanvas.getPointer(opt.e)
          drawingCanvas.freeDrawingBrush.onMouseMove(pointer, opt)
        }
      }

      const onMouseDown = (opt) => {
        isDrawing.current = true
        if (fabricCanvas.isDrawingMode) {
          const pointer = fabricCanvas.getPointer(opt.e)
          drawingCanvas.freeDrawingBrush.onMouseDown(pointer, opt)
        }
      }

      const onMouseUp = (opt) => {
        isDrawing.current = false
        if (fabricCanvas.isDrawingMode) {
          drawingCanvas.clear()
          drawingCanvas.freeDrawingBrush.onMouseUp(opt)
          fabricCanvas.requestRenderAll()
        }
      }
      fabricCanvas.on('mouse:down', onMouseDown)
      fabricCanvas.on('mouse:move', onMouseMove)
      fabricCanvas.on('mouse:up', onMouseUp)
      return () => {
        fabricCanvas.off('mouse:down', onMouseDown)
        fabricCanvas.off('mouse:move', onMouseMove)
        fabricCanvas.off('mouse:up', onMouseUp)
      }
    }
  }, [fabricCanvas, drawingCanvas, canvasTextures, activeCanvas, cacheCanvas])

  return (
    <div className={classes.scrollbar}>
      <canvas ref={initFabricCanvas} />
      <canvas
        ref={initDrawingCanvas}
        style={{
          display: 'none',
        }}
      />
      {dataMaps.map(({ mapName }, index: number) => {
        return (
          <canvas
            key={mapName}
            ref={(el) => el && (cacheCanvasRef.current[index] = el)}
            style={{
              display: 'none',
            }}
            width={canvasOptions.width}
            height={canvasOptions.height}
          />
        )
      })}
    </div>
  )
}

export default memo(Uvw)
