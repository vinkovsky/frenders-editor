import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import TexturesList from '../TexturesList'

const TexturesSection: FunctionComponent<any> = () => {
  return (
    <Grid item>
      <TexturesList />
    </Grid>
  )
}

export default TexturesSection
