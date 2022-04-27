import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import ObjectSettings from './components/ObjectSettings'
import Material from './components/Material'

import { useStyles } from './Scene.styles'

const Scene: FunctionComponent<any> = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container direction={'column'} alignItems={'center'} spacing={2}>
        <Grid item className={classes.item}>
          <ObjectSettings />
        </Grid>
        <Grid item className={classes.item}>
          <Material />
        </Grid>
      </Grid>
    </div>
  )
}

export default Scene
