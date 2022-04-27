import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom'
import StackGrid from 'react-stack-grid'
import { useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { withSize } from 'react-sizeme'

import { ICardProps } from '@interfaces/dashboard'
import { IUpdateMutationProps } from '@interfaces/auth'
import * as ACTIONS from '@actions/dashboard/cards'
import { DashboardContext } from '@providers/DashboardProvider'
import { AppContext } from '@providers/AppProvider'
import { createLibraryCardsUser } from '@utils/auth/auth'
import { useInitDataStore } from '@store/editor/initData'
import CardLibrary from '../CardLibrary'
import NewProjectDialog from '../NewProjectDialog/NewProjectDialog'

import UPDATE_USER from '@graphql/mutations/auth/UpdateUser'

const InfiniteHits: FunctionComponent<any> = ({ hits, size }) => {
  const { enqueueSnackbar } = useSnackbar()
  const gridRef = useRef<any>(null)
  const currentItem = useRef<ICardProps>({})
  const [open, setOpen] = useState<boolean>(false)
  const { state: stateApp, dispatch: dispatchApp } = useContext(AppContext)
  const { state: stateDashboard, dispatch: dispatchDashboard } = useContext(
    DashboardContext
  )
  const { initDataUser } = useInitDataStore<any>((state: any) => state.data)

  const [update] = useMutation<IUpdateMutationProps>(UPDATE_USER)

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
        initDataUser,
        dispatchApp,
        update,
        stateDashboard.cards.cardLibraryListData
      )
      currentItem.current = {}
    }
  }, [currentItem.current, stateApp, update, stateDashboard])

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
        gridRef={(ref) => (gridRef.current = ref)}
        columnWidth={setWidth()}
        monitorImagesLoaded={false}
        gutterWidth={30}
        gutterHeight={30}
      >
        {hits.map((hit) => {
          const card = stateDashboard.cards.cardLibraryListData.find(
            (card: ICardProps) => {
              if (card.title == hit.title) {
                return card
              }
            }
          )
          return (
            <CardLibrary
              key={hit.objectID}
              title={hit.title}
              img={hit.img.url}
              model={hit.model.url}
              categoryItem={hit.categoryItem}
              height={hit.height}
              favorite={card?.favorite}
              colorChip={hit.colorChip}
              onIconClick={() => handleIconClick(card as ICardProps)}
              onClick={() => handleClick(hit)}
            />
          )
        })}
      </StackGrid>
      <NewProjectDialog openDialog={open} handleOpenDialog={setOpen} />
    </>
  )
}

const CardLibraryList = connectInfiniteHits(withSize()(InfiniteHits))

export default CardLibraryList
