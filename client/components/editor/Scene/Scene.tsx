import React, { memo } from 'react'

import Canvas from './Canvas'
import Wrapper from './Wrapper'

const Scene = () => {
  return (
    <Canvas
      concurrent
      style={{ height: 'calc(100% - 64px)' }}
      camera={{
        // position: [0, 150, 270],
        fov: 75,
      }}
      gl={{
        powerPreference: 'high-performance',
        antialias: false,
      }}
      pixelRatio={window.devicePixelRatio}
    >
      <Wrapper />
    </Canvas>
  )
}

export default memo(Scene)
