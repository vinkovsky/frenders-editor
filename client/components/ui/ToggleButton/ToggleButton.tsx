import React, {
  FunctionComponent,
  ElementType,
  forwardRef,
  Ref,
  ReactNode,
  ChangeEvent,
} from 'react'
import { SvgIconProps } from '@material-ui/core'
import {
  ToggleButton as MuiToggleButton,
  ToggleButtonProps,
} from '@material-ui/lab'
import {
  Cached,
  NearMe,
  GridOff,
  GridOn,
  LinearScale,
  OpenWith,
  ViewComfy,
  NotInterested,
  Fullscreen,
  FullscreenExit,
} from '@material-ui/icons'
import clsx from 'clsx'

import Tooltip from '../Tooltip'

import { useStyles } from './ToggleButton.styles'

export type IconType =
  | 'select'
  | 'move'
  | 'rotate'
  | 'scale'
  | 'gridOn'
  | 'gridOff'
  | 'gridSnapOn'
  | 'gridSnapOff'
  | 'fullscreen'
  | 'fullscreenExit'

export interface IToggleButtonProps extends ToggleButtonProps {
  icon?: IconType
  selected?: boolean
  value: string
  children?: ReactNode
  className?: string
  title: string
  onChange?: (event: ChangeEvent<any>) => void
}

const iconToolsMap: Record<IconType, ElementType<SvgIconProps>> = {
  select: NearMe,
  move: OpenWith,
  rotate: Cached,
  scale: LinearScale,
  gridOn: GridOn,
  gridOff: GridOff,
  gridSnapOn: ViewComfy,
  gridSnapOff: NotInterested,
  fullscreen: Fullscreen,
  fullscreenExit: FullscreenExit,
}

const ToggleButton: FunctionComponent<IToggleButtonProps> = forwardRef(
  (
    { icon, selected, value, onChange, children, className, title, ...props },
    ref: Ref<HTMLButtonElement>
  ) => {
    const classes = useStyles()
    const classesToggleButton = clsx(classes.root, className)
    const IconComponent = icon ? iconToolsMap[icon] : null
    const Component = IconComponent ? <IconComponent /> : children

    return (
      <Tooltip title={title} arrow>
        <MuiToggleButton
          ref={ref}
          size="small"
          classes={{
            sizeSmall: classes.sizeSmall,
            root: classesToggleButton,
            selected: classes.selected,
          }}
          onChange={onChange}
          selected={selected}
          value={value}
          {...props}
        >
          {Component}
        </MuiToggleButton>
      </Tooltip>
    )
  }
)

export default ToggleButton
