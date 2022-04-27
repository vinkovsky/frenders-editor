import React, { useEffect, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'

import { Loader } from '@ui/index'
import { AppContext } from '@providers/AppProvider'
import * as ACTIONS from '@actions/auth'
import { useInitDataStore } from '@store/editor/initData'
import { logoutUser } from '@utils/auth/auth'

import GET_USER from '@graphql/queries/auth/GetUser'

const withAuth = (Component: any) => {
  const Wrapper = (props) => {
    const router = useRouter()
    const { state, dispatch } = useContext(AppContext)
    const { enqueueSnackbar } = useSnackbar()

    const { data, loading, error } = useQuery(GET_USER)

    const { initDataUser } = useInitDataStore<any>((state: any) => state.data)
    const { setInitDataUser } = useInitDataStore<any>((state: any) => state.api)

    useEffect(() => {
      // Синхронный выход из всех открытых вкладок
      const syncLogout = async (event) => {
        if (event.key === 'logout') {
          await logoutUser(dispatch)
          await router.push('/signin')
        }
      }
      window.addEventListener('storage', syncLogout)

      // Установка начальных значений данных пользователя в store
      if (!loading && data) {
        dispatch(ACTIONS.authSuccess({ user: data.me }))
        setInitDataUser(initDataUser ? initDataUser : data.me)
        if (data.me.avatar) dispatch(ACTIONS.loadAvatar(data.me.avatar))
      }
      // Сообщение об ошибке входа на страницы не загрегистрированным пользователям
      if (error) {
        enqueueSnackbar('You are not registered', { variant: 'error' })
        syncLogout({ key: 'logout' })
      }
      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [data, loading, error, router])

    if (state.token) {
      return <Component {...props} />
    }

    return <Loader />
  }

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps
  }

  return Wrapper
}

export default withAuth
