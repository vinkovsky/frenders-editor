import React, { useCallback, useContext } from 'react'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

import { Chip } from '@ui/index'
import { DashboardContext } from '@providers/DashboardProvider'
import { ICategoryChipItemProps } from '@interfaces/dashboard'
import {
  deleteFilteredChipData,
  updateCategoryFilteredChipData,
} from '@actions/dashboard/cards'

import { useStyles } from './CurrentFilteredChipList.styles'

const CurrentRefinements = ({ items, refine }) => {
  const classes = useStyles()
  const { state, dispatch } = useContext(DashboardContext)

  const handleDelete = useCallback(
    (itemDelete: ICategoryChipItemProps, value: string) => {
      dispatch(
        updateCategoryFilteredChipData({ ...itemDelete, disabled: false })
      )
      dispatch(deleteFilteredChipData(itemDelete))
      refine(value)
    },
    [refine]
  )

  return (
    <ul className={classes.chipList}>
      {items.length
        ? items.map((item) =>
            item.items.map((nested, index: number) => (
              <li key={nested.label}>
                <Chip
                  label={nested.label}
                  background={state.cards.filteredUserListData[index].colorChip}
                  className={classes.chip}
                  onDelete={() =>
                    handleDelete(
                      state.cards.filteredUserListData[index],
                      nested.value
                    )
                  }
                />
              </li>
            ))
          )
        : 'Choose filter'}
    </ul>
  )
}

const CurrentFilteredChipList = connectCurrentRefinements(CurrentRefinements)

export default CurrentFilteredChipList
