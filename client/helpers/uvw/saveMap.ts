const userSettings = [
  'id',
  'angle',
  'lockMovementX',
  'lockMovementY',
  'lockRotation',
  'lockScalingX',
  'lockScalingY',
  'lockScalingFlip',
  'hasControls',
  'hasBorders',
]

// Сохранение данных карт uvw
export const saveMap = (
  maps,
  fabricCanvas,
  canvasTextures,
  activeCanvas,
  setHistoryUvwDataMap
) => {
  const dataMap = JSON.stringify(fabricCanvas.toJSON(userSettings))
  const mapName = canvasTextures[activeCanvas].name
  maps.setDataMap({
    mapName,
    dataMap,
  })
  setHistoryUvwDataMap({ area: 'uvw', attr: mapName, value: dataMap })
}
