import React, { FunctionComponent, useState } from 'react'
import { Grid, Container, Typography, Hidden, Box } from '@material-ui/core'
import { useRouter } from 'next/router'

import { Link } from '@ui/index'
import ResetPasswordForm from '../ResetPasswordForm'
import ForgotPasswordForm from '../ForgotPasswordForm'

import { useStyles } from './ResetPassword.styles'

const ResetPassword: FunctionComponent = () => {
  const classes = useStyles()
  const router = useRouter()
  const code = router.query?.code
  const [emailSend, setEmailSend] = useState<boolean>(false)
  const [emailFormik, setFormikEmail] = useState<string>('')

  const setEmailData = (value: boolean) => setEmailSend(value)

  const setFormikEmailData = (value: string) => setFormikEmail(value)

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
            {emailSend ? 'Email sent' : 'Recovery Password'}
          </Typography>
          <Grid item>
            {code ? (
              <ResetPasswordForm />
            ) : emailSend ? (
              <Typography component="p" className={classes.text}>
                Check your mailing address <strong>{emailFormik}</strong>
              </Typography>
            ) : (
              <>
                <ForgotPasswordForm
                  setEmailData={setEmailData}
                  setFormikEmailData={setFormikEmailData}
                />
                <Grid container item justify="center">
                  <Grid item>
                    <Link href={'/signin'}>Sign In</Link> or{' '}
                    <Link href={'/signup'}>Sign Up</Link>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </Grid>
    </Grid>
  )
}

export default ResetPassword
