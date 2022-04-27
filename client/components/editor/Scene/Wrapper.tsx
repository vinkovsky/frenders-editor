import React, { FunctionComponent, memo } from 'react'

import Model from './Model'
import Environment from './Environment'
import Renderer from './Renderer'
import Helpers from './Helpers'
import Camera from './Camera'
import Controls from './Controls'
import Effects from './Effects'

const Wrapper: FunctionComponent = () => {
  return (
    <>
      <Model />
      <Environment />
      <Renderer />
      <Helpers />
      <Camera />
      <Controls />
      <Effects />
    </>
  )
}

export default memo(Wrapper)
