import React, { FunctionComponent, useCallback, ChangeEvent } from 'react'
import { TreeView as MuiTreeView, TreeViewProps } from '@material-ui/lab'
import { ChevronRight, ExpandMore, Visibility } from '@material-ui/icons'

import { TreeItem } from '@ui/index'
import { IObjectSettingsProps } from '@interfaces/editor/objectScene'
import { useObjectSceneStore } from '@store/editor/objectScene'
import { useTransformSceneStore } from '@store/editor/transformScene'

import { useStyles } from './TreeViewScene.styles'

const TreeViewScene: FunctionComponent<TreeViewProps> = () => {
  const classes = useStyles()
  const {
    objectSettings,
    scene,
    currentObjectScene,
  } = useObjectSceneStore<any>((state: any) => state.data)
  const { obj } = useObjectSceneStore<any>((state: any) => state.api)
  const { changeTransformTool } = useTransformSceneStore<any>(
    (state: any) => state.api
  )

  const handleLocked = useCallback((id, locked, index) => {
    // dispatch(ACTIONS.setLockedSceneTree({ id, locked, rootId: data[index].id }))
    obj.toggleLockedObjectScene(locked)
  }, [])

  const handleVisible = useCallback((id, visible, index) => {
    // dispatch(
    //   ACTIONS.setVisibleSceneTree({ id, visible, rootId: data[index].id })
    // )
    obj.toggleVisibleObjectScene(visible)
  }, [])

  const handleSelect = (event: ChangeEvent<any>) => {
    const sceneObject = scene.getObjectByName(event.target.textContent)
    if (sceneObject.type !== 'Group') {
      changeTransformTool('select')
    }
    const index = objectSettings.modelItems.findIndex(
      (item) => item.name === sceneObject.name
    )
    obj.setToCurrentObject(sceneObject, index)
  }

  const renderTree = (nodes: IObjectSettingsProps, index: number) => (
    <TreeItem
      key={nodes.name + nodes.id}
      nodeId={nodes.name}
      label={nodes.name}
      visible={nodes?.visible !== undefined ? nodes.visible : undefined}
      locked={nodes?.locked !== undefined ? nodes.locked : undefined}
      handleVisible={() => handleVisible(nodes.name, !nodes?.visible, index)}
      handleLocked={() => handleLocked(nodes.name, !nodes?.locked, index)}
    >
      {Array.isArray(nodes.modelItems)
        ? nodes.modelItems.map((node) => renderTree(node, index))
        : null}
    </TreeItem>
  )

  return (
    <MuiTreeView
      className={classes.root}
      defaultCollapseIcon={<ChevronRight />}
      defaultExpandIcon={<ExpandMore />}
      defaultEndIcon={<Visibility />}
      defaultExpanded={[objectSettings.name]}
      multiSelect
      selected={
        currentObjectScene && objectSettings
          ? currentObjectScene.type === 'Group'
            ? [objectSettings.name]
            : [currentObjectScene.name]
          : []
      }
      onNodeSelect={handleSelect}
    >
      {renderTree(objectSettings, 0)}
      {/*{data.map((dataItem, index) => {*/}
      {/*  return renderTree(dataItem, index)*/}
      {/*})}*/}
    </MuiTreeView>
  )
}
export default TreeViewScene
