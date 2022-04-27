import React, { FunctionComponent } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import clsx from 'clsx'

import { IDragHandlerProps } from '@interfaces/editor'

import { useStyles } from './DragHandler.styles'

const DragHandler: FunctionComponent<IDragHandlerProps> = ({ title }) => {
  const classes = useStyles()
  return (
    <Box className={clsx('dragHandler', classes.root)}>
      <Grid container alignItems={'center'} justify={'center'}>
        <Grid item>
          <Typography variant="button">{title}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DragHandler
