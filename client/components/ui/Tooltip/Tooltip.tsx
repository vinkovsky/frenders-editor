import React, { forwardRef, FunctionComponent, ReactNode, Ref } from 'react'
import { Tooltip as MuiTooltip, TooltipProps } from '@material-ui/core'

import { useStyles } from './Tooltip.styles'

export interface ITooltipProps {
  children: ReactNode
  title: string | ReactNode
  arrow?: boolean
}

export type TooltipType = ITooltipProps & TooltipProps

const Tooltip: FunctionComponent<TooltipType> = forwardRef(
  ({ children, title, arrow, ...props }, ref: Ref<any>) => {
    const classes = useStyles()

    return (
      <MuiTooltip
        ref={ref}
        title={title}
        arrow={arrow}
        classes={{ tooltip: classes.tooltip }}
        {...props}
      >
        {children}
      </MuiTooltip>
    )
  }
)

export default Tooltip
