import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import General from './components/General'
import Advanced from './components/Advanced'
import { useUvwStore } from '@store/editor/uvw'

import { useStyles } from './Canvas.styles'

const Canvas: FunctionComponent = () => {
  const { backgroundColor } = useUvwStore<any>((state: any) => state.data)
  const classes = useStyles({ color: backgroundColor })

  return (
    <div>
      <Grid container direction={'column'} alignItems={'center'} spacing={2}>
        <Grid item className={classes.item}>
          <General />
        </Grid>
        <Grid item className={classes.item}>
          <Advanced />
        </Grid>
      </Grid>
    </div>
  )
}

export default Canvas
