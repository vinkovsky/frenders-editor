import React, { FunctionComponent } from 'react'
import { Container, Grid } from '@material-ui/core'

import { Scrollbar } from '@ui/index'
import ModelsSection from '../Models/ModelsSection'
import TexturesSection from '../Textures/TexturesSection'
import EnvironmentsSection from '../Environments/EnvironmentsSection'
import MaterialsSection from '../Materials/MaterialsSection'
import { useAssetsStore } from '@store/editor/assets'

import { useStyles } from './LibraryDialogSection.styles'

const LibraryDialogSection: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { library } = useAssetsStore<any>((state: any) => state.data)

  const libraryDialogSectionLayout = () => {
    switch (library.selectedIndex) {
      case 0:
        return <ModelsSection />
      case 1:
        return <TexturesSection />
      case 2:
        return <EnvironmentsSection />
      case 3:
        return <MaterialsSection />
    }
  }

  return (
    <Scrollbar>
      <section className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container direction="column" spacing={3}>
            {libraryDialogSectionLayout()}
          </Grid>
        </Container>
      </section>
    </Scrollbar>
  )
}

export default LibraryDialogSection
