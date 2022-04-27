import React, { FunctionComponent, memo, useEffect } from 'react'
import { useThree } from 'react-three-fiber'

import { useTransformSceneStore } from '@store/editor/transformScene'
import { useObjectSceneStore } from '@store/editor/objectScene'

const Helpers: FunctionComponent<any> = () => {
  const { scene } = useThree()
  const { gridVisible } = useTransformSceneStore<any>(
    (state: any) => state.data
  )
  const { general } = useObjectSceneStore<any>((state: any) => state.api)

  useEffect(() => {
    general.setScene(scene)
  }, [scene])

  return (
    <gridHelper args={[500, 10, '#2cc234']} visible={gridVisible} />
  )
}

export default memo(Helpers)
