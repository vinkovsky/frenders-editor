import React, { FunctionComponent, ReactNode, useContext } from 'react'
import {
  Grid,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  Typography,
} from '@material-ui/core'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import * as yup from 'yup'
import { StringSchema } from 'yup/lib'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { Button, Input, IconButton } from '@ui/index'
import { ISavedCardMutationProps, ISavedCardProps } from '@interfaces/dashboard'
import { AppContext } from '@providers/AppProvider'
import { DashboardContext } from '@providers/DashboardProvider'
import { errorMessage } from '@helpers/errorMessage'
import { createSavedCardUser } from '@utils/dashboard/dashboard'
import CardNewProject from '../CardNewProject'
import Carousel from '../Carousel'

import CREATE_SAVED_CARD from '@graphql/mutations/dashboard/CreateSavedCard'

import { useStyles } from './NewProjectDialog.styles'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      background: '#202020',
      color: theme.palette.primary.contrastText,
      padding: 12,
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: ReactNode
  onClose: () => void
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          className={classes.closeButton}
          icon={'close'}
          onClick={onClose}
        />
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

const NewProjectDialog: FunctionComponent<any> = ({
  openDialog,
  handleOpenDialog,
}) => {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { state: stateApp } = useContext(AppContext)
  const { state: stateDashboard, dispatch: dispatchDashboard } = useContext(
    DashboardContext
  )
  const [create] = useMutation<ISavedCardMutationProps>(CREATE_SAVED_CARD)

  const handleClose = () => handleOpenDialog(false)

  const initialValues: Partial<ISavedCardProps> = {
    nameGroup: '',
    nameProject: '',
  }

  // Создание правила для одиноквых названий проектов
  yup.addMethod<StringSchema>(
    yup.string,
    'verifyNameProject',
    function (errorMessage) {
      return this.test(
        `test-verify-name-project`,
        errorMessage,
        function (value: any) {
          const { path, createError } = this
          let found = false
          stateDashboard.cards.savedCards.map((savedCard) => {
            if (savedCard.nameProject === value) {
              found = true
            }
          })
          return found ? createError({ path, message: errorMessage }) : value
        }
      )
    }
  )

  const validationSchema = yup.object({
    nameGroup: yup
      .string()
      .min(3, 'The minimum name group projects is 3 characters')
      .required('Name group is required'),
    nameProject: yup
      .string()
      .min(3, 'The minimum name project is 3 characters')
      .required('Name project is required')
      .verifyNameProject('This project name already exists'),
  })

  const handleSubmit = async (values) => {
    try {
      const currentSavedCards: ISavedCardProps = {
        nameGroup: values.nameGroup.toUpperCase(),
        nameProject: values.nameProject,
        dataModel: {
          model: stateDashboard.cards?.currentCard?.model,
          img: stateDashboard.cards?.currentCard?.img,
          title: stateDashboard.cards?.currentCard?.title,
        },
        user: stateApp.user?.id,
        savedUvwData: null,
        savedModelData: null,
        savedCameraData: null,
        savedAssetsData: null,
      }
      const data = await createSavedCardUser(
        dispatchDashboard,
        create,
        currentSavedCards
      )
      if (!data.savedCard) {
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      } else {
        await router.push(`/scene/${data.savedCard.id}`)
      }
    } catch (error) {
      enqueueSnackbar(errorMessage(error), {
        variant: 'error',
      })
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    validateOnMount: true,
  })

  return (
    <div>
      <Dialog onClose={handleClose} open={openDialog} maxWidth={'md'}>
        <DialogTitle id="new-project-dialog-title" onClose={handleClose}>
          Create New Project
        </DialogTitle>
        <DialogContent className={classes.content} dividers>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} className={classes.grid}>
              <Grid container spacing={2}>
                <Grid item>
                  <CardNewProject />
                </Grid>
                <Grid item>
                  <Grid container item direction={'column'} spacing={2}>
                    <Grid item>
                      <Typography className={classes.typography}>
                        {stateDashboard.cards.currentCard?.title}
                      </Typography>
                      <Typography variant={'h6'}>
                        Category: {stateDashboard.cards.currentCard?.category}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.input}>
                      <Input
                        id="nameGroup"
                        type="text"
                        label="Name group"
                        name="nameGroup"
                        fullWidth
                        value={formik.values.nameGroup}
                        onInputChange={formik.handleChange}
                        error={
                          formik.touched.nameGroup &&
                          Boolean(formik.errors.nameGroup)
                        }
                        helperText={
                          formik.touched.nameGroup
                            ? formik.errors.nameGroup
                            : undefined
                        }
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        id="nameProject"
                        type="text"
                        label="Name project"
                        name="nameProject"
                        fullWidth
                        value={formik.values.nameProject}
                        onInputChange={formik.handleChange}
                        error={
                          formik.touched.nameProject &&
                          Boolean(formik.errors.nameProject)
                        }
                        helperText={
                          formik.touched.nameProject
                            ? formik.errors.nameProject
                            : undefined
                        }
                      />
                    </Grid>
                    <Grid item className={classes.gridButton}>
                      <Button
                        className={classes.button}
                        onClick={handleClose}
                        color="primary"
                        fullWidth
                        type="submit"
                        disabled={!formik.isValid}
                      >
                        Create Project
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Carousel />
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewProjectDialog
