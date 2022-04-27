import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  Box,
  Container,
  Grid,
  Divider,
  Hidden,
  Typography,
} from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { Button, Input, Link, SocialButton } from '@ui/index'
import { ILoginProps, ILoginMutationProps } from '@interfaces/auth'
import { AppContext } from '@providers/AppProvider'
import { errorMessage } from '@helpers/errorMessage'
import { loginUser } from '@utils/auth/auth'

import LOGIN_USER from '@graphql/mutations/auth/LoginUser'

import { useStyles } from './Login.styles'

const Login: FunctionComponent = () => {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { state, dispatch } = useContext(AppContext)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [login] = useMutation<ILoginMutationProps>(LOGIN_USER)

  useEffect(() => {
    router.prefetch('/dashboard')
  }, [router])

  const handleIconPasswordClick = () =>
    setIsPasswordVisible((isPasswordVisible: boolean) => !isPasswordVisible)

  const initialValues: ILoginProps = {
    identifier: '',
    password: '',
  }

  const validationSchema = yup.object({
    identifier: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'The minimum password length is 6 characters')
      .required('Password is required'),
  })

  const handleSubmit = async (values: ILoginProps) => {
    try {
      const data = await loginUser(dispatch, login, values)
      if (!data.user) {
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      } else {
        enqueueSnackbar('You have been successfully logged in', {
          variant: 'success',
        })
        router.push('/dashboard')
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
    <Grid container>
      <Hidden smDown>
        <Grid container item md={6}>
          <Box className={classes.background} />
        </Grid>
      </Hidden>
      <Grid container item xs={12} md={6} justify="center" alignItems="center">
        <Container maxWidth="xs">
          <Typography component={'h1'} className={classes.heading}>
            Sign In
          </Typography>
          <Grid container spacing={2} item className={classes.socialAuth}>
            <Grid item xs={12} sm={6}>
              <SocialButton icon="vk" className={classes.vk}>
                Connect with VK
              </SocialButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SocialButton icon="google" className={classes.google}>
                Connect with Google
              </SocialButton>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" className={classes.divider} />
          <form onSubmit={formik.handleSubmit}>
            <Input
              id="identifier"
              type="email"
              label="Email address"
              name="identifier"
              fullWidth
              className={classes.input}
              value={formik.values.identifier}
              onInputChange={formik.handleChange}
              error={
                formik.touched.identifier && Boolean(formik.errors.identifier)
              }
              helperText={
                formik.touched.identifier ? formik.errors.identifier : undefined
              }
            />
            <Input
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              label="Password"
              name="password"
              icon={isPasswordVisible ? 'visibilityOff' : 'visibility'}
              onIconClick={handleIconPasswordClick}
              fullWidth
              className={classes.input}
              value={formik.values.password}
              onInputChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password ? formik.errors.password : undefined
              }
            />
            <Button
              type="submit"
              disabled={state.loading || !formik.isValid}
              fullWidth
              className={classes.button}
            >
              {!state.loading ? 'Sign In' : 'Loading'}
            </Button>
          </form>
          <Grid container item justify="space-around">
            <Grid item>
              <Link href={'/reset'}>Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link href={'/signup'}>Don`t have an account?</Link>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  )
}

export default Login
