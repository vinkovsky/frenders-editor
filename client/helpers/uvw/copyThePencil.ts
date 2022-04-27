import { fabric } from 'fabric'

// Рисование по модели
export const copyThePencil = (
  fabricCanvas: any,
  drawingCanvas: any,
  cacheCanvas: any
) => {
  const ctx: any = cacheCanvas.getContext('2d')
  if (fabricCanvas._isCurrentlyDrawing) {
    ctx.save()
    const m = fabric.util.invertTransform(drawingCanvas.viewportTransform)
    ctx.transform(...m)
    ctx.drawImage(
      drawingCanvas.upperCanvasEl,
      0,
      0,
      drawingCanvas.upperCanvasEl.width / drawingCanvas.getRetinaScaling(),
      drawingCanvas.upperCanvasEl.height / drawingCanvas.getRetinaScaling()
    )
    ctx.restore()
  }
}
