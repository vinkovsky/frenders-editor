import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import Header from '../Header'
import Sidebar from '../Sidebar'
import DashboardSection from '../DashboardSection'

import { useStyles } from './Dashboard.styles'

const Dashboard: FunctionComponent = () => {
  const classes = useStyles()

  return (
    <>
      <Header />
      <main className={classes.main}>
        <Grid container>
          <Grid item>
            <Sidebar />
          </Grid>
          <Grid item xs>
            <DashboardSection />
          </Grid>
        </Grid>
      </main>
    </>
  )
}

export default Dashboard
