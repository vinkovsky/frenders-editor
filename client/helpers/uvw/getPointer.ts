import { fabric } from 'fabric'

// Получение позиции курсора на канвасе для модели
export const getPointer = (uv) => {
  fabric.Canvas.prototype.getPointer = function (e, ignoreZoom) {
    if (this._absolutePointer && !ignoreZoom) {
      return this._absolutePointer
    }
    if (this._pointer && ignoreZoom) {
      return this._pointer
    }
    const upperCanvasEl = this.upperCanvasEl
    const bounds = upperCanvasEl.getBoundingClientRect()
    let pointer = fabric.util.getPointer(e, ignoreZoom),
      boundsWidth = bounds.width || 0,
      boundsHeight = bounds.height || 0,
      cssScale
    if (!boundsWidth || !boundsHeight) {
      if ('top' in bounds && 'bottom' in bounds) {
        boundsHeight = Math.abs(bounds.top - bounds.bottom)
      }
      if ('right' in bounds && 'left' in bounds) {
        boundsWidth = Math.abs(bounds.right - bounds.left)
      }
    }
    this.calcOffset()
    pointer.x = pointer.x - this._offset.left
    pointer.y = pointer.y - this._offset.top

    /* BEGIN PATCH CODE */

    if (e.target !== this.upperCanvasEl) {
      if (uv) {
        pointer.x = uv.x * this.width
        pointer.y = uv.y * this.height
      }
    }

    const retinaScaling = this.getRetinaScaling()
    if (retinaScaling !== 1) {
      pointer.x /= retinaScaling
      pointer.y /= retinaScaling
    }

    /* END PATCH CODE */

    if (!ignoreZoom) {
      pointer = this.restorePointerVpt(pointer)
    }
    if (boundsWidth === 0 || boundsHeight === 0) {
      cssScale = {
        width: 1,
        height: 1,
      }
    } else {
      cssScale = {
        width: upperCanvasEl.width / boundsWidth,
        height: upperCanvasEl.height / boundsHeight,
      }
    }
    return {
      x: pointer.x * cssScale.width,
      y: pointer.y * cssScale.height,
    }
  }
}
