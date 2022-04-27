import React, { FunctionComponent } from 'react'
import { FormControl, Grid } from '@material-ui/core'

import { Accordion, Input } from '@ui/index'

const Embed: FunctionComponent<any> = () => {
  return (
    <Accordion title={'Embed'} icon={'embed'} defaultExpanded={true}>
      <FormControl fullWidth>
        <Grid container direction={'column'} spacing={1}>
          <Grid item>
            <Input placeholder={'<Embed code>'} multiline rows={5} fullWidth />
          </Grid>
        </Grid>
      </FormControl>
    </Accordion>
  )
}

export default Embed
