import React, { ChangeEvent, FunctionComponent } from 'react'
import { Tabs } from '@material-ui/core'

import Tab from '../Tab'
import { ITabProps } from '@ui/NavigationTabs/NavigationTabs'

import { useStyles } from './ScrollableTabs.styles'

export interface IScrollableTabsProps {
  tabsData: ITabProps[]
  scrollable?: boolean
  value: string | number
  onChange: (e: ChangeEvent<any>, value: any) => void
}

function a11yProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  }
}

const ScrollableTabs: FunctionComponent<IScrollableTabsProps> = ({
  tabsData,
  scrollable,
  value,
  onChange,
}) => {
  const classes = useStyles()

  return (
    <Tabs
      value={value}
      classes={{
        root: classes.root,
        scroller: classes.scroller,
        indicator: classes.indicator,
      }}
      onChange={onChange}
      variant={scrollable ? 'scrollable' : undefined}
      scrollButtons={scrollable ? 'auto' : undefined}
      centered={!scrollable}
    >
      {tabsData.map(({ value }, index: number) => (
        <Tab label={value} key={value} {...a11yProps(index)} />
      ))}
    </Tabs>
  )
}

export default ScrollableTabs
