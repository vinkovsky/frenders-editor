import React, { useContext } from 'react'
import { Container, Grid } from '@material-ui/core'

import ProfileSection from '../../Settings/ProfileSection'
import FavoritesSection from '../../Favorites/FavoritesSection'
import LibrarySection from '../../Library/LibrarySection'
import SavedSection from '../../Saved/SavedSection'
import { DashboardContext } from '@providers/DashboardProvider'

import { useStyles } from './DashboardSection.styles'

const DashboardSection = () => {
  const classes = useStyles()
  const { state } = useContext(DashboardContext)

  const profileSectionLayout = () => {
    switch (state.settings.selectedIndex) {
      case 0:
        return <LibrarySection />
      case 1:
        return <SavedSection />
      case 2:
        return <FavoritesSection />
      case 3:
        return <ProfileSection />
    }
  }

  return (
    <section className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container direction="column" spacing={3}>
          {profileSectionLayout()}
        </Grid>
      </Container>
    </section>
  )
}

export default DashboardSection
