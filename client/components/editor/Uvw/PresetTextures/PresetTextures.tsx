import React, { FunctionComponent, memo, useCallback } from 'react'
import { fabric } from 'fabric'
import { nanoid } from 'nanoid'

import { useObjectSceneStore } from '@store/editor/objectScene'
import { useRendererStore } from '@store/editor/renderer'
import { useAssetsStore } from '@store/editor/assets'
import { useUvwStore } from '@store/editor/uvw'
import { useObjectUvwStore } from '@store/editor/objectUvw'
import { useLayersUvwStore } from '@store/editor/layers'
import { useHistoryStore } from '@store/editor/history'
import { saveMap } from '@helpers/uvw/saveMap'

import { useStyles } from './PresetTextures.styles'
import { useTransformUvwStore } from '@store/editor/transformUvw'

const PresetTextures: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { currentObjectScene } = useObjectSceneStore<any>(
    (state: any) => state.data
  )
  const { project } = useAssetsStore<any>((state: any) => state.data)
  const { isRayTracing } = useRendererStore<any>((state: any) => state.data)
  const { maps } = useObjectSceneStore<any>((state: any) => state.api)
  const { fabricCanvas, activeCanvas, canvasTextures } = useUvwStore<any>(
    (state: any) => state.data
  )
  const { obj } = useObjectUvwStore<any>((state: any) => state.api)
  const { setLayersUvwData } = useLayersUvwStore<any>((state: any) => state.api)
  const { setHistoryUvwDataMap } = useHistoryStore<any>(
    (state: any) => state.api
  )
  const { show } = useTransformUvwStore<any>((state: any) => state.data)

  const selectTexture = useCallback(
    (img) => {
      fabric.Image.fromURL(
        img,
        (img) => {
          img.set({
            originX: 'center',
            originY: 'center',
            id: nanoid(),
            angle: img.angle,
            lockMovementX: false,
            lockMovementY: false,
            lockRotation: false,
            lockScalingX: false,
            lockScalingY: false,
            lockScalingFlip: false,
            hasControls: true,
            top: show ? fabricCanvas.height / 4 : fabricCanvas.height / 2,
            left: show ? fabricCanvas.width / 4 : fabricCanvas.width / 2,
            hasBorders: true,
          })
          img.scaleToWidth(300)
          fabricCanvas.add(img)
          //img.center()
          img.setCoords()
          obj.setInitSettingsActiveObject([
            {
              ...img,
            },
          ])
          saveMap(
            maps,
            fabricCanvas,
            canvasTextures,
            activeCanvas,
            setHistoryUvwDataMap
          )
          setLayersUvwData({
            mapName: canvasTextures[activeCanvas].name,
            fabricObjects: fabricCanvas.getObjects(),
          })
          obj.setActiveObjects([img])
          fabricCanvas.setActiveObject(img)
          fabricCanvas.renderAll()
        },
        {
          crossOrigin: 'Anonymous',
        }
      )
    },
    [fabricCanvas, canvasTextures, activeCanvas, maps, show]
  )

  return (
    <div
      className={classes.root}
      style={{
        padding:
          currentObjectScene &&
          (currentObjectScene.name === 'drink' ||
            currentObjectScene.name === 'Base' ||
            currentObjectScene.name === 'cover1') &&
          !isRayTracing
            ? '10px 5px'
            : 0,
      }}
    >
      {project.textures.map((texture) => {
        return (
          <div
            key={texture.id}
            data-key={`${texture.id}`}
            style={{
              backgroundImage: `url(${texture.img.url})`,
              display:
                currentObjectScene &&
                (currentObjectScene.name === 'drink' ||
                  currentObjectScene.name === 'Base' ||
                  currentObjectScene.name === 'cover1') &&
                !isRayTracing
                  ? 'flex'
                  : 'none',
            }}
            className={classes.texture}
            onClick={() => selectTexture(texture.img.url)}
          />
        )
      })}
    </div>
  )
}

export default memo(PresetTextures)
