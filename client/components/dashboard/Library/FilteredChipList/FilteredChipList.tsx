import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import clsx from 'clsx'

import { Chip } from '@ui/index'
import {
  ICategoryChipItemProps,
  IFilteredChipListProps,
} from '@interfaces/dashboard'
import {
  addFilteredChipData,
  updateCategoryFilteredChipData,
} from '@actions/dashboard/cards'
import { DashboardContext } from '@providers/DashboardProvider'

import { useStyles } from './FilteredChipList.styles'

const FilteredChipList: FunctionComponent<IFilteredChipListProps> = ({
  categoryItems,
  className,
  currentRefinement,
  items,
  refine,
}) => {
  const classes = useStyles()
  const classesChipList = clsx(classes.chipList, className)
  const { dispatch } = useContext(DashboardContext)
  const itemAdd = useRef<ICategoryChipItemProps>({})

  const handleClick = useCallback(
    (item: ICategoryChipItemProps) => {
      dispatch(updateCategoryFilteredChipData({ ...item, disabled: true }))
      dispatch(addFilteredChipData(item))
      itemAdd.current = item
    },
    [itemAdd.current]
  )

  useEffect(() => {
    if (Object.keys(itemAdd.current).length !== 0) {
      const value = itemAdd.current.categoryItem
      itemAdd.current = {}
      const next = currentRefinement.includes(value)
        ? currentRefinement.filter((current) => current !== value)
        : currentRefinement.concat(value)
      refine(next)
    }
  }, [itemAdd.current, refine])

  return (
    <ul className={classesChipList}>
      {categoryItems.map((nestedItem: ICategoryChipItemProps) => {
        const { isRefined } = items.find(
          (item) => item.label === nestedItem.categoryItem
        ) || {
          isRefined: false,
        }
        return (
          <li key={nestedItem.categoryItem}>
            <Chip
              label={nestedItem.categoryItem}
              className={classes.chip}
              disabled={isRefined}
              onClick={() => handleClick(nestedItem)}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default FilteredChipList
