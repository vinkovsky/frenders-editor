import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import FilteredList from '../FilteredList'
import CardLibraryList from '../CardLibraryList'
import InputSearchBox from '../InputSearchBox'

const LibrarySection: FunctionComponent = () => {
  return (
    <>
      <Grid item>
        <InputSearchBox />
      </Grid>
      <Grid item>
        <FilteredList />
      </Grid>
      <Grid item>
        <CardLibraryList />
      </Grid>
    </>
  )
}

export default LibrarySection
