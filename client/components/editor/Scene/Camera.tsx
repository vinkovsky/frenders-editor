import { FunctionComponent, memo, useEffect } from 'react'
import { useThree } from 'react-three-fiber'
import { OrthographicCamera } from 'three'

import { useCameraStore } from '@store/editor/camera'

const Camera: FunctionComponent<any> = () => {
  const { fov, cameraPosition } = useCameraStore<any>((state: any) => state.data)
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
    if (!(camera instanceof OrthographicCamera)) {
      camera.fov = fov
      camera.updateProjectionMatrix()
    }
  }, [cameraPosition, fov])

  return null
}

export default memo(Camera)
