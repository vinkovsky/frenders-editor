import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import SaveProjects from '../SaveProjects'

const SavedSection: FunctionComponent = () => {
  return (
    <Grid item>
      <SaveProjects />
    </Grid>
  )
}

export default SavedSection
