import React, { ChangeEvent, FunctionComponent } from 'react'
import { Tabs } from '@material-ui/core'

import Tab from '@ui/Tab'
import { ITabProps } from '@ui/NavigationTabs/NavigationTabs'
import { useObjectSceneStore } from '@store/editor/objectScene'

import { useStyles } from './UvwTabs.styles'

interface IScrollableTabsProps {
  tabsData: ITabProps[]
  scrollable?: boolean
  value: string | number
  onChange: (event: ChangeEvent<any>, value: any) => void
}

function a11yProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  }
}

const UvwTabs: FunctionComponent<IScrollableTabsProps> = ({
  tabsData,
  scrollable,
  value,
  onChange,
}) => {
  const classes = useStyles()
  const { dataMaps } = useObjectSceneStore<any>((state: any) => state.data)

  if (dataMaps.length === 0) return null

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
        <Tab
          label={value}
          key={value}
          disabled={dataMaps[index].disabled}
          {...a11yProps(index)}
        />
      ))}
    </Tabs>
  )
}

export default UvwTabs
