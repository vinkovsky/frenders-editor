// Копирование данных канваса
export const drawCopy = (fabricCanvas, cacheCanvas) => {
  // Сохранение значений
  const vp = fabricCanvas.viewportTransform,
    originalInteractive = fabricCanvas.interactive,
    newVp = [1, 0, 0, 1, 0, 0],
    originalRetina = fabricCanvas.enableRetinaScaling,
    originalContextTop = fabricCanvas.contextTop
  // Сброс
  fabricCanvas.contextTop = null
  fabricCanvas.enableRetinaScaling = false
  fabricCanvas.interactive = false
  fabricCanvas.viewportTransform = newVp
  fabricCanvas.calcViewportBoundaries()
  // Копирование нарисованного
  fabricCanvas.renderCanvas(cacheCanvas.getContext('2d'), fabricCanvas._objects)
  // Восстановление значений
  fabricCanvas.viewportTransform = vp
  fabricCanvas.calcViewportBoundaries()
  fabricCanvas.interactive = originalInteractive
  fabricCanvas.enableRetinaScaling = originalRetina
  fabricCanvas.contextTop = originalContextTop
}
