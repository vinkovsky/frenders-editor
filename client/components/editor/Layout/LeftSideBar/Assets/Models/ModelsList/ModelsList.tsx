import React, { FunctionComponent, useRef } from 'react'
import StackGrid from 'react-stack-grid'
import { withSize } from 'react-sizeme'

import CardAsset from '../../CardAsset'
import { useAssetsStore } from '@store/editor/assets'

const ModelsList: FunctionComponent<any> = ({ size }) => {
  const grid = useRef<any>(null)
  const { library } = useAssetsStore<any>((state: any) => state.data)

  const setWidth = () => {
    if (size!.width >= 480 && size!.width <= 768) {
      return '25%'
    } else if (size!.width <= 480) {
      return '50%'
    } else if (size!.width >= 768 && size!.width <= 992) {
      return '18.75%'
    } else {
      return '12.5%'
    }
  }

  return (
    <StackGrid
      gridRef={(ref) => (grid.current = ref)}
      columnWidth={setWidth()}
      monitorImagesLoaded={true}
      gutterWidth={20}
      gutterHeight={20}
    >
      {library.models.map((item) => {
        return (
          <CardAsset
            key={item.id}
            item={item}
            zone={'library'}
            area={'models'}
          />
        )
      })}
    </StackGrid>
  )
}

export default withSize()(ModelsList)
