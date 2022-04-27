import React, { FunctionComponent, useCallback, ChangeEvent } from 'react'
import { TreeView as MuiTreeView } from '@material-ui/lab'
import { ChevronRight, ExpandMore, Visibility } from '@material-ui/icons'
import { fabric } from 'fabric'
import { TreeItem } from '@ui/index'
import { RenderTree } from '@interfaces/editor/layers'
import { useUvwStore } from '@store/editor/uvw'
import { useObjectUvwStore } from '@store/editor/objectUvw'
import { useLayersUvwStore } from '@store/editor/layers'
import { useStyles } from './TreeViewUvw.styles'
const TreeViewUvw: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { activeObjects } = useObjectUvwStore<any>((state: any) => state.data)
  const { obj } = useObjectUvwStore<any>((state: any) => state.api)
  const { fabricCanvas, activeCanvas, canvasTextures } = useUvwStore<any>(
    (state: any) => state.data
  )
  const { layersUvwData } = useLayersUvwStore<any>((state: any) => state.data)
  const { setLayersUvwData } = useLayersUvwStore<any>((state: any) => state.api)
  const handleLocked = useCallback(
    (locked: boolean, nodes) => {
      if (activeObjects.length === 1) {
        fabricCanvas.getObjects().forEach((obj) => {
          if (obj.id === nodes.id) {
            obj.set({
              ...obj,
              lockMovementX: locked,
              lockMovementY: locked,
              lockRotation: locked,
              lockScalingX: locked,
              lockScalingY: locked,
              lockScalingFlip: locked,
              hasControls: !locked,
              hasBorders: !locked,
            })
          }
        })
      } else {
        obj.toggleLockedObjectUvw(locked)
      }
      setLayersUvwData({
        mapName: canvasTextures[activeCanvas].name,
        fabricObjects: fabricCanvas.getObjects(),
      })
      fabricCanvas.renderAll()
    },
    [canvasTextures, activeCanvas, activeObjects]
  )
  const handleVisible = useCallback(
    (visible: boolean, nodes) => {
      fabricCanvas.discardActiveObject().renderAll()
      if (
        nodes.name == layersUvwData[canvasTextures[activeCanvas].name][0].name
      ) {
        setLayersUvwData({
          visible,
          mapName: canvasTextures[activeCanvas].name,
          fabricObjects: fabricCanvas.getObjects(),
        })
      } else {
        if (activeObjects.length === 1) {
          fabricCanvas.getObjects().forEach((obj) => {
            if (obj.id === nodes.id) {
              obj.set({
                ...obj,
                visible,
              })
            }
          })
        } else {
          obj.toggleVisibleObjectUvw(visible)
        }
        setLayersUvwData({
          visible: true,
          mapName: canvasTextures[activeCanvas].name,
          fabricObjects: fabricCanvas.getObjects(),
        })
      }
    },
    [canvasTextures, activeCanvas, activeObjects]
  )
  const handleSelect = (event: ChangeEvent<any>, nodeIds: string[]) => {
    let activeNodes = []
    if (
      nodeIds[0] === layersUvwData[canvasTextures[activeCanvas].name][0].name
    ) {
      fabricCanvas.discardActiveObject()
      const objects = fabricCanvas.getObjects()
      const sel = new fabric.ActiveSelection(objects, {
        canvas: fabricCanvas,
      })
      obj.setActiveObjects(objects)
      fabricCanvas.setActiveObject(sel)
      fabricCanvas.renderAll()
    } else {
      fabricCanvas.getObjects().forEach((item) => {
        nodeIds.map((nodeId: string) => {
          if (item.id === nodeId) {
            activeNodes = activeNodes.concat(item)
            fabricCanvas.discardActiveObject()
            if (activeNodes.length > 1) {
              const sel = new fabric.ActiveSelection(activeNodes, {
                canvas: fabricCanvas,
              })
              fabricCanvas.setActiveObject(sel)
            } else {
              fabricCanvas.setActiveObject(item)
            }
            obj.setActiveObjects(activeNodes)
          }
        })
      })
    }
    fabricCanvas.renderAll()
  }
  const renderTree = (nodes: RenderTree, index: number) => {
    return (
      <TreeItem
        key={nodes.name + nodes.id}
        nodeId={nodes.id}
        label={nodes.name}
        visible={nodes?.visible}
        locked={nodes?.locked}
        handleVisible={() => handleVisible(!nodes?.visible, nodes)}
        handleLocked={() => handleLocked(!nodes?.locked, nodes)}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node, index))
          : null}
      </TreeItem>
    )
  }
  return canvasTextures.length > 0 ? (
    <MuiTreeView
      className={classes.root}
      defaultCollapseIcon={<ChevronRight />}
      defaultExpandIcon={<ExpandMore />}
      defaultEndIcon={<Visibility />}
      defaultExpanded={['map', 'roughnessMap', 'metalnessMap', 'normalMap']}
      multiSelect
      selected={activeObjects.map((activeObject) => activeObject.id)}
      onNodeSelect={handleSelect}
    >
      {layersUvwData[canvasTextures[activeCanvas].name].map((dataItem, index) =>
        renderTree(dataItem, index)
      )}
    </MuiTreeView>
  ) : null
}
export default TreeViewUvw