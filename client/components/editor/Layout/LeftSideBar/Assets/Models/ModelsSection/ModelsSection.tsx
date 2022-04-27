import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import ModelsList from '../ModelsList'

const ModelsSection: FunctionComponent<any> = () => {
  return (
    <Grid item>
      <ModelsList />
    </Grid>
  )
}

export default ModelsSection
