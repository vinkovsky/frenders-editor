import React, { FunctionComponent, MouseEvent, useEffect } from 'react'
import { Divider } from '@material-ui/core'

import { ToggleButton, ToggleButtonGroup } from '@ui/index'
import { toolsData } from '@utils/editor/toolsData'
import { useTransformSceneStore } from '@store/editor/transformScene'

import { useStyles } from './ToolsScene.styles'

const ToolsScene: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { gridVisible, transformTool } = useTransformSceneStore<any>(
    (state: any) => state.data
  )
  const {
    changeTransformTool,
    toggleGridVisible,
  } = useTransformSceneStore<any>((state: any) => state.api)

  const handleTransformTools = (
    event: MouseEvent<HTMLElement>,
    newTransformTool: string | null
  ) => {
    if (newTransformTool !== null) {
      changeTransformTool(newTransformTool)
    }
  }

  const handleGridVisibleChange = () => toggleGridVisible(!gridVisible)

  useEffect(() => {
    const onKeyDown = (e) => {
      e.stopPropagation()
      if (e.code === 'KeyW') handleTransformTools(e, 'translate')
      else if (e.code === 'KeyE') handleTransformTools(e, 'rotate')
      else if (e.code === 'KeyR') handleTransformTools(e, 'scale')
      else if (e.code === 'KeyQ') handleTransformTools(e, 'select')
      else if (e.code === 'KeyG') handleGridVisibleChange()
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handleTransformTools, handleGridVisibleChange])

  return (
    <div className={classes.paper}>
      <ToggleButton
        value="visibleGrid"
        icon={gridVisible ? 'gridOn' : 'gridOff'}
        selected={gridVisible}
        title={'Visible grid scene (G)'}
        onChange={handleGridVisibleChange}
      />
      <Divider className={classes.divider} />
      <ToggleButtonGroup
        value={transformTool}
        exclusive
        onChange={handleTransformTools}
        className={classes.grouped}
      >
        {toolsData.map(({ icon, value, toolTipText }) => {
          return (
            <ToggleButton
              key={value}
              icon={icon}
              value={value}
              title={toolTipText}
            />
          )
        })}
      </ToggleButtonGroup>
    </div>
  )
}

export default ToolsScene
