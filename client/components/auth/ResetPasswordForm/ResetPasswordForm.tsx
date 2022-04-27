import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'

import { Button, Input } from '@ui/index'
import { IResetPasswordProps, IUserDataMutationProps } from '@interfaces/auth'
import { AppContext } from '@providers/AppProvider'
import { errorMessage } from '@helpers/errorMessage'
import { resetPasswordUser } from '@utils/auth/auth'

import RESET_PASSWORD from '@graphql/mutations/auth/ResetPassword'

import { useStyles } from './ResetPasswordForm.styles'

const ResetPasswordForm: FunctionComponent = () => {
  const classes = useStyles()

  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { state, dispatch } = useContext(AppContext)
  const code = router.query?.code
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [
    isConfirmPasswordVisible,
    setIsConfirmPasswordVisible,
  ] = useState<boolean>(false)

  const [resetPassword] = useMutation<IUserDataMutationProps>(RESET_PASSWORD)

  useEffect(() => {
    router.prefetch('/signin')
  }, [router])

  const handleIconPasswordClick = () => {
    setIsPasswordVisible((isPasswordVisible: boolean) => !isPasswordVisible)
  }

  const handleIconConfirmPasswordClick = () => {
    setIsConfirmPasswordVisible(
      (isConfirmPasswordVisible: boolean) => !isConfirmPasswordVisible
    )
  }

  const initialValues: IResetPasswordProps = {
    password: '',
    passwordConfirmation: '',
    code: '',
  }

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(6, 'The minimum password length is 6 characters')
      .required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password'),
  })

  const handleSubmit = async (values: IResetPasswordProps) => {
    try {
      const data = await resetPasswordUser(
        dispatch,
        resetPassword,
        values,
        code
      )
      if (!data.user) {
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      } else {
        enqueueSnackbar('You have successfully updated your password', {
          variant: 'success',
        })
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
    <form onSubmit={formik.handleSubmit}>
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
      <Input
        id="passwordConfirmation"
        type={isConfirmPasswordVisible ? 'text' : 'password'}
        label="Confirm Password"
        name="passwordConfirmation"
        icon={isConfirmPasswordVisible ? 'visibilityOff' : 'visibility'}
        onIconClick={handleIconConfirmPasswordClick}
        fullWidth
        className={classes.input}
        value={formik.values.passwordConfirmation}
        onInputChange={formik.handleChange}
        error={
          formik.touched.passwordConfirmation &&
          Boolean(formik.errors.passwordConfirmation)
        }
        helperText={
          formik.touched.passwordConfirmation
            ? formik.errors.passwordConfirmation
            : undefined
        }
      />
      <Button
        type="submit"
        disabled={state.loading || !formik.isValid}
        fullWidth
        className={classes.button}
      >
        {!state.loading ? 'Change Password' : 'Loading'}
      </Button>
    </form>
  )
}

export default ResetPasswordForm
