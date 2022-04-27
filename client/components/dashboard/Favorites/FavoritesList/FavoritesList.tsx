import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useMutation } from '@apollo/client'
import StackGrid from 'react-stack-grid'
import { withSize } from 'react-sizeme'
import { useSnackbar } from 'notistack'

import { ICardListProps, ICardProps } from '@interfaces/dashboard'
import * as ACTIONS from '@actions/dashboard/cards'
import { AppContext } from '@providers/AppProvider'
import { DashboardContext } from '@providers/DashboardProvider'
import { createLibraryCardsUser } from '@utils/auth/auth'
import CardLibrary from '../../Library/CardLibrary'
import NewProjectDialog from '../../Library/NewProjectDialog'

import UPDATE_USER from '@graphql/mutations/auth/UpdateUser'

const FavoritesList: FunctionComponent<ICardListProps> = ({ size }) => {
  const grid = useRef<any>(null)
  const currentItem = useRef<ICardProps>({})
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState<boolean>(false)
  const { state: stateApp, dispatch: dispatchApp } = useContext(AppContext)
  const { state: stateDashboard, dispatch: dispatchDashboard } = useContext(
    DashboardContext
  )

  const [update] = useMutation(UPDATE_USER)

  const setWidth = () => {
    if (size!.width >= 480 && size!.width <= 768) {
      return '50%'
    } else if (size!.width <= 480) {
      return '100%'
    } else if (size!.width >= 768 && size!.width <= 992) {
      return '33.3%'
    } else {
      return '25%'
    }
  }

  const handleIconClick = useCallback(
    async (item: ICardProps) => {
      try {
        currentItem.current = { ...item, favorite: !item.favorite }
        dispatchDashboard(ACTIONS.changeCardLibraryData(currentItem.current))
        dispatchDashboard(ACTIONS.getFavoritesCardLibraryData())
      } catch (error) {
        enqueueSnackbar('An error occurred', {
          variant: 'error',
        })
      }
    },
    [currentItem.current]
  )

  useEffect(() => {
    if (Object.keys(currentItem.current).length !== 0) {
      createLibraryCardsUser(
        stateApp,
        dispatchApp,
        update,
        stateDashboard.cards.cardLibraryListData
      )
      currentItem.current = {}
    }
  }, [currentItem.current, stateApp, stateDashboard, update])

  const handleClick = useCallback(
    (item: ICardProps) => {
      dispatchDashboard(ACTIONS.setCurrentCard(item))
      setOpen(true)
    },
    [open]
  )

  return (
    <>
      <StackGrid
        gridRef={(ref) => (grid.current = ref)}
        columnWidth={setWidth()}
        monitorImagesLoaded={true}
        gutterWidth={30}
        gutterHeight={30}
      >
        {stateDashboard.cards.favoriteCardList.length > 0 ? (
          stateDashboard.cards.favoriteCardList.map((item: ICardProps) => (
            <CardLibrary
              key={item.title}
              title={item.title}
              img={item.img?.url}
              model={item.model?.url}
              categoryItem={item.categoryItem}
              height={300}
              colorChip={item.colorChip}
              favorite={item.favorite}
              onIconClick={() => handleIconClick(item)}
              onClick={() => handleClick(item)}
            />
          ))
        ) : (
          <div>No favorites cards</div>
        )}
        )
      </StackGrid>
      <NewProjectDialog openDialog={open} handleOpenDialog={setOpen} />
    </>
  )
}

export default withSize()(FavoritesList)
