import React, { useEffect } from 'react'
import App, { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'

import ThemeProvider, { themes } from '@providers/ThemeProvider'
import AppController from '@controllers/AppController'
import DashboardController from '@controllers/DashboardController'
import NotistackProvider from '@providers/NotistackProvider'
import withApollo from '@graphql/apolloClient'

import '../public/styles/global.sass'
import 'sanitize.css'

const MyApp = ({
  Component,
  pageProps,
  apollo,
}: AppProps | any): JSX.Element => {
  useEffect(() => {
    const jssStyles: any = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ApolloProvider client={apollo}>
      <ThemeProvider theme={themes[0]}>
        <AppController>
          <DashboardController>
            <NotistackProvider>
              <Component {...pageProps} />
            </NotistackProvider>
          </DashboardController>
        </AppController>
      </ThemeProvider>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default withApollo(MyApp)
