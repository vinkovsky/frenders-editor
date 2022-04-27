import React, {
  FunctionComponent,
  ChangeEvent,
} from 'react'
import { Paper } from '@material-ui/core'
import { WidthProvider, Responsive } from 'react-grid-layout'
import dynamic from 'next/dynamic'

import DragHandler from '../DragHandler'
import ToolbarScene from '../../Scene/ToolbarScene'

const LoaderAssets = dynamic(() => import('../../Scene/LoaderAssets'), {
  ssr: false,
})

import ToolbarUvw from '../../Uvw/ToolbarUvw'
import UvwTabs from '../../Uvw/UvwTabs'
import PresetTextures from '../../Uvw/PresetTextures'
import Uvw from '../../Uvw/Uvw'

import { saveToLS } from '@helpers/viewport/saveToLS'
import { useUvwStore } from '@store/editor/uvw'
import { uvwTabsData } from '@utils/editor/uvwTabsData'
import { layoutConfig } from '@utils/editor/layoutConfig'

import 'react-grid-layout/css/styles.css'
import { useStyles } from './Viewport.styles'
import { FullScreen, useFullScreenHandle } from 'react-full-screen/dist'
import { useLayoutStore } from '@store/editor/layout'

const ReactGridLayout = WidthProvider(Responsive)

const Viewport: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { activeCanvas } = useUvwStore<any>((state: any) => state.data)
  const { setActiveCanvas } = useUvwStore<any>((state: any) => state.api)

  const { changeSavedLayout } = useLayoutStore<any>((state: any) => state.api)
  const { savedLayout } = useLayoutStore<any>((state: any) => state.data)

  const screenUvw = useFullScreenHandle()
  const screenScene = useFullScreenHandle()

  const onLayoutChange = (layout: any, layouts: any) => {
    saveToLS('layouts', layouts)
    changeSavedLayout({ layouts })
  }

  const handleUvwTabsChange = (event: ChangeEvent<any>, value: number) =>
    setActiveCanvas(value)

  return (
    <div className={classes.scrollbar}>
      <ReactGridLayout
        cols={{
          lg: 12,
          md: 12,
          sm: 6,
          xs: 6,
          xxs: 6,
        }}
        rowHeight={27}
        draggableHandle=".dragHandler"
        isBounded
        compactType="horizontal"
        layouts={savedLayout.layouts}
        onLayoutChange={(layout: any, layouts: any) =>
          onLayoutChange(layout, layouts)
        }
      >
        <Paper
          variant="outlined"
          className={classes.container}
          square
          key="scene"
          data-grid={layoutConfig.scene}
        >
          <FullScreen handle={screenScene} className={classes.fullscreen}>
            <DragHandler title={'Scene'} />
            <ToolbarScene screenScene={screenScene} />
            <LoaderAssets />
          </FullScreen>
        </Paper>
        <Paper
          variant="outlined"
          className={classes.container}
          square
          key="uvw"
          data-grid={layoutConfig.uvw}
        >
          <FullScreen handle={screenUvw} className={classes.fullscreen}>
            <DragHandler title={'Uvw'} />
            <ToolbarUvw screenUvw={screenUvw} />
            <UvwTabs
              scrollable
              tabsData={uvwTabsData}
              value={activeCanvas}
              onChange={handleUvwTabsChange}
            />
            <PresetTextures />
            <Uvw />
          </FullScreen>
        </Paper>
      </ReactGridLayout>
    </div>
  )
}

export default Viewport
