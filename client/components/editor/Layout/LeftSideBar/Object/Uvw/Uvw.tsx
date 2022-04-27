import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import ObjectSettings from './components/ObjectSettings'
import Filters from './components/Filters'

import { useStyles } from './Uvw.styles'

const Uvw: FunctionComponent = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container direction={'column'} alignItems={'center'} spacing={2}>
        <Grid item className={classes.item}>
          <ObjectSettings />
        </Grid>
        <Grid item className={classes.item}>
          <Filters />
        </Grid>
      </Grid>
    </div>
  )
}

export default Uvw
