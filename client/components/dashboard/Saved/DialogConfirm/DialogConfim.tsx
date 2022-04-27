import React, { FunctionComponent, useCallback, useContext } from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Typography,
} from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useMutation } from '@apollo/client'

import { Button } from '@ui/index'
import { ISavedCardMutationProps } from '@interfaces/dashboard'
import { IConfirmDialogProps } from '@interfaces/editor/layout'
import { deleteSavedCardUser, deleteSavedGroupCardUser } from '@utils/dashboard/dashboard'
import { errorMessage } from '@helpers/errorMessage'
import { DashboardContext } from '@providers/DashboardProvider'

import DELETE_SAVED_CARD from '@graphql/mutations/dashboard/DeleteSavedCard'

import { useStyles } from './DialogConfirm.styles'

const DialogConfirm: FunctionComponent<IConfirmDialogProps> = ({
  onClose,
  open,
  dialogTitle,
  dialogContent,
  isGroup,
  ...other
}) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { state, dispatch } = useContext(DashboardContext)

  const [remove] = useMutation<ISavedCardMutationProps>(DELETE_SAVED_CARD)

  const handleCancel = () => onClose()

  const handleDelete = async () => {
    if (isGroup) {
      await deleteSavedGroupCardUser(
        state,
        dispatch,
        remove,
        state.cards.currentGroup
      )
      // enqueueSnackbar('Success deleted', {
      //   variant: 'success',
      // })

    } else {
      const data = await deleteSavedCardUser(
        dispatch,
        remove,
        state.cards.currentCard
      )
      if (!data.savedCard) {
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      } else {
        enqueueSnackbar('Success deleted', {
          variant: 'success',
        })
      }
    }

    onClose()
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle className={classes.root}>{dialogTitle}</DialogTitle>
      <DialogContent dividers>
        <Typography component={'p'}>{dialogContent}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete}>Ok</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogConfirm
