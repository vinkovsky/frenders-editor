import React, {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  useCallback,
  useContext,
  useState,
} from 'react'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ClickAwayListener,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { useMutation } from '@apollo/client'

import { IconButton, Link, Tooltip } from '@ui/index'
import { ISavedCardMutationProps } from '@interfaces/dashboard'
import { DashboardContext } from '@providers/DashboardProvider'
import * as ACTIONS from '@actions/dashboard/cards'
import { renameSavedCardUser } from '@utils/dashboard/dashboard'
import DialogConfirm from '../DialogConfirm'

import UPDATE_SAVED_CARD from '@graphql/mutations/dashboard/UpdateSavedCard'

import { useStyles } from './SavedCard.styles'

const SavedCard: FunctionComponent<any> = ({ savedCard }) => {
  const classes = useStyles()
  const { state, dispatch } = useContext(DashboardContext)
  const [open, setOpen] = useState<boolean>(false)
  const [text, setText] = useState<string>(savedCard.nameProject)
  const [readonly, setReadOnly] = useState<boolean>(true)

  const [update] = useMutation<ISavedCardMutationProps>(UPDATE_SAVED_CARD)

  const handleClose = useCallback(() => setOpen(false), [])

  const handleDeleteClick = useCallback(() => {
    dispatch(ACTIONS.setCurrentCard(savedCard))
    setOpen(true)
  }, [savedCard])

  const handleRenameClick = useCallback(() => setReadOnly(false), [])

  const handleKeyPress = useCallback(
    async (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setReadOnly(true)
        if (text.length === 0) {
          setText(savedCard.nameProject)
        } else {
          await renameSavedCardUser(update, savedCard, text)
        }
      }
    },
    [state, update, text]
  )

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setText(event.target.value)

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={
            savedCard.savedPreviewImage
              ? savedCard.savedPreviewImage
              : savedCard.dataModel?.img.url
          }
          title={savedCard.dataModel?.title}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            {readonly ? (
              <Typography component="h1" variant="h1">
                {text}
              </Typography>
            ) : (
              <ClickAwayListener onClickAway={() => setReadOnly(true)}>
                <TextField
                  autoFocus
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  inputProps={{
                    maxLength: 12,
                  }}
                  value={text}
                />
              </ClickAwayListener>
            )}
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.subtitle}
            >
              Date created: {new Date(savedCard.createdAt).toLocaleString()}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.subtitle}
            >
              Last edited: {new Date(savedCard.updatedAt).toLocaleString()}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container spacing={2} justify={'flex-end'}>
              <Grid item>
                <Tooltip title={'Rename'} arrow>
                  <IconButton
                    icon={'rename'}
                    className={classes.iconEdit}
                    onClick={handleRenameClick}
                  />
                </Tooltip>
              </Grid>
              <Grid item>
                <Link
                  href={`/scene/${savedCard.id}`}
                  style={{ border: 'none' }}
                >
                  <Tooltip title={'Edit'} arrow>
                    <IconButton icon={'edit'} className={classes.iconEdit} />
                  </Tooltip>
                </Link>
              </Grid>
              <Grid item>
                <Tooltip title={'Delete'} arrow>
                  <IconButton
                    icon={'delete'}
                    className={classes.iconDelete}
                    onClick={handleDeleteClick}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </CardActions>
        </div>
      </Card>
      <DialogConfirm
        id="delete-card-dialog"
        keepMounted
        open={open}
        isGroup={false}
        onClose={handleClose}
        dialogTitle={'Project deletion confirmation'}
        dialogContent={'Are you sure you want to delete the project?'}
      />
    </>
  )
}

export default SavedCard
