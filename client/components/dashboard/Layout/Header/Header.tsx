import React, { useContext, useRef } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import { Avatar, IconButton, Link } from '@ui/index'
import { AppContext } from '@providers/AppProvider'
import { DashboardContext } from '@providers/DashboardProvider'
import DashboardMenu from '../DashboardMenu'
import * as ACTIONS from '@actions/dashboard/dashboardSettings'

import { useStyles } from './Header.styles'

const Header = () => {
  const classes = useStyles()
  const anchorRef = useRef<HTMLButtonElement>(null)
  const { state: stateApp } = useContext(AppContext)
  const { state: stateDashboard, dispatch: dispatchDashboard } = useContext(
    DashboardContext
  )

  const handleDrawerOpen = () => {
    dispatchDashboard(
      ACTIONS.setOpenSidebar(stateDashboard.settings.openSidebar)
    )
  }

  const handleOpenMenuClick = () => {
    dispatchDashboard(
      ACTIONS.setOpenMenu({
        anchor: anchorRef.current,
        openMenu: stateDashboard.settings.settingsMenu.openMenu,
      })
    )
  }

  const getNameProfileSection = () => {
    switch (stateDashboard.settings.selectedIndex) {
      case 0:
        return 'Library'
      case 1:
        return 'Saved'
      case 2:
        return 'Favorites'
      case 3:
        return 'Settings'
    }
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <IconButton
          icon="menu"
          className={classes.icon}
          onClick={handleDrawerOpen}
        />
        <Link href={'/'} className={classes.link}>
          <Typography variant="h1" className={classes.logo} noWrap>
            Frenders
          </Typography>
        </Link>
        <Typography variant="h6" className={classes.sectionName} noWrap>
          {getNameProfileSection()}
        </Typography>
        <IconButton ref={anchorRef} onClick={handleOpenMenuClick}>
          <Avatar src={stateApp.avatar.url}>
            {(stateApp.user?.username as string)[0].toUpperCase()}
          </Avatar>
        </IconButton>
        <DashboardMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Header
