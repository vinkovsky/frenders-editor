import React, { FunctionComponent } from 'react'
import { FormControl, Grid } from '@material-ui/core'

import { Accordion, Input } from '@ui/index'

const Link: FunctionComponent<any> = () => {
  return (
    <Accordion title={'Link'} icon={'link'} defaultExpanded={true}>
      <FormControl fullWidth>
        <Grid container direction={'column'} spacing={1}>
          <Grid item>
            <Input placeholder={'<a href="#">'} fullWidth size={'small'} />
          </Grid>
        </Grid>
      </FormControl>
    </Accordion>
  )
}
export default Link
