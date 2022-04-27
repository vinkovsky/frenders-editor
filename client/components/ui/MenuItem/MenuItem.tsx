import React, {
  FunctionComponent,
  forwardRef,
  Ref,
  ElementType,
  ReactNode,
  MouseEvent,
} from 'react'
import {
  MenuItem as MuiMenuItem,
  ListItemIcon,
  SvgIconProps,
  Typography,
} from '@material-ui/core'
import { Settings, ExitToApp } from '@material-ui/icons'
import clsx from 'clsx'

import { useStyles } from './MenuItem.styles'

type IconType = 'settings' | 'logout'

export interface IMenuItemProps {
  className?: string
  icon?: IconType
  text?: string
  children?: ReactNode
  onClick?: (event: MouseEvent<HTMLLIElement>) => void
}

const iconListItemMap: Record<IconType, ElementType<SvgIconProps>> = {
  settings: Settings,
  logout: ExitToApp,
}

const MenuItem: FunctionComponent<IMenuItemProps> = forwardRef(
  (
    { className, icon, text, children, onClick, ...props },
    ref: Ref<HTMLLIElement>
  ) => {
    const classes = useStyles()
    const classesIconButton = clsx(classes.menuItem, className)

    const IconComponent: any = icon ? iconListItemMap[icon] : null
    const DataMenuItem = icon ? (
      <>
        <ListItemIcon>
          <IconComponent />
        </ListItemIcon>
        <Typography component="span" className={classes.text} noWrap>
          {text}
        </Typography>
      </>
    ) : (
      <Typography component="span" className={classes.text} noWrap>
        {children}
      </Typography>
    )

    return (
      <MuiMenuItem
        ref={ref}
        className={classesIconButton}
        onClick={onClick}
        {...props}
      >
        {DataMenuItem}
      </MuiMenuItem>
    )
  }
)

export default MenuItem
