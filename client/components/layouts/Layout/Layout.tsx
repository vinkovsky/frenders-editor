import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import GeneralLayout from '../GeneralLayout'
import AuthLayout from '../AuthLayout'
import DashboardLayout from '../DashboardLayout'
import EditorLayout from '../EditorLayout'
import { ILayoutProps } from '@interfaces/layouts'

import { useStyles } from './Layout.style'

const Layout: FunctionComponent<ILayoutProps> = ({ children, title = '' }) => {
  const classes = useStyles()
  const router = useRouter()

  const changeLayout = () => {
    switch (router.pathname) {
      case '/':
        return <GeneralLayout>{children}</GeneralLayout>
      case '/signin':
      case '/signup':
      case '/reset':
        return <AuthLayout>{children}</AuthLayout>
      case '/dashboard':
        return <DashboardLayout>{children}</DashboardLayout>
      case '/scene/[id]':
        return <EditorLayout>{children}</EditorLayout>
    }
  }

  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {changeLayout()}
    </div>
  )
}

export default Layout
