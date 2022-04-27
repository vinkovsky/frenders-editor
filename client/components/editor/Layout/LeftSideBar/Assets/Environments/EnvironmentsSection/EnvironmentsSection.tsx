import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import EnvironmentsList from '../EnvironmentsList'

const EnvironmentsSection: FunctionComponent<any> = () => {
  return (
    <Grid item>
      <EnvironmentsList />
    </Grid>
  )
}

export default EnvironmentsSection
