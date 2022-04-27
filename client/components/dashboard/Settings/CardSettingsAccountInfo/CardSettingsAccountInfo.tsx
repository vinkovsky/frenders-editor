import React, {
  ChangeEvent,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'

import { Avatar, Badge, Button, IconButton, Input } from '@ui/index'
import { AppContext } from '@providers/AppProvider'
import {
  IDeleteAvatarMutationProps,
  IDeleteUserProps,
  IUpdateMutationProps,
  IUpdateUserProps,
  IUploadFileMutationProps,
  IUploadFileProps,
} from '@interfaces/auth'
import { ISavedCardMutationProps } from '@interfaces/dashboard'
import {
  loadAvatar,
  updateUser,
  deleteAvatar,
  deleteUser,
} from '@utils/auth/auth'
import { errorMessage } from '@helpers/errorMessage'
import { DashboardContext } from '@providers/DashboardProvider'
import { deleteAllSavedCardUser } from '@utils/dashboard/dashboard'

import UPDATE_USER from '@graphql/mutations/auth/UpdateUser'
import LOAD_AVATAR from '@graphql/mutations/auth/LoadAvatar'
import DELETE_USER from '@graphql/mutations/auth/DeleteUser'
import DELETE_AVATAR from '@graphql/mutations/auth/DeleteAvatar'
import DELETE_SAVED_CARD from '@graphql/mutations/dashboard/DeleteSavedCard'

import { useStyles } from './CardSettingsAccountInfo.styles'

const CardSettingsAccountInfo: FunctionComponent<any> = () => {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { state: stateApp, dispatch: dispatchApp } = useContext(AppContext)
  const { state: stateDashboard, dispatch: dispatchDashboard } = useContext(
    DashboardContext
  )
  const [check, setCheck] = useState<boolean>(false)

  const [removeAllSavedCards] = useMutation<ISavedCardMutationProps>(
    DELETE_SAVED_CARD
  )
  const [
    update,
    { error: errorUpdateUser, loading: loadingUpdateUser },
  ] = useMutation<IUpdateMutationProps>(UPDATE_USER)
  const [
    removeUser,
    { error: errorRemoveUser },
  ] = useMutation<IDeleteUserProps>(DELETE_USER)
  const [
    uploadAvatar,
    { loading: loadingUploadAvatar, error: errorUploadAvatar },
  ] = useMutation<IUploadFileMutationProps>(LOAD_AVATAR)
  const [
    removeAvatar,
    { loading: loadingDeleteAvatar, error: errorDeleteAvatar },
  ] = useMutation<IDeleteAvatarMutationProps>(DELETE_AVATAR)

  useEffect(() => {
    router.prefetch('/')
  }, [router])

  const initialValuesUsername: Partial<IUpdateUserProps> = {
    username: stateApp.user?.username || '',
  }

  const initialValuesEmail: Partial<IUpdateUserProps> = {
    email: stateApp.user?.email || '',
  }

  const validationSchemaUsername = yup.object({
    username: yup.string().required('Username is required'),
  })

  const validationSchemaEmail = yup.object({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
  })

  const handleSubmit = async (values: Partial<IUpdateUserProps>) => {
    try {
      const data = await updateUser(stateApp, dispatchApp, update, values)
      if (!data.user) {
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      } else {
        enqueueSnackbar('You have successfully updated', {
          variant: 'success',
        })
      }
    } catch (error) {
      enqueueSnackbar(errorMessage(error), {
        variant: 'error',
      })
    }
  }

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = (e.target.files as any)[0]
      const fileData: IUploadFileProps = {
        file: file,
        ref: 'user',
        refId: stateApp.user?.id,
        field: 'avatar',
        source: 'users-permissions',
      }
      if (file) {
        const data = await loadAvatar(dispatchApp, uploadAvatar, fileData)
        if (!data.url) {
          enqueueSnackbar(errorMessage(data), {
            variant: 'error',
          })
        }
      }
    } catch (error) {
      enqueueSnackbar(errorMessage(error), {
        variant: 'error',
      })
    }
  }

  const handleAccountDeleteClick = async () => {
    try {
      const data = await deleteUser(stateApp, dispatchApp, removeUser)
      if (!data.user) {
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      } else {
        await deleteAllSavedCardUser(
          stateDashboard,
          dispatchDashboard,
          removeAllSavedCards
        )
        await router.push('/')
      }
    } catch (error) {
      enqueueSnackbar(errorMessage(error), {
        variant: 'error',
      })
    }
  }

  const handleAvatarDeleteClick = async () => {
    try {
      const data = await deleteAvatar(
        dispatchApp,
        removeAvatar,
        stateApp.avatar
      )
      if (!data.id) {
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      }
    } catch (error) {
      enqueueSnackbar(errorMessage(error), {
        variant: 'error',
      })
    }
  }

  const handleCheckboxClick = () => setCheck((check: boolean) => !check)

  const formikUsername = useFormik({
    initialValues: initialValuesUsername,
    validationSchema: validationSchemaUsername,
    onSubmit: handleSubmit,
    validateOnMount: true,
  })

  const formikEmail = useFormik({
    initialValues: initialValuesEmail,
    validationSchema: validationSchemaEmail,
    onSubmit: handleSubmit,
    validateOnMount: true,
  })

  if (
    errorDeleteAvatar ||
    errorUpdateUser ||
    errorRemoveUser ||
    errorUploadAvatar
  ) {
    enqueueSnackbar('An error occurred', {
      variant: 'error',
    })
  }

  return (
    <Grid container spacing={3}>
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title={'Your Name'} />
            <CardContent>
              <form onSubmit={formikUsername.handleSubmit}>
                <Input
                  id="username"
                  type="text"
                  label="Username"
                  name="username"
                  fullWidth
                  className={classes.input}
                  value={formikUsername.values.username}
                  onInputChange={formikUsername.handleChange}
                  error={
                    formikUsername.touched.username &&
                    Boolean(formikUsername.errors.username)
                  }
                  helperText={
                    formikUsername.touched.username
                      ? formikUsername.errors.username
                      : undefined
                  }
                />
                <Button
                  icon="save"
                  type="submit"
                  disabled={loadingUpdateUser || !formikUsername.isValid}
                >
                  Save
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title={'Your email'} />
            <CardContent>
              <form onSubmit={formikEmail.handleSubmit}>
                <Input
                  id="email"
                  type="email"
                  label="Email address"
                  name="email"
                  fullWidth
                  className={classes.input}
                  value={formikEmail.values.email}
                  onInputChange={formikEmail.handleChange}
                  error={
                    formikEmail.touched.email &&
                    Boolean(formikEmail.errors.email)
                  }
                  helperText={
                    formikEmail.touched.email
                      ? formikEmail.errors.email
                      : undefined
                  }
                />
                <Button
                  icon="save"
                  type="submit"
                  disabled={loadingUpdateUser || !formikEmail.isValid}
                >
                  Save
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title={'Your avatar'} />
            <CardContent className={classes.content}>
              <Badge
                badgeContent={
                  <>
                    <input
                      accept="image/*"
                      className={classes.file}
                      id="icon-button-file"
                      name="image"
                      type="file"
                      onChange={(e) => handleUpload(e)}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        disabled={true}
                        icon="photo"
                        className={classes.icon}
                      />
                    </label>
                  </>
                }
              >
                <Avatar className={classes.avatar} src={stateApp.avatar.url}>
                  {loadingUploadAvatar || loadingDeleteAvatar ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    (stateApp.user?.username as string)[0].toUpperCase()
                  )}
                </Avatar>
              </Badge>
              <Button
                icon="delete"
                disabled={stateApp.avatar.url.length <= 0}
                className={classes.delete}
                onClick={handleAvatarDeleteClick}
              >
                Delete avatar
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title={'Delete Your Frenders Account'} />
            <CardContent>
              <span>
                This action will queue the deletion of all your Frenders account
                data, including: saved models and your billing subscription.
              </span>
              <Typography>
                <Input
                  type="checkbox"
                  checked={check}
                  onCheckBoxChange={handleCheckboxClick}
                />
                Сonfirm that I want to delete my account
              </Typography>
              <CardActions>
                <Button
                  icon="delete"
                  disabled={!check}
                  onClick={handleAccountDeleteClick}
                  className={classes.delete}
                >
                  Delete account
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CardSettingsAccountInfo
