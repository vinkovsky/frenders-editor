import React, { FunctionComponent } from 'react'
import { CircularProgress, Grid } from '@material-ui/core'
import clsx from 'clsx'

export interface ILoaderProps {
  className?: string
}

import { useStyles } from './Loader.styles'

const Loader: FunctionComponent<ILoaderProps> = ({ className }) => {
  const classes = useStyles()
  const classesLoader = clsx(classes.loaderLayout, className)

  return (
    <Grid
      container
      alignItems={'center'}
      justify={'center'}
      className={classesLoader}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

export default Loader
