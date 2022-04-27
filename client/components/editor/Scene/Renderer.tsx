import { memo, useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { WebGLRenderer } from 'three'

import { useRendererStore } from '@store/editor/renderer'
import { useEnvironmentStore } from '@store/editor/environment'

const getToneMapping = (tone: string) => {
  switch (tone) {
    case 'No':
      return 0
    case 'Linear':
      return 1
    case 'Reinhard':
      return 2
    case 'Cineon':
      return 3
    case 'ACESFilmic':
      return 4
    default:
      return 5
  }
}

const Renderer = () => {
  const { gl }: any = useThree()
  const { general, advanced } = useRendererStore<any>(
    (state: any) => state.data
  )
  const { envs, currentIndexEnvironment } = useEnvironmentStore<any>(
    (state: any) => state.data
  )

  useEffect(() => {
    gl.toneMappingExposure = envs[currentIndexEnvironment].exposure
  }, [envs, currentIndexEnvironment])

  useEffect(() => {
    gl.toneMapping = getToneMapping(general.toneMapping)
    gl.bounces = advanced.bounces
    gl.maxHardwareUsage = advanced.maxHardwareUsage
  }, [general, advanced])

  useFrame(({ gl, scene, camera }: any, delta) => {
    if (Object.keys(gl).length !== 0 && !(gl instanceof WebGLRenderer)) {
      gl.sync(delta)
      gl.render(scene, camera)
    }
  })

  return null
}

export default memo(Renderer)
