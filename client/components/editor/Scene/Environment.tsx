import { FunctionComponent, memo, useEffect } from 'react'
import { useThree } from 'react-three-fiber'
import { Color, PMREMGenerator, WebGLRenderer } from 'three'
import { EnvironmentLight } from 'ray-tracing-renderer'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

import { useEnvironmentStore } from '@store/editor/environment'
import { useRendererStore } from '@store/editor/renderer'

const Environment: FunctionComponent<any> = () => {
  const { gl, scene } = useThree()
  const { currentIndexEnvironment, envs, hdr } = useEnvironmentStore<any>(
    (state: any) => state.data
  )
  const { setCurrentEnvironment } = useEnvironmentStore<any>(
    (state: any) => state.api
  )
  const { general } = useRendererStore<any>((state: any) => state.data)

  useEffect(() => {
    new RGBELoader().load(envs[currentIndexEnvironment].hdr.url, (hdr) => {
      setCurrentEnvironment(hdr)
    })
  }, [currentIndexEnvironment, envs])

  useEffect(() => {
    if (gl instanceof WebGLRenderer && hdr) {
      const pmremGenerator = new PMREMGenerator(gl)
      pmremGenerator.compileEquirectangularShader()
      const { texture } = pmremGenerator.fromEquirectangular(hdr)
      scene.environment = texture
      if (general.transparentBackground) {
        scene.background = new Color(general.backgroundColor)
      } else {
        scene.background = texture
      }
      hdr.dispose()
      pmremGenerator.dispose()
    } else {
      scene.add(new EnvironmentLight(hdr))
      if (general.transparentBackground) {
        scene.background = new Color(general.backgroundColor)
      } else {
        scene.background = null
      }
    }
    return () => {
      scene.environment = scene.background = null
    }
  }, [gl, scene, hdr, general])

  return null
}

export default memo(Environment)
