import React, {
  memo,
  useRef,
  useCallback,
  useEffect,
  FunctionComponent,
  useState,
} from 'react'
import { DoubleSide, Vector2 } from 'three'
import { useThree } from 'react-three-fiber'

import { useObjectSceneStore } from '@store/editor/objectScene'
import { getPointer } from '@helpers/uvw/getPointer'
import { useUvwStore } from '@store/editor/uvw'
import { useCameraStore } from '@store/editor/camera'
import { useTransformSceneStore } from '@store/editor/transformScene'

const Model: FunctionComponent<any> = () => {
  const { raycaster, scene } = useThree()
  const group = useRef<any>(null)
  const textureRef = useRef<any[]>([])
  const { objectSettings, dataMaps } = useObjectSceneStore<any>(
    (state: any) => state.data
  )
  const { obj } = useObjectSceneStore<any>((state: any) => state.api)
  const { fabricCanvas, cacheCanvas } = useUvwStore<any>(
    (state: any) => state.data
  )
  const { setCanvasTextures } = useUvwStore<any>((state: any) => state.api)
  const { toggleLockedCamera } = useCameraStore<any>((state: any) => state.api)
  const { transformTool } = useTransformSceneStore<any>(
    (state: any) => state.data
  )
  const [activeAltKey, setActiveAltKey] = useState<boolean>(false)

  const onPointerDown = useCallback(
    (event: any) => {
      event.stopPropagation()
      const { object, uv } = event
      if (event.shiftKey) {
        obj.setToCurrentObject(object.parent)
      } else if (event.altKey) {
        toggleLockedCamera(true)
        setActiveAltKey(true)
        object.material.map?.transformUv(uv)
        const { left, top } = fabricCanvas._offset
        const simEvt = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          clientX:
            left +
            uv.x * fabricCanvas.width * fabricCanvas.getZoom() +
            fabricCanvas.viewportTransform[4],
          clientY:
            top +
            uv.y * fabricCanvas.height * fabricCanvas.getZoom() +
            fabricCanvas.viewportTransform[5],
        })
        getPointer(uv)
        fabricCanvas.upperCanvasEl.dispatchEvent(simEvt)
      } else {
        if (transformTool === 'select') {
          const index = objectSettings.modelItems.findIndex(
            (item) => item.name === object.name
          )
          obj.setToCurrentObject(object, index)
        } else {
          obj.setToCurrentObject(object.parent)
        }
      }
    },
    [fabricCanvas, transformTool, activeAltKey]
  )

  useEffect(() => {
    if (textureRef.current.length > 0) {
      setCanvasTextures(textureRef.current)
    }
  }, [textureRef.current])

  const onPointerMove = useCallback(
    (event: any) => {
      if (event.altKey) {
        const { object, uv } = event
        object.material.map?.transformUv(uv)
        const { left, top } = fabricCanvas._offset
        const simEvt = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          clientX:
            left +
            uv.x * fabricCanvas.width * fabricCanvas.getZoom() +
            fabricCanvas.viewportTransform[4],
          clientY:
            top +
            uv.y * fabricCanvas.height * fabricCanvas.getZoom() +
            fabricCanvas.viewportTransform[5],
        })
        getPointer(uv)
        fabricCanvas.upperCanvasEl.dispatchEvent(simEvt)
      }
    },
    [fabricCanvas]
  )

  const onPointerUp = useCallback(() => {
    if (activeAltKey) {
      toggleLockedCamera(false)
      setActiveAltKey(false)
    }
    const simEvt = new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    })
    fabricCanvas.upperCanvasEl.dispatchEvent(simEvt)
  }, [fabricCanvas, activeAltKey])

  const onPointerMissed = useCallback(() => {
    if (raycaster.intersectObjects(scene.children[0].children).length === 0) {
      obj.setToCurrentObject(null)
    }
  }, [raycaster, scene])

  return (
    <group
      ref={group}
      name={objectSettings.name}
      position={[
        objectSettings.position.x,
        objectSettings.position.y,
        objectSettings.position.z,
      ]}
      rotation={[
        objectSettings.rotation.x !== undefined
          ? (Math.PI * objectSettings.rotation.x) / 180
          : 0,
        objectSettings.rotation.y !== undefined
          ? (Math.PI * objectSettings.rotation.y) / 180
          : 0,
        objectSettings.rotation.z !== undefined
          ? (Math.PI * objectSettings.rotation.z) / 180
          : 0,
      ]}
      scale={[
        objectSettings.scale.x,
        objectSettings.scale.y,
        objectSettings.scale.z,
      ]}
      visible={objectSettings.visible}
      dispose={null}
    >
      {objectSettings.modelItems.map((item: any) => {
        return (
          <mesh
            key={item.name}
            geometry={item.geometry}
            name={item.name}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerMissed={onPointerMissed}
          >
            <meshStandardMaterial
              attach="material"
              side={DoubleSide}
              color={item.material.color}
              roughness={item.material.roughness}
              metalness={item.material.metalness}
              visible={item.material.visible}
              normalScale={
                new Vector2(
                  item.material.normalScale.x,
                  item.material.normalScale.y
                )
              }
            >
              {(item.name == 'drink' ||
                item.name == 'cover1' ||
                item.name == 'Base') &&
                dataMaps.map(({ mapName }, index: number) => {
                  return (
                    <canvasTexture
                      key={mapName}
                      attach={mapName}
                      name={mapName}
                      ref={(el) => el && (textureRef.current[index] = el)}
                      image={cacheCanvas[index]}
                    />
                  )
                })}
            </meshStandardMaterial>
          </mesh>
        )
      })}
    </group>
  )
}

export default memo(Model)
