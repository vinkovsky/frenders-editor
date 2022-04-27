import React, {
  memo,
  useEffect,
  useRef,
  useMemo,
  FunctionComponent,
} from 'react'
import { useFrame, useThree, extend } from 'react-three-fiber'
import { Vector2 } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'

import { Outline } from '@helpers/viewport/outlinePass'
import { useObjectSceneStore } from '@store/editor/objectScene'
import { useRendererStore } from '@store/editor/renderer'
import { useTransformSceneStore } from '@store/editor/transformScene'

extend({ EffectComposer, RenderPass, ShaderPass, Outline })

const Effects: FunctionComponent<any> = () => {
  const { gl, scene, camera, size } = useThree()
  const composerRef = useRef<any>(null)
  const outlineRef = useRef<any>(null)
  const { currentObjectScene } = useObjectSceneStore<any>(
    (state: any) => state.data
  )
  const { isRayTracing } = useRendererStore<any>((state: any) => state.data)
  const { transformTool } = useTransformSceneStore<any>(
    (state: any) => state.data
  )

  const aspect = useMemo(() => new Vector2(size.width, size.height), [size])

  useEffect(() => composerRef.current?.setSize(size.width, size.height), [size])

  useFrame(
    ({ gl }) =>
      Object.keys(gl).length > 0 ? composerRef.current?.render() : null,
    1
  )

  const sceneObject = scene.getObjectByName(currentObjectScene?.name)

  const attachObject = sceneObject
    ? sceneObject.type == 'Mesh'
      ? transformTool !== 'select'
        ? sceneObject.parent!.children
        : [sceneObject]
      : sceneObject.children
    : []

  return isRayTracing ? null : (
    <effectComposer ref={composerRef} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />​
      <outline
        attachArray="passes"
        args={[aspect, scene, camera]}
        ref={outlineRef}
        selectedObjects={attachObject}
        visibleEdgeColor="white"
        edgeStrength={10}
        edgeThickness={1}
      />
      <shaderPass attachArray="passes" args={[GammaCorrectionShader]} />
      <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        uniforms-resolution-value={[1 / size.width, 1 / size.height]}
      />
    </effectComposer>
  )
}

export default memo(Effects)
