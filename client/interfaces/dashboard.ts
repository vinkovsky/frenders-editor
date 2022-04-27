export interface IDashboardSettingsProps {
  openSidebar: boolean
  selectedIndex: number
  settingsMenu: any
}

export interface IDashboardCardsProps {
  cardLibraryListData: Array<ICardProps>
  filteredUserListData: Array<ICategoryChipItemProps>
  filteredListData: Array<ICategoryChipListProps>
  favoriteCardList: Array<ICardProps>
  currentCard: ICardProps | null
  currentGroup: string | null
  savedCards: Array<ISavedCardProps>
}

export interface IDashboardProps {
  settings: IDashboardSettingsProps
  cards: IDashboardCardsProps
}

export interface ICategoryChipItemProps {
  colorChip?: string
  categoryItem?: string
  disabled?: boolean
}

export interface ICategoryChipListProps {
  category: string
  categoryItems: ICategoryChipItemProps[]
}

export interface IFilteredChipListProps {
  categoryItems: ICategoryChipItemProps[]
  className?: string
  currentRefinement: any
  items: any
  refine: (items: string[]) => void
}

export interface ICardProps {
  id?: string
  title?: string
  img?: any
  className?: string
  categoryItem?: string
  category?: string
  height?: number
  model?: any
  favorite?: boolean
  colorChip?: string
  onClick?: () => void
  onIconClick?: () => void
}

export interface ICardListProps {
  cardsSavedData?: Array<ISavedCardProps>
  size?: Record<string, number>
}

export type DataModelTypeItems = {
  id: string
  url: string
}

export type DataModelType = {
  model: DataModelTypeItems
  img: DataModelTypeItems
  title: string | undefined
}

export interface ISavedCardProps {
  id?: string
  nameGroup: string
  nameProject: string
  dataModel?: DataModelType
  savedUvwData?: any
  savedModelData?: any
  savedAssetsData?: any
  savedCameraData?: any
  createdAt?: Date
  updatedAt?: Date
  user?: string | undefined
}

export interface ISavedCardMutationProps {
  savedCard: ISavedCardProps
}
