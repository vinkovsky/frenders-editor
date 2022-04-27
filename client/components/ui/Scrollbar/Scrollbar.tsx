import React, { forwardRef, FunctionComponent, ReactNode, Ref } from 'react'
import clsx from 'clsx'

export interface IScrollbarProps {
  children: ReactNode
  className?: string
}

import { useStyles } from './Scrollbar.styles'

const Scrollbar: FunctionComponent<IScrollbarProps> = forwardRef(
  ({ children, className }, ref: Ref<any>) => {
    const classes = useStyles()
    const classesScrollbar = clsx(classes.scrollbar, className)

    return (
      <div ref={ref} className={classesScrollbar}>
        {children}
      </div>
    )
  }
)

export default Scrollbar
