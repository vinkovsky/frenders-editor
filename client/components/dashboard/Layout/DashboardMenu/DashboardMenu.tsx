import React, { FunctionComponent, MouseEvent, useContext } from 'react'
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { Avatar, MenuItem } from '@ui/index'
import { DashboardContext } from '@providers/DashboardProvider'
import { AppContext } from '@providers/AppProvider'
import { logoutUser } from '@utils/auth/auth'
import { errorMessage } from '@helpers/errorMessage'
import * as ACTIONS from '@actions/dashboard/dashboardSettings'

import { useStyles } from './DashboardMenu.styles'

const DashboardMenu: FunctionComponent = () => {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { state: stateApp, dispatch: dispatchApp } = useContext(AppContext)
  const { state: stateDashboard, dispatch: dispatchDashboard } = useContext(
    DashboardContext
  )

  const handleClose = (event: MouseEvent<EventTarget>) => {
    if (
      stateDashboard.settings.settingsMenu.anchor &&
      stateDashboard.settings.settingsMenu.anchor.contains(
        event.target as HTMLElement
      )
    ) {
      return
    }

    dispatchDashboard(
      ACTIONS.setOpenMenu({
        anchor: null,
        openMenu: stateDashboard.settings.settingsMenu.openMenu,
      })
    )
  }

  const handleSettingsClick = (
    event: MouseEvent<EventTarget>,
    index: number
  ) => {
    dispatchDashboard(ACTIONS.setChangeProfileMenu(index))
    handleClose(event)
  }

  const logout = async () => {
    try {
      await logoutUser(dispatchApp)
      enqueueSnackbar('You have successfully logged out', {
        variant: 'success',
      })
      await router.push('/')
    } catch (error) {
      enqueueSnackbar(errorMessage(error), {
        variant: 'error',
      })
    }
  }

  return (
    <Popper
      open={stateDashboard.settings.settingsMenu.openMenu}
      anchorEl={stateDashboard.settings.settingsMenu.anchor}
      role={undefined}
      transition
      disablePortal
      className={classes.menu}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={stateDashboard.settings.settingsMenu.openMenu}
                id="menu-list-grow"
              >
                <MenuItem>
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <Avatar
                        className={classes.avatar}
                        src={stateApp.avatar.url}
                      >
                        {(stateApp.user?.username as string)[0].toUpperCase()}
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Typography variant="h1" noWrap>
                        {stateApp.user?.username}
                      </Typography>
                      <Typography variant="subtitle1" noWrap>
                        {stateApp.user?.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </MenuItem>
                <Divider />
                <MenuItem
                  icon="settings"
                  text="Settings"
                  onClick={(event: MouseEvent<HTMLLIElement>) =>
                    handleSettingsClick(event, 3)
                  }
                />
                <Divider />
                <MenuItem icon="logout" text="Logout" onClick={logout} />
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}

export default DashboardMenu
