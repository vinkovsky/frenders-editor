import React, { FunctionComponent, useContext, useState } from 'react'
import {
  Card,
  CardActions,
  CardProps,
  CardContent,
  Collapse,
  Divider,
} from '@material-ui/core'
import clsx from 'clsx'

import { IconButton } from '@ui/index'
import { DashboardContext } from '@providers/DashboardProvider'
import CurrentFilteredChipList from '../CurrentFilteredChipList'
import FilteredCategoryList from '../FilteredCategoryList'
import ClearFilteredList from '../ClearFilteredList'

import { useStyles } from './FilteredList.styles'

const FilteredList: FunctionComponent<CardProps> = () => {
  const classes = useStyles()
  const { state } = useContext(DashboardContext)
  const [expanded, setExpanded] = useState<boolean>(false)
  const classesFilteredList = clsx(classes.expand, {
    [classes.expandOpen]: expanded,
  })

  const handleExpandClick = () => setExpanded((expanded: boolean) => !expanded)

  return (
    <Card className={classes.root}>
      <CardActions disableSpacing>
        <CurrentFilteredChipList attribute="categoryItem" />
        <ClearFilteredList />
        <IconButton
          icon="expand"
          className={classesFilteredList}
          onClick={handleExpandClick}
        />
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <Divider />
        <CardContent className={classes.cardContent}>
          <FilteredCategoryList
            values={state.cards.filteredListData}
            attribute="categoryItem"
          />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default FilteredList
