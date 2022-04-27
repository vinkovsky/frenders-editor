import React, { FunctionComponent } from 'react'
import { Grid, Typography } from '@material-ui/core'

import { Link } from '@ui/index'

import { useStyles } from './index.styles'

const Index: FunctionComponent = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justify={'center'}
      spacing={3}
      className={classes.root}
    >
      <Grid item>
        <Typography className={classes.heading} variant={'h1'}>
          Frenders
        </Typography>
      </Grid>
      <Grid item>
        <Link href="/signup">Регистрация</Link> |{' '}
        <Link href="/signin">Вход</Link>
      </Grid>
    </Grid>
  )
}

export default Index
