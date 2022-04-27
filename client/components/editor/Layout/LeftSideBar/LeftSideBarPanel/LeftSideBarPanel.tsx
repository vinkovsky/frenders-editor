import React, { FunctionComponent, useState } from 'react'
import { Drawer, Hidden } from '@material-ui/core'

import { NavigationTabs, ScrollableTabs, TabPanel } from '@ui/index'

import Project from '../Assets/Project'
import Camera from '../Camera'
import Environment from '../Environment'
import Scene from '../Object/Scene'
import Uvw from '../Object/Uvw'
import Library from '../Assets/Library'

import { leftSidebarTabsData } from '@utils/editor/leftSidebarTabsData'
import { objectTabsData } from '@utils/editor/objectTabsData'
import { useLayoutStore } from '@store/editor/layout'

import { useStyles } from './LeftSideBarPanel.styles'

const LeftSideBarPanel: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { openLeftPanel } = useLayoutStore<any>((state: any) => state.data)
  const { toggleOpenLeftPanel } = useLayoutStore<any>((state: any) => state.api)
  const [value, setValue] = useState<string>('Assets')
  const [objectValue, setObjectValue] = useState<number>(0)

  const handleClose = () => toggleOpenLeftPanel(false)

  return (
    <aside className={classes.root}>
      <Hidden mdDown implementation="css">
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.paper,
            paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
          }}
          open={openLeftPanel}
          onClose={handleClose}
          anchor="left"
          ModalProps={{
            keepMounted: true,
          }}
        >
          <NavigationTabs
            tabsData={leftSidebarTabsData}
            value={value}
            onChange={(event, value) => setValue(value)}
          />
          <TabPanel value={value} index={'Assets'}>
            <Library />
            <Project />
          </TabPanel>
          <TabPanel value={value} index={'Camera'}>
            <Camera />
          </TabPanel>
          <TabPanel value={value} index={'Object'}>
            <ScrollableTabs
              tabsData={objectTabsData}
              value={objectValue}
              onChange={(event, value) => setObjectValue(value)}
            />
            <TabPanel
              value={objectValue}
              className={classes.tabPanel}
              index={0}
            >
              <Scene />
            </TabPanel>
            <TabPanel
              value={objectValue}
              className={classes.tabPanel}
              index={1}
            >
              <Uvw />
            </TabPanel>
          </TabPanel>
          <TabPanel value={value} index={'Lights'}>
            <Environment />
          </TabPanel>
        </Drawer>
      </Hidden>
    </aside>
  )
}

export default LeftSideBarPanel
