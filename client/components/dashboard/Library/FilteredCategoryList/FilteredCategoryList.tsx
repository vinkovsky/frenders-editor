import React from 'react'
import { connectRefinementList } from 'react-instantsearch-dom'
import { Typography } from '@material-ui/core'

import FilteredChipList from '../FilteredChipList/FilteredChipList'

import { useStyles } from './FilteredCategoryList.styles'

const RefinementList = ({ values, currentRefinement, items, refine }) => {
  const classes = useStyles()

  return (
    <ul className={classes.ul}>
      {values.map((item, index: number) => {
        return (
          <li key={item.category + index} className={classes.li}>
            <Typography className={classes.category} variant="h3">
              {item.category}
            </Typography>
            <FilteredChipList
              className={classes.categoryItem}
              categoryItems={item.categoryItems}
              currentRefinement={currentRefinement}
              items={items}
              refine={refine}
            />
          </li>
        )
      })}
    </ul>
  )
}

const FilteredCategoryList = connectRefinementList(RefinementList)

export default FilteredCategoryList
