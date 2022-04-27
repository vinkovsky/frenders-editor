import React, { useEffect, useContext } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useSnackbar } from 'notistack'

import { Loader } from '@ui/index'
import { AppContext } from '@providers/AppProvider'
import * as ACTIONS from '@actions/auth'
import { errorMessage } from '@helpers/errorMessage'

const ConnectPage: NextPage = () => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { dispatch } = useContext(AppContext)
  const { access_token, provider } = router.query

  // Запрос на вход через провайдеры (Google, VK)
  useEffect(() => {
    if (access_token) {
      try {
        fetch(
          `${process.env.STRAPI_API_URL}${router.asPath.replace(
            `auth/${provider}`,
            `auth/${provider}/callback`
          )}`
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.user) {
              dispatch(ACTIONS.authSuccess(res))
              Cookies.set('token', res.jwt)
              enqueueSnackbar('You have been successfully logged in', {
                variant: 'success',
              })
              router.push('/dashboard')
            } else {
              dispatch(ACTIONS.authError())
              // Возможные ошибки при входе
              if (res.message.code === 11000) {
                enqueueSnackbar('Username already is taken', {
                  variant: 'error',
                })
              } else if (Array.isArray(res.message)) {
                enqueueSnackbar('Email already is taken', {
                  variant: 'error',
                })
              } else {
                enqueueSnackbar('An error occurred', {
                  variant: 'error',
                })
              }
              router.push('/signin')
            }
          })
      } catch (error) {
        enqueueSnackbar(errorMessage(error), {
          variant: 'error',
        })
        router.push('/signin')
      }
    }
  }, [router, access_token, provider])

  return <Loader />
}

export default ConnectPage
