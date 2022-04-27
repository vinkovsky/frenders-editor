import React, {
  FunctionComponent,
  ElementType,
  forwardRef,
  Ref,
  ReactNode,
  MouseEvent,
} from 'react'
import {
  IconButton as MuiIconButton,
  IconButtonProps,
  SvgIconProps,
} from '@material-ui/core'
import {
  Menu,
  Search,
  Visibility,
  VisibilityOff,
  AccountCircle,
  AddCircleOutlineOutlined,
  Delete,
  ClearAll,
  Favorite,
  FavoriteBorder,
  Edit,
  ExpandMore,
  PhotoCamera,
  Close,
  CloudDownload,
  Undo,
  Redo,
  Dashboard,
  Refresh,
  FileCopy,
  Save,
  Fullscreen,
  Settings,
  InsertDriveFile,
  Description,
  Launch,
} from '@material-ui/icons'
import clsx from 'clsx'

import { useStyles } from './IconButton.styles'

type IconType =
  | 'menu'
  | 'search'
  | 'account'
  | 'visibility'
  | 'visibilityOff'
  | 'create'
  | 'favorite'
  | 'favoriteOff'
  | 'edit'
  | 'expand'
  | 'photo'
  | 'close'
  | 'undo'
  | 'redo'
  | 'reset'
  | 'download'
  | 'delete'
  | 'clear'
  | 'save'
  | 'copy'
  | 'paste'
  | 'cut'
  | 'fullScreen'
  | 'settings'
  | 'rename'
  | 'layout'

export interface IIconButtonProps extends IconButtonProps {
  icon?: IconType
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  children?: ReactNode
  className?: string
}

const defaultProps: Partial<IIconButtonProps> = {
  disabled: false,
}

type DefaultProps = Readonly<typeof defaultProps>

type IconButtonPropsType = IIconButtonProps & DefaultProps

const iconButtonMap: Record<IconType, ElementType<SvgIconProps>> = {
  menu: Menu,
  search: Search,
  account: AccountCircle,
  visibility: Visibility,
  visibilityOff: VisibilityOff,
  create: AddCircleOutlineOutlined,
  favorite: Favorite,
  favoriteOff: FavoriteBorder,
  rename: Edit,
  expand: ExpandMore,
  photo: PhotoCamera,
  close: Close,
  undo: Undo,
  redo: Redo,
  reset: Refresh,
  download: CloudDownload,
  clear: ClearAll,
  delete: Delete,
  layout: Dashboard,
  save: Save,
  copy: FileCopy,
  cut: Description,
  paste: InsertDriveFile,
  settings: Settings,
  fullScreen: Fullscreen,
  edit: Launch,
}

const IconButton: FunctionComponent<IconButtonPropsType> = forwardRef(
  (
    { icon, onClick, disabled, children, className, ...props },
    ref: Ref<HTMLButtonElement>
  ) => {
    const classes = useStyles()
    const classesIconButton = clsx(classes.iconButton, className)
    const IconComponent = icon ? iconButtonMap[icon] : null
    const Component = IconComponent ? <IconComponent /> : children

    return (
      <MuiIconButton
        ref={ref}
        size="small"
        className={classesIconButton}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {Component}
      </MuiIconButton>
    )
  }
)

IconButton.defaultProps = defaultProps

export default IconButton
