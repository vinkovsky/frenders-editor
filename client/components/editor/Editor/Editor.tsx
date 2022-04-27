import React, { FunctionComponent, useEffect } from 'react'
import { Grid } from '@material-ui/core'

import { useInitDataStore } from '@store/editor/initData'
import Header from '../Layout/Header'
import ToolbarViewport from '../Layout/ToolbarViewport'
import Viewport from '../Layout/Viewport'
import LeftSideBarPanel from '../Layout/LeftSideBar/LeftSideBarPanel'
import RightSideBarPanel from '../Layout/RightSideBar/RightSideBarPanel'

import { useStyles } from './Editor.styles'

const Editor: FunctionComponent<any> = ({ dataSavedCard }) => {
  const classes = useStyles()

  const { setInitDataCard } = useInitDataStore<any>((state: any) => state.api)

  useEffect(() => {
    setInitDataCard(dataSavedCard)
  }, [dataSavedCard])

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.gridItem}>
        <LeftSideBarPanel />
      </Grid>
      <Grid item className={classes.layout}>
        <Header />
        <ToolbarViewport />
        <Viewport />
      </Grid>
      <Grid item className={classes.gridItem}>
        <RightSideBarPanel />
      </Grid>
    </Grid>
  )
}

export default Editor
