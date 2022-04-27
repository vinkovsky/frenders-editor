import React from 'react'
import { Grid } from '@material-ui/core'

import FavoritesList from '../FavoritesList'

const FavoritesSection = () => {
  return (
    <Grid item>
      <FavoritesList />
    </Grid>
  )
}

export default FavoritesSection
