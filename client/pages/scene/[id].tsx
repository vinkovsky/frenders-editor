import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { useSnackbar } from 'notistack'

import { Loader } from '@ui/index'
import Layout from '../../components/layouts/Layout'
import Editor from '../../components/editor/Editor'
import withAuth from '@hocs/withAuth'
import ThemeProvider, { themes } from '@providers/ThemeProvider'

import GET_MODEL from '@graphql/queries/dashboard/GetModel'

const ScenePage: NextPage = () => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const browserCloseHandler = (e) => {
    e.preventDefault()
    e.returnValue = ''
  }

  useEffect(() => {
    if (window) {
      router.beforePopState(() => {
        const result = window.confirm('Are you sure you want to leave?')
        if (result) {
          router.push('/dashboard')
          router.reload()
        } else {
          router.push(`/scene/${router.query.id}`)
        }
        return result
      })
      window.onbeforeunload = browserCloseHandler
    }

    return () => {
      if (window) {
        window.onbeforeunload = null
      }
      router.beforePopState(() => {
        return true
      })
    }
  }, [])

  const { data, loading, error } = useQuery(GET_MODEL, {
    variables: {
      id: router.query.id,
    },
  })

  if (!data && loading) return <Loader />
  if (error) {
    enqueueSnackbar('An error occurred', {
      variant: 'error',
    })
    router.push('/dashboard')
  }

  return (
    <Layout title={`Frenders | ${data?.savedCard?.nameProject} `}>
      <ThemeProvider theme={themes[2]}>
        <Editor dataSavedCard={data?.savedCard} />
      </ThemeProvider>
    </Layout>
  )
}

export default withAuth(ScenePage)
