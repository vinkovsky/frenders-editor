import React, { useContext } from 'react'
import { Drawer, Hidden } from '@material-ui/core'

import { DashboardContext } from '@providers/DashboardProvider'
import * as ACTIONS from '@actions/dashboard/dashboardSettings'
import SidebarMenuList from '../SidebarMenuList'

import { useStyles } from './Sidebar.styles'

const Sidebar = (props) => {
  const classes = useStyles()
  const { window } = props
  const { state, dispatch } = useContext(DashboardContext)

  const container =
    window !== undefined ? () => window().document.body : undefined

  const handleDrawerClose = () =>
    dispatch(ACTIONS.setOpenMenu(state.settings.openSidebar))

  return (
    <aside className={classes.root}>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor="left"
          open={state.settings.openSidebar}
          onClose={handleDrawerClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <SidebarMenuList />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <SidebarMenuList />
        </Drawer>
      </Hidden>
    </aside>
  )
}

export default Sidebar
