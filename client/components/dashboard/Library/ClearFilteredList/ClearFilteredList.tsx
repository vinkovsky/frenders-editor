import React, { useContext } from 'react'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

import { Button } from '@ui/index'
import { DashboardContext } from '@providers/DashboardProvider'
import * as ACTIONS from '@actions/dashboard/cards'

import { useStyles } from './ClearFilteredList.styles'

const ClearRefinements = ({ items, refine }) => {
  const classes = useStyles()
  const { dispatch } = useContext(DashboardContext)

  const handleClick = () => {
    refine(items)
    dispatch(ACTIONS.clearFilteredChipList())
  }

  return (
    <Button
      onClick={handleClick}
      disabled={!items.length}
      className={classes.clearBtn}
    >
      Clear
    </Button>
  )
}

const ClearFilteredList = connectCurrentRefinements(ClearRefinements)

export default ClearFilteredList
