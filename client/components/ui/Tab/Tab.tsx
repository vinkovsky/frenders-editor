import React, { FunctionComponent } from 'react'
import MuiTab, { TabProps } from '@material-ui/core/Tab'

import { useStyles } from './Tab.styles'

const Tab: FunctionComponent<TabProps> = (props) => {
  const classes = useStyles()
  return (
    <MuiTab
      {...props}
      classes={{ root: classes.root, selected: classes.selected }}
    />
  )
}

export default Tab
