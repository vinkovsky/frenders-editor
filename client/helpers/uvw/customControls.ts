import { fabric } from 'fabric'

// Элементы управления для объектов канваса
export const customControls = (canvas) => {



  fabric.Object.prototype.originX = 'center'
  fabric.Object.prototype.originY = 'center'

  fabric.Object.prototype.noScaleCache = false
  fabric.Object.prototype.objectCaching = false

  fabric.Object.prototype.transparentCorners = false
  fabric.Object.prototype.borderScaleFactor = 2
  fabric.Object.prototype.borderColor = '#38ADFC'
  fabric.Object.prototype.cornerColor = '#ffffff'
  fabric.Object.prototype.cornerStrokeColor = '#38ADFC'
  fabric.Object.prototype.borderOpacityWhenMoving = 1

  fabric.textureSize = 65536

  fabric.Object.prototype.rotatingPointOffset = 70
  fabric.Object.prototype.cornerStyle = 'circle'
  fabric.Object.prototype.cornerSize = 20

  fabric.Object.prototype._drawControl = function (
    control,
    ctx,
    methodName,
    left,
    top,
    styleOverride
  ) {
    styleOverride = styleOverride || {}
    if (!this.isControlVisible(control)) {
      return
    }
    const size: number = this.cornerSize,
      stroke = !this.transparentCorners && this.cornerStrokeColor
    switch (styleOverride.cornerStyle || this.cornerStyle) {
      case 'circle':
        if (control == this.__corner) {
          ctx.save()
          ctx.strokeStyle = ctx.fillStyle = '#007bff'
        }
        ctx.beginPath()
        ctx.arc(
          left + size / 2,
          top + size / 2,
          size / 2,
          0,
          2 * Math.PI,
          false
        )
        ctx[methodName]()
        if (stroke) {
          ctx.stroke()
        }
        if (control == this.__corner) {
          ctx.restore()
        }
        break
      default:
        this.transparentCorners || ctx.clearRect(left, top, size, size)
        ctx[methodName + 'Rect'](left, top, size, size)
        if (stroke) {
          ctx.strokeRect(left, top, size, size)
        }
    }
  }


  fabric.Canvas.prototype.loadFromJSON = function (json, callback, reviver) {
    if (!json) {
      return
    }
    // serialize if it wasn't already
    const serialized =
      typeof json === 'string' ? JSON.parse(json) : fabric.util.object.clone(json)
    const _this = this,
      clipPath = serialized.clipPath,
      renderOnAddRemove = this.renderOnAddRemove
    this.renderOnAddRemove = false
    delete serialized.clipPath
    this._enlivenObjects(
      serialized.objects,
      function (enlivenedObjects) {
        // _this.clear();
        _this.remove(..._this.getObjects().concat())
        _this._setBgOverlay(serialized, function () {
          if (clipPath) {
            _this._enlivenObjects([clipPath], function (enlivenedCanvasClip) {
              _this.clipPath = enlivenedCanvasClip[0]
              _this.__setupCanvas.call(
                _this,
                serialized,
                enlivenedObjects,
                renderOnAddRemove,
                callback
              )
            })
          } else {
            _this.__setupCanvas.call(
              _this,
              serialized,
              enlivenedObjects,
              renderOnAddRemove,
              callback
            )
          }
        })
      },
      reviver
    )
    return this
  }


}
