import React, { ChangeEvent } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

import { Input } from '@ui/index'

import { useStyles } from './InputSearchBox.styles'

const SearchBox = ({ currentRefinement, refine }) => {
  const classes = useStyles()

  return (
    <Input
      type="search"
      icon="search"
      label="Search"
      fullWidth
      value={currentRefinement}
      onInputChange={(event: ChangeEvent<HTMLInputElement>) =>
        refine(event.currentTarget.value)
      }
      className={classes.input}
    />
  )
}

const InputSearchBox = connectSearchBox(SearchBox)

export default InputSearchBox
