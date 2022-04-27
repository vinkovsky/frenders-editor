import React, { FunctionComponent, useRef } from 'react'
import StackGrid from 'react-stack-grid'
import { withSize } from 'react-sizeme'

import { ICardListProps, ISavedCardProps } from '@interfaces/dashboard'
import SavedCard from '../SavedCard'

const CardSavedList: FunctionComponent<ICardListProps> = ({
  cardsSavedData,
  size,
}) => {
  const grid = useRef<any>(null)

  const setWidth = () => {
    if (size!.width <= 640) {
      return '100%'
    } else {
      return '50%'
    }
  }

  return (
    <StackGrid
      gridRef={(ref) => (grid.current = ref)}
      columnWidth={setWidth()}
      monitorImagesLoaded={true}
      gutterWidth={5}
      gutterHeight={5}
    >
      {cardsSavedData!.map((savedCard: ISavedCardProps) => {
        return <SavedCard key={savedCard.id} savedCard={savedCard} />
      })}
    </StackGrid>
  )
}

export default withSize()(CardSavedList)
