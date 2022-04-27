import React, {
  ChangeEvent,
  FunctionComponent,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react'
import * as _ from 'lodash'
import { useThree, extend, useFrame } from 'react-three-fiber'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { useCameraStore } from '@store/editor/camera'
import { useObjectSceneStore } from '@store/editor/objectScene'
import { useTransformSceneStore } from '@store/editor/transformScene'
import { useRendererStore } from '@store/editor/renderer'
import { useHistoryStore } from '@store/editor/history'
import { updateCameraFromModel } from '@helpers/viewport/updateCameraFromModel'
import { useUvwStore } from '@store/editor/uvw'
import { useInitDataStore } from '@store/editor/initData'

extend({ TransformControls, OrbitControls })

const Controls: FunctionComponent<any> = () => {
  const { camera, gl, scene } = useThree()
  const orbitRef = useRef<any>(null)
  const transformRef = useRef<any>(null)
  const { setHistoryModelTransform } = useHistoryStore<any>(
    (state: any) => state.api
  )
  const { locked, targetPosition } = useCameraStore<any>(
    (state: any) => state.data
  )
  const { setTransformCamera } = useCameraStore<any>((state: any) => state.api)
  const { currentObjectScene, objectSettings } = useObjectSceneStore<any>(
    (state: any) => state.data
  )
  const { obj } = useObjectSceneStore<any>((state: any) => state.api)
  const { transformTool } = useTransformSceneStore<any>(
    (state: any) => state.data
  )
  const { isRayTracing } = useRendererStore<any>((state: any) => state.data)
  const { isFirstLoad } = useUvwStore<any>((state: any) => state.data)

  const { initDataCard } = useInitDataStore<any>(
    (state: any) => state.data
  )

  useEffect(() => {
    if (isFirstLoad && !initDataCard.savedCameraData) {
      const model = scene.getObjectByName(objectSettings.name)
      updateCameraFromModel(camera, model, setTransformCamera)
    }
  }, [camera, isFirstLoad, scene, objectSettings, setTransformCamera, initDataCard])

  useFrame(() => orbitRef.current.update())

  useEffect(() => {
    if (orbitRef.current) {
      const handleOrbitChange = (e: ChangeEvent<any>) => {
        setTransformCamera({
          area: 'targetPosition',
          coords: e.target.target,
        })
        setTransformCamera({
          area: 'cameraPosition',
          coords: e.target.object.position,
        })
      }

      const controls = orbitRef.current
      const debounce = _.debounce(handleOrbitChange, 10)
      controls.addEventListener('change', debounce)
      return () => {
        controls.removeEventListener('change', debounce)
      }
    }
  }, [])

  useEffect(() => {
    if (orbitRef.current) {
      const controls = orbitRef.current
      controls.target.set(targetPosition.x, targetPosition.y, targetPosition.z)
      controls.enabled = !locked
    }
  }, [locked, targetPosition])

  useEffect(() => {
    if (transformRef.current) {
      const controls = transformRef.current
      const handleControlsChange = (e: ChangeEvent<any>) => {
        if (e.target.object) {
          obj.setTransformObjectScene({
            area: 'position',
            coords: e.target.object.position,
          })
          obj.setTransformObjectScene({
            area: 'rotation',
            coords: {
              x: (e.target.object.rotation.x * 180) / Math.PI,
              y: (e.target.object.rotation.y * 180) / Math.PI,
              z: (e.target.object.rotation.z * 180) / Math.PI,
            },
          })
          obj.setTransformObjectScene({
            area: 'scale',
            coords: e.target.object.scale,
          })
        }
      }

      const handleDragChange = (event: any) => {
        orbitRef.current.enabled = !event.value
      }

      let isMove = false

      const handleObjectChange = () => {
        isMove = true
      }

      const mouseUpHandler = (event) => {
        if (isMove) {
          switch (event.mode) {
            case 'translate':
              {
                setHistoryModelTransform({
                  area: 'model',
                  attr: 'position',
                  value: event.target.object.position,
                })
              }
              break
            case 'rotate':
              {
                setHistoryModelTransform({
                  area: 'model',
                  attr: 'rotation',
                  value: {
                    x: (event.target.object.rotation.x * 180) / Math.PI,
                    y: (event.target.object.rotation.y * 180) / Math.PI,
                    z: (event.target.object.rotation.z * 180) / Math.PI,
                  },
                })
              }
              break
            case 'scale':
              {
                setHistoryModelTransform({
                  area: 'model',
                  attr: 'scale',
                  value: event.target.object.scale,
                })
              }
              break
          }
        }
        isMove = false
      }

      const throttleDrag = _.throttle(handleDragChange, 50)
      const throttleChange = _.throttle(handleControlsChange, 50)
      const throttleObjectChange = _.throttle(handleObjectChange, 50)

      controls.addEventListener('dragging-changed', throttleDrag)
      controls.addEventListener('objectChange', throttleObjectChange)
      controls.addEventListener('mouseUp', mouseUpHandler)
      controls.addEventListener('change', throttleChange)

      return () => {
        controls.removeEventListener('dragging-changed', handleDragChange)
        controls.removeEventListener('objectChange', throttleObjectChange)
        controls.removeEventListener('mouseUp', mouseUpHandler)
        controls.removeEventListener('change', throttleChange)
      }
    }
  }, [obj])

  useEffect(() => {
    if (transformRef.current) {
      const control = transformRef.current
      if (transformTool !== 'select' && currentObjectScene) {
        control.setMode(transformTool)
        const attachObject =
          currentObjectScene.type == 'Mesh'
            ? currentObjectScene.parent
            : currentObjectScene
        const attachObj = scene.getObjectByName(attachObject.name)
        obj.setToCurrentObject(attachObj)
        control.attach(attachObj)
      } else {
        control.detach()
      }
    }
  }, [currentObjectScene, transformTool, scene])

  useEffect(() => {
    if (objectSettings && transformRef.current) {
      transformRef.current.enabled = !objectSettings.locked
    }
  }, [objectSettings])

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />
      {isRayTracing ? null : (
        <transformControls args={[camera, gl.domElement]} ref={transformRef} />
      )}
    </>
  )
}
export default memo(Controls)
