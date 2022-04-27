import React, {
  ChangeEvent,
  ElementType,
  forwardRef,
  FunctionComponent,
  Ref,
} from 'react'

import {
  BottomNavigation as TopNavigation,
  BottomNavigationAction as TopNavigationAction,
  BottomNavigationProps as TopNavigationProps,
  SvgIconProps,
} from '@material-ui/core'

import {
  Cloud,
  Layers,
  CameraAlt,
  Highlight,
  Category,
  Share,
  CenterFocusStrong,
  Texture,
} from '@material-ui/icons'
import clsx from 'clsx'

import { useStyles } from './NavigationTabs.styles'

type IconType =
  | 'assets'
  | 'camera'
  | 'layers'
  | 'renderer'
  | 'canvas'
  | 'share'
  | 'object'
  | 'lights'

export interface ITabProps extends TopNavigationProps {
  value: string
  icon?: IconType
}

export interface ITabsProps {
  tabsData: ITabProps[]
  className?: string
  onChange: (event: ChangeEvent<any>, value: string) => void
  value?: string
}

const iconTabsMap: Record<IconType, ElementType<SvgIconProps>> = {
  assets: Cloud,
  camera: CameraAlt,
  layers: Layers,
  renderer: CenterFocusStrong,
  canvas: Texture,
  share: Share,
  object: Category,
  lights: Highlight,
}

const NavigationTabs: FunctionComponent<ITabsProps> = forwardRef(
  ({ tabsData, value, className, onChange, ...props }, ref: Ref<any>) => {
    const classes = useStyles()
    const classesTab = clsx(classes.tabs, className)

    return (
      <TopNavigation
        ref={ref}
        value={value}
        className={classesTab}
        onChange={onChange}
        {...props}
      >
        {tabsData.map(({ value, icon }) => {
          const IconComponent: any = icon ? iconTabsMap[icon] : null

          return (
            <TopNavigationAction
              label={value}
              value={value}
              key={value}
              classes={{
                root: classes.root,
                iconOnly: classes.iconOnly,
                selected: classes.selected,
              }}
              icon={<IconComponent />}
            />
          )
        })}
      </TopNavigation>
    )
  }
)

export default NavigationTabs
