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
import { IRegisterProps, IRegisterMutationProps } from '@interfaces/auth'
import { AppContext } from '@providers/AppProvider'
import { errorMessage } from '@helpers/errorMessage'
import { registerUser } from '@utils/auth/auth'

import REGISTER_USER from '@graphql/mutations/auth/RegisterUser'

import { useStyles } from './Register.styles'

const Register: FunctionComponent = () => {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { state, dispatch } = useContext(AppContext)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  const [register] = useMutation<IRegisterMutationProps>(REGISTER_USER)

  useEffect(() => {
    router.prefetch('/signin')
  }, [router])

  const handleIconPasswordClick = () => {
    setIsPasswordVisible((isPasswordVisible: boolean) => !isPasswordVisible)
  }

  const initialValues: IRegisterProps = {
    username: '',
    email: '',
    password: '',
  }

  const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'The minimum password length is 6 characters')
      .required('Password is required'),
  })

  const handleSubmit = async (values: IRegisterProps) => {
    try {
      const data = await registerUser(dispatch, register, values)
      if (!data.user) {
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      } else {
        enqueueSnackbar('You have successfully registered', {
          variant: 'success',
        })
        enqueueSnackbar(
          `Please verify your email address in order to access your Frenders account`,
          {
            variant: 'info',
            autoHideDuration: 10000,
          }
        )
        router.push('/signin')
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
            Sign Up
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
              id="username"
              type="text"
              label="Username"
              name="username"
              fullWidth
              className={classes.input}
              value={formik.values.username}
              onInputChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={
                formik.touched.username ? formik.errors.username : undefined
              }
            />
            <Input
              id="email"
              type="email"
              label="Email address"
              name="email"
              fullWidth
              className={classes.input}
              value={formik.values.email}
              onInputChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={
                formik.touched.email ? formik.errors.email : undefined
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
              {!state.loading ? 'Sign Up' : 'Loading'}
            </Button>
          </form>
          <Grid container item justify="center">
            <Link href={'/signin'}>Already have an account?</Link>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  )
}

export default Register
