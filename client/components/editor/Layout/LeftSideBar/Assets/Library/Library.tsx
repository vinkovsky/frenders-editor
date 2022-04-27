import React, { FunctionComponent, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
} from '@material-ui/core'

import { Button, IconButton } from '@ui/index'
import LibraryDialogSection from '../LibraryDialogSection'
import LibraryDialogList from '../LibraryDialogList'
import { useAssetsStore } from '@store/editor/assets'
import { useEnvironmentStore } from '@store/editor/environment'

import { useStyles } from './Library.styles'

const Library: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { library } = useAssetsStore<any>((state: any) => state.data)
  const { addSelectedAsset } = useAssetsStore<any>((state: any) => state.api)
  const { setAddEnvironments } = useEnvironmentStore<any>(
    (state: any) => state.api
  )
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const addSelected = async () => {
    addSelectedAsset()
    setAddEnvironments(library.selected.environments)
    setOpen(false)
  }

  return (
    <>
      <Button fullWidth onClick={handleClickOpen} className={classes.button}>
        Library
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth={'lg'}
        onClose={handleClose}
        open={open}
      >
        <DialogTitle className={classes.title}>
          <Typography variant="h6">Library</Typography>
          {handleClose ? (
            <IconButton
              className={classes.closeButton}
              icon={'close'}
              onClick={handleClose}
            />
          ) : null}
        </DialogTitle>
        <DialogContent className={classes.content} dividers>
          <Grid container className={classes.grid}>
            <Grid item>
              <LibraryDialogList />
            </Grid>
            <Grid item xs>
              <LibraryDialogSection />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button className={classes.libraryActionButton} onClick={addSelected}>
            Add Selected
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Library
