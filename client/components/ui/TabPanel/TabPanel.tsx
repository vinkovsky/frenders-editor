import React, { FunctionComponent, ReactNode } from 'react'
import { Box } from '@material-ui/core'
import clsx from 'clsx'

import { useStyles } from './TabPanel.styles'

export interface ITabPanelProps {
  children?: ReactNode
  index: string | number
  value: string | number
  className?: string
}

const TabPanel: FunctionComponent<ITabPanelProps> = ({
  children,
  value,
  index,
  className,
  ...props
}) => {
  const classes = useStyles()
  const classesBox = clsx(className, classes.box)

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className={classes.panel}
      {...props}
    >
      {value === index && (
        <Box p={3} className={classesBox}>
          {children}
        </Box>
      )}
    </div>
  )
}

export default TabPanel
