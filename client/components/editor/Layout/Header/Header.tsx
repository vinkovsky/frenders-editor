import React, { FunctionComponent, useContext } from 'react'
import {
  Grid,
  AppBar as MuiAppBar,
  Toolbar,
  Hidden,
  Typography,
} from '@material-ui/core'

import { Avatar, IconButton, Tooltip } from '@ui/index'
import { useLayoutStore } from '@store/editor/layout'
import { useInitDataStore } from '@store/editor/initData'
import { AppContext } from '@providers/AppProvider'

import { useStyles } from './Header.styles'
import { useRouter } from 'next/router'

const Header: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { state } = useContext(AppContext)

  const { openLeftPanel, openRightPanel } = useLayoutStore<any>(
    (state: any) => state.data
  )
  const { toggleOpenLeftPanel, toggleOpenRightPanel } = useLayoutStore<any>(
    (state: any) => state.api
  )
  const { initDataCard } = useInitDataStore<any>((state: any) => state.data)

  const handleOpenLeftPanel = () => toggleOpenLeftPanel(!openLeftPanel)

  const handleOpenRightPanel = () => toggleOpenRightPanel(!openRightPanel)

  return (
    <MuiAppBar
      component="div"
      className={classes.appBar}
      color="inherit"
      position="relative"
    >
      <Toolbar variant="dense">
        <Grid container>
          <Hidden mdUp>
            <Grid container item xs justify="flex-start" alignItems="center">
              <IconButton
                icon="menu"
                className={classes.iconButton}
                onClick={handleOpenLeftPanel}
              />
            </Grid>
          </Hidden>
          <Grid container item xs justify="center" alignItems="center">
            <a href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}><strong>FRENDERS | {initDataCard?.nameProject} </strong></a>
          </Grid>
          <Hidden mdUp>
            <Grid container item xs justify="flex-end" alignItems="center">
              <IconButton
                icon="menu"
                className={classes.iconButton}
                onClick={handleOpenRightPanel}
              />
            </Grid>
          </Hidden>
          <Hidden mdDown>
            <Tooltip
              title={
                <>
                  <Typography component={'h4'} className={classes.username}>
                    {state.user?.username as string}
                  </Typography>
                  {state.user?.email}
                </>
              }
              arrow
            >
              <IconButton className={classes.iconButton}>
                <Avatar
                  src={state.user?.avatar ? state.user.avatar.url : undefined}
                  className={classes.avatar}
                >
                  {(state.user?.username as string)[0].toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Hidden>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  )
}

export default Header
