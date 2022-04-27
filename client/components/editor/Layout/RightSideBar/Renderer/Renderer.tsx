import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import General from './components/General'
import Advanced from './components/Advanced'
import { useRendererStore } from '@store/editor/renderer'

import 'react-colorful/dist/index.css'
import { useStyles } from './Renderer.styles'

const Renderer: FunctionComponent = () => {
  const { general } = useRendererStore<any>((state: any) => state.data)
  const classes = useStyles({ color: general.backgroundColor })

  return (
    <div className={classes.root}>
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

export default Renderer
