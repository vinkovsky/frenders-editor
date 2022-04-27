import React, { FunctionComponent, useContext, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useSnackbar } from 'notistack'

import { Loader } from '@ui/index'
import { ILayoutProps } from '@interfaces/layouts'
import { IUpdateMutationProps } from '@interfaces/auth'
import * as ACTIONS_AUTH from '@actions/auth'
import * as ACTIONS_CARDS from '@actions/dashboard/cards'
import { AppContext } from '@providers/AppProvider'
import { DashboardContext } from '@providers/DashboardProvider'
import { createAssetsCardsUser } from '@utils/auth/auth'
import { errorMessage } from '@helpers/errorMessage'
import { useInitDataStore } from '@store/editor/initData'

import GET_USER from '@graphql/queries/auth/GetUser'
import UPDATE_USER from '@graphql/mutations/auth/UpdateUser'
import GET_SAVED_CARDS from '@graphql/queries/dashboard/GetSavedCards'
import GET_LIBRARY_ASSETS from '@graphql/queries/editor/GetLibraryAssets'

const DashboardLayout: FunctionComponent<ILayoutProps> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { dispatch: dispatchDashboard } = useContext(DashboardContext)
  const { state: stateApp, dispatch: dispatchApp } = useContext(AppContext)
  const { setInitDataUser } = useInitDataStore<any>((state: any) => state.api)

  const [
    update,
    { loading, error: errorUpdateUser },
  ] = useMutation<IUpdateMutationProps>(UPDATE_USER)
  const { data: dataUser, error: errorUser } = useQuery(GET_USER)
  const {
    data: dataSavedCards,
    loading: loadingSavedCards,
    error: errorSavedCards,
  } = useQuery(GET_SAVED_CARDS)
  const {
    data: dataAssets,
    loading: loadingAssets,
    error: errorAssets,
  } = useQuery(GET_LIBRARY_ASSETS)

  if (errorAssets || errorUser || errorUpdateUser || errorSavedCards) {
    enqueueSnackbar('An error occurred', {
      variant: 'error',
    })
  }

  const createAssetsCards = async (dataAssets) => {
    try {
      const data = await createAssetsCardsUser(
        stateApp,
        dispatchApp,
        update,
        dataAssets
      )
      if (!data.user) {
        enqueueSnackbar(errorMessage(data), {
          variant: 'error',
        })
      } else {
        setInitDataUser(data.user)
        dispatchDashboard(
          ACTIONS_CARDS.createCardLibraryData(data.user.libraryCards)
        )
        dispatchDashboard(ACTIONS_CARDS.getFavoritesCardLibraryData())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (dataSavedCards && dataUser) {
      dispatchDashboard(
        ACTIONS_CARDS.initSavedCard(
          dataSavedCards.savedCards.filter(
            (savedCard) => savedCard.user.id === dataUser.me.id
          )
        )
      )
    }
  }, [dataSavedCards, dataUser])

  useEffect(() => {
    if (dataUser?.me && dataUser && dataAssets?.textures && dataAssets) {
      if (
        dataUser.me.textures.length === 0 ||
        dataUser.me.environments.length === 0 ||
        dataUser.me.materials.length === 0 ||
        dataUser.me.libraryCards.length === 0
      ) {
        createAssetsCards(dataAssets)
      } else {
        dispatchApp(ACTIONS_AUTH.updateAssetsUser(dataUser.me))
        setInitDataUser(dataUser.me)
        dispatchDashboard(
          ACTIONS_CARDS.createCardLibraryData(dataUser.me.libraryCards)
        )
        dispatchDashboard(ACTIONS_CARDS.getFavoritesCardLibraryData())
      }
    }
  }, [dataUser, dataAssets])

  if (loading || loadingSavedCards || loadingAssets) return <Loader />

  return <>{dataAssets ? children : null}</>
}

export default DashboardLayout
