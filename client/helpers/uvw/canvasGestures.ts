// Масштабирование содержимого канваса
export const canvasGestures = (canvas: any) => {
  let zoom = 1
  let lastPosX, lastPosY

  canvas.on('mouse:wheel', (opt) => {
    const delta: number = opt.e.deltaY
    zoom = canvas.getZoom()
    zoom += delta / 200
    if (zoom > 20) zoom = 20
    if (zoom < 1) zoom = 1
    const ratio: number = canvas.width / canvas.wrapperEl.offsetWidth
    canvas.zoomToPoint(
      { x: opt.e.offsetX * ratio, y: opt.e.offsetY * ratio },
      zoom
    )
    if (zoom < 0.1) {
      canvas.viewportTransform[4] = canvas.getWidth() * zoom
      canvas.viewportTransform[5] = canvas.getWidth() * zoom
    } else {
      if (canvas.viewportTransform[4] >= 0) {
        canvas.viewportTransform[4] = 0
      } else if (
        canvas.viewportTransform[4] <
        canvas.getHeight() - canvas.getHeight() * zoom
      ) {
        canvas.viewportTransform[4] =
          canvas.getHeight() - canvas.getHeight() * zoom
      }
      if (canvas.viewportTransform[5] >= 0) {
        canvas.viewportTransform[5] = 0
      } else if (
        canvas.viewportTransform[5] <
        canvas.getHeight() - canvas.getHeight() * zoom
      ) {
        canvas.viewportTransform[5] =
          canvas.getHeight() - canvas.getHeight() * zoom
      }
    }
    canvas.requestRenderAll()
    opt.e.preventDefault()
    opt.e.stopPropagation()
  })

  canvas.on('mouse:down', (opt) => {
    const evt = opt.e
    if (evt.altKey === true) {
      canvas.isDragging = true
      canvas.selection = false
      canvas.forEachObject((o) => {
        o.selectable = false
        o.evented = false
        o.setCoords()
      })
      canvas._currentTransform = null
      lastPosX = evt.clientX
      lastPosY = evt.clientY
      canvas.discardActiveObject()
    }
  })

  canvas.on('mouse:move', (opt) => {
    if (canvas.isDragging) {
      const e = opt.e
      if (zoom < 0.1) {
        canvas.viewportTransform[4] = canvas.getWidth() * zoom
        canvas.viewportTransform[5] = canvas.getWidth() * zoom
      } else {
        canvas.viewportTransform[4] += e.clientX - lastPosX
        canvas.viewportTransform[5] += e.clientY - lastPosY
        if (canvas.viewportTransform[4] >= 0) {
          canvas.viewportTransform[4] = 0
        } else if (
          canvas.viewportTransform[4] <
          canvas.getWidth() - canvas.getHeight() * zoom
        ) {
          canvas.viewportTransform[4] =
            canvas.getWidth() - canvas.getHeight() * zoom
        }
        if (canvas.viewportTransform[5] >= 0) {
          canvas.viewportTransform[5] = 0
        } else if (
          canvas.viewportTransform[5] <
          canvas.getHeight() - canvas.getHeight() * zoom
        ) {
          canvas.viewportTransform[5] =
            canvas.getHeight() - canvas.getHeight() * zoom
        }
      }
      canvas.requestRenderAll()
      lastPosX = e.clientX
      lastPosY = e.clientY
    }
  })

  canvas.on('mouse:up', () => {
    canvas.requestRenderAll()
    canvas.isDragging = false
    canvas.selection = true
    canvas.forEachObject((o) => {
      o.selectable = true
      o.evented = true
      o.setCoords()
    })
  })
}
