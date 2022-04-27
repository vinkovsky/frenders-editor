import React, {
  createRef,
  FunctionComponent,
  useContext,
  useState,
} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'

import { Button, Input } from '@ui/index'
import {
  IForgotPasswordProps,
  IForgotPasswordMutationProps,
  IForgotProps,
} from '@interfaces/auth'
import { AppContext } from '@providers/AppProvider'
import { errorMessage } from '@helpers/errorMessage'
import { forgotPasswordUser } from '@utils/auth/auth'

import FORGOT_PASSWORD from '@graphql/mutations/auth/ForgotPassword'

import { useStyles } from './ForgotPasswordForm.styles'

const ForgotPasswordForm: FunctionComponent<IForgotProps> = ({
  setEmailData,
  setFormikEmailData,
}) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { state, dispatch } = useContext(AppContext)
  const recaptchaRef = createRef<any>()
  const [captchaToken, setCaptchaToken] = useState<string>('')

  const [forgotPassword] = useMutation<IForgotPasswordMutationProps>(
    FORGOT_PASSWORD
  )

  const initialValues: IForgotPasswordProps = {
    email: '',
  }

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
  })

  const handleSubmit = async (values: IForgotPasswordProps) => {
    if (captchaToken.length) {
      try {
        const data = await forgotPasswordUser(dispatch, forgotPassword, values)
        if (!data.ok) {
          enqueueSnackbar(errorMessage(data), {
            variant: 'error',
          })
        } else {
          setEmailData(data.ok)
          setFormikEmailData(values.email)
        }
      } catch (error) {
        enqueueSnackbar(errorMessage(error), {
          variant: 'error',
        })
      }
    } else {
      enqueueSnackbar('Go through the captcha', {
        variant: 'error',
      })
    }
  }

  const handleCaptcha = (value: string) => setCaptchaToken(value)

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    validateOnMount: true,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
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
        helperText={formik.touched.email ? formik.errors.email : undefined}
      />
      <ReCAPTCHA
        ref={recaptchaRef}
        onChange={handleCaptcha}
        hl="en"
        sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SECRET_KEY}
        className={classes.input}
      />
      <Button
        type="submit"
        disabled={state.loading || !formik.isValid}
        fullWidth
        className={classes.button}
      >
        {!state.loading ? 'Restore Access' : 'Loading'}
      </Button>
    </form>
  )
}

export default ForgotPasswordForm
