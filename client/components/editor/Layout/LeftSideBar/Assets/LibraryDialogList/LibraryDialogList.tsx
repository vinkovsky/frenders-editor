import React, { FunctionComponent, forwardRef, Ref, useCallback } from 'react'
import { List as MuiList, ListProps } from '@material-ui/core'

import { ListItem } from '@ui/index'
import { useAssetsStore } from '@store/editor/assets'
import { libraryDialogData } from '@utils/editor/libraryDialogData'

import { useStyles } from './LibraryDialogList.styles'

const LibraryDialogList: FunctionComponent<ListProps> = forwardRef(
  ({}, ref: Ref<HTMLUListElement>) => {
    const classes = useStyles()
    const { library } = useAssetsStore<any>((state: any) => state.data)
    const { setSelectedIndex } = useAssetsStore<any>((state: any) => state.api)

    const handleListItemClick = useCallback(
      (event: any, index: number) => setSelectedIndex(index),
      []
    )

    return (
      <MuiList ref={ref} component="nav" className={classes.list}>
        {libraryDialogData.map((item, index) => {
          return (
            <ListItem
              key={item.text}
              selected={library.selectedIndex === index}
              onClick={(e) => handleListItemClick(e, index)}
              {...item}
            />
          )
        })}
      </MuiList>
    )
  }
)

export default LibraryDialogList
