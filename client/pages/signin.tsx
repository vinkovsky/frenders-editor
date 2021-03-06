import React from 'react'
import { NextPage } from 'next'

import Login from '../components/auth/Login'
import Layout from '../components/layouts/Layout'

const SignInPage: NextPage = () => {
  return (
    <Layout title="Sign In">
      <Login />
    </Layout>
  )
}

export default SignInPage
