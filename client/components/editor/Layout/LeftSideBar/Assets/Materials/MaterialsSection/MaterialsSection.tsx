import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import MaterialsList from '../MaterialsList'

const MaterialsSection: FunctionComponent<any> = () => {
  return (
    <Grid item>
      <MaterialsList />
    </Grid>
  )
}

export default MaterialsSection
