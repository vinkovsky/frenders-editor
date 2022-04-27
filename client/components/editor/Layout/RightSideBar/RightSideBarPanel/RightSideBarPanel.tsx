import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import { Drawer, Hidden } from '@material-ui/core'

import { ScrollableTabs, TabPanel, NavigationTabs } from '@ui/index'
import TreeViewScene from '../Layers/TreeViewScene'
import TreeViewUvw from '../Layers/TreeViewUvw'
import Renderer from '../Renderer'
import Canvas from '../Canvas'
import Share from '../Share'
import { useLayoutStore } from '@store/editor/layout'

import { rightSidebarTabsData } from '@utils/editor/rightSidebarTabsData'
import { objectTabsData } from '@utils/editor/objectTabsData'

import { useStyles } from './RightSideBarPanel.styles'

const RightSideBarPanel: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { openRightPanel } = useLayoutStore<any>((state: any) => state.data)
  const { toggleOpenRightPanel } = useLayoutStore<any>(
    (state: any) => state.api
  )
  const [value, setValue] = useState<string>('Layers')
  const [layersValue, setLayersValue] = useState<number>(1)

  const handleClose = () => toggleOpenRightPanel(false)

  const handleNavTabsChange = (event: ChangeEvent<any>, value: string) =>
    setValue(value)

  const handleScrollableTabsChange = (event: ChangeEvent<any>, value: number) =>
    setLayersValue(value)

  return (
    <Hidden mdDown>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.paper,
          paperAnchorDockedRight: classes.paperAnchorDockedRight,
        }}
        open={openRightPanel}
        onClose={handleClose}
        anchor="right"
      >
        <NavigationTabs
          tabsData={rightSidebarTabsData}
          value={value}
          onChange={handleNavTabsChange}
        />
        <TabPanel value={value} index={'Layers'}>
          <ScrollableTabs
            tabsData={objectTabsData}
            value={layersValue}
            onChange={handleScrollableTabsChange}
          />
          <TabPanel value={layersValue} className={classes.tabPanel} index={0}>
            <TreeViewScene />
          </TabPanel>
          <TabPanel value={layersValue} className={classes.tabPanel} index={1}>
            <TreeViewUvw />
          </TabPanel>
        </TabPanel>
        <TabPanel value={value} index={'Renderer'}>
          <Renderer />
        </TabPanel>
        <TabPanel value={value} index={'Canvas'}>
          <Canvas />
        </TabPanel>
        <TabPanel value={value} index={'Share'}>
          <Share />
        </TabPanel>
      </Drawer>
    </Hidden>
  )
}

export default RightSideBarPanel
