import { fabric } from 'fabric'

type AligningGuidelinesType = {
  x?: number
  y?: number
  x1?: number
  y1?: number
  x2?: number
  y2?: number
}

// Линии для выравнивания объектов на канвасе
export class AligningGuidelines {
  canvas?: any
  verticalLines?: Array<any>
  horizontalLines?: Array<any>
  ctx?: any
  aligningLineOffset?: number
  aligningLineMargin?: number
  aligningLineWidth?: number
  aligningLineColor?: string
  viewportTransform?: any
  zoom?: number

  constructor(canvas) {
    this.canvas = canvas
    this.verticalLines = []
    this.horizontalLines = []
    this.ctx = this.canvas.getSelectionContext()
    this.aligningLineOffset = 5
    this.aligningLineMargin = 4
    this.aligningLineWidth = 1
    this.aligningLineColor = 'rgb(0,255,0)'
    this.viewportTransform = null
    this.zoom = 1
    this.init()
  }

  init = () => {
    this.canvas.on('mouse:down', this.mouseDown)

    this.canvas.on('object:moving', this.objectMoving)

    this.canvas.on('before:render', this.beforeRender)

    this.canvas.on('after:render', this.afterRender)

    this.canvas.on('mouse:up', this.mouseUp)
  }

  drawVerticalLine = (coords) => {
    this.drawLine({
      x1: coords.x + 0.5,
      y1: coords.y1 > coords.y2 ? coords.y2 : coords.y1,
      x2: coords.x + 0.5,
      y2: coords.y2 > coords.y1 ? coords.y2 : coords.y1,
    })
  }

  drawHorizontalLine = (coords) => {
    this.drawLine({
      x1: coords.x1 > coords.x2 ? coords.x2 : coords.x1,
      y1: coords.y + 0.5,
      x2: coords.x2 > coords.x1 ? coords.x2 : coords.x1,
      y2: coords.y + 0.5,
    })
  }

  isInRange = (value1: number, value2: number) => {
    value1 = Math.round(value1)
    value2 = Math.round(value2)
    for (
      let i = value1 - this.aligningLineMargin!, len = value1 + this.aligningLineMargin!;
      i <= len;
      i++
    ) {
      if (i === value2) {
        return true
      }
    }
    return false
  }

  drawLine = ({ x1, y1, x2, y2 }: Partial<AligningGuidelinesType>) => {
    this.ctx.save()
    this.ctx.lineWidth = this.aligningLineWidth
    this.ctx.strokeStyle = this.aligningLineColor
    this.ctx.beginPath()
    this.ctx.moveTo(
      (x1 + this.viewportTransform[4]) * this.zoom!,
      (y1 + this.viewportTransform[5]) * this.zoom!
    )
    this.ctx.lineTo(
      (x2 + this.viewportTransform[4]) * this.zoom!,
      (y2 + this.viewportTransform[5]) * this.zoom!
    )
    this.ctx.stroke()
    this.ctx.restore()
  }

  mouseUp = () => {
    this.verticalLines!.length = this.horizontalLines!.length = 0
    this.canvas.renderAll()
  }

  afterRender = () => {
    for (let i = this.verticalLines!.length; i--;) {
      this.drawVerticalLine(this.verticalLines![i])
    }
    for (let i = this.horizontalLines!.length; i--;) {
      this.drawHorizontalLine(this.horizontalLines![i])
    }

    this.verticalLines!.length = this.horizontalLines!.length = 0
  }

  beforeRender = () => {
    if (this.canvas.contextTop) {
      this.canvas.clearContext(this.canvas.contextTop)
    }
  }

  mouseDown = () => {
    this.viewportTransform = this.canvas.viewportTransform
    this.zoom = this.canvas.getZoom()
  }

  objectMoving = (e) => {
    const activeObject = e.target,
      canvasObjects = this.canvas.getObjects(),
      activeObjectCenter = activeObject.getCenterPoint(),
      activeObjectLeft = activeObjectCenter.x,
      activeObjectTop = activeObjectCenter.y,
      activeObjectBoundingRect = activeObject.getBoundingRect(),
      activeObjectHeight =
        activeObjectBoundingRect.height / this.viewportTransform[3],
      activeObjectWidth = activeObjectBoundingRect.width / this.viewportTransform[0],
      transform = this.canvas._currentTransform
    let verticalInTheRange = false,
      horizontalInTheRange = false
    if (!transform) return

    for (let i = canvasObjects.length; i--;) {
      if (canvasObjects[i] === activeObject) continue

      const objectCenter = canvasObjects[i].getCenterPoint(),
        objectLeft = objectCenter.x,
        objectTop = objectCenter.y,
        objectBoundingRect = canvasObjects[i].getBoundingRect(),
        objectHeight = objectBoundingRect.height / this.viewportTransform[3],
        objectWidth = objectBoundingRect.width / this.viewportTransform[0]

      // Привязка по центральной горизонтальной линии
      if (this.isInRange(objectLeft, activeObjectLeft)) {
        verticalInTheRange = true

        this.verticalLines!.push({
          x: objectLeft,
          y1:
            objectTop < activeObjectTop
              ? objectTop - objectHeight / 2 - this.aligningLineOffset!
              : objectTop + objectHeight / 2 + this.aligningLineOffset,
          y2:
            activeObjectTop > objectTop
              ? activeObjectTop + activeObjectHeight / 2 + this.aligningLineOffset
              : activeObjectTop - activeObjectHeight / 2 - this.aligningLineOffset!,
        })
        activeObject.setPositionByOrigin(
          new fabric.Point(objectLeft, activeObjectTop),
          'center',
          'center'
        )
      }

      // Привязка по левой части
      if (
        this.isInRange(
          objectLeft - objectWidth / 2,
          activeObjectLeft - activeObjectWidth / 2
        )
      ) {
        verticalInTheRange = true
        this.verticalLines!.push({
          x: objectLeft - objectWidth / 2,
          y1:
            objectTop < activeObjectTop
              ? objectTop - objectHeight / 2 - this.aligningLineOffset!
              : objectTop + objectHeight / 2 + this.aligningLineOffset,
          y2:
            activeObjectTop > objectTop
              ? activeObjectTop + activeObjectHeight / 2 + this.aligningLineOffset
              : activeObjectTop - activeObjectHeight / 2 - this.aligningLineOffset!,
        })
        activeObject.setPositionByOrigin(
          new fabric.Point(
            objectLeft - objectWidth / 2 + activeObjectWidth / 2,
            activeObjectTop
          ),
          'center',
          'center'
        )
      }

      // Привязка по правой части
      if (
        this.isInRange(
          objectLeft + objectWidth / 2,
          activeObjectLeft + activeObjectWidth / 2
        )
      ) {
        verticalInTheRange = true
        this.verticalLines!.push({
          x: objectLeft + objectWidth / 2,
          y1:
            objectTop < activeObjectTop
              ? objectTop - objectHeight / 2 - this.aligningLineOffset!
              : objectTop + objectHeight / 2 + this.aligningLineOffset,
          y2:
            activeObjectTop > objectTop
              ? activeObjectTop + activeObjectHeight / 2 + this.aligningLineOffset
              : activeObjectTop - activeObjectHeight / 2 - this.aligningLineOffset!,
        })
        activeObject.setPositionByOrigin(
          new fabric.Point(
            objectLeft + objectWidth / 2 - activeObjectWidth / 2,
            activeObjectTop
          ),
          'center',
          'center'
        )
      }

      // Привязка по центральной вертикальной части
      if (this.isInRange(objectTop, activeObjectTop)) {
        horizontalInTheRange = true
        this.horizontalLines!.push({
          y: objectTop,
          x1:
            objectLeft < activeObjectLeft
              ? objectLeft - objectWidth / 2 - this.aligningLineOffset!
              : objectLeft + objectWidth / 2 + this.aligningLineOffset,
          x2:
            activeObjectLeft > objectLeft
              ? activeObjectLeft + activeObjectWidth / 2 + this.aligningLineOffset
              : activeObjectLeft - activeObjectWidth / 2 - this.aligningLineOffset!,
        })
        activeObject.setPositionByOrigin(
          new fabric.Point(activeObjectLeft, objectTop),
          'center',
          'center'
        )
      }

      // Привязка по верхней части
      if (
        this.isInRange(
          objectTop - objectHeight / 2,
          activeObjectTop - activeObjectHeight / 2
        )
      ) {
        horizontalInTheRange = true
        this.horizontalLines!.push({
          y: objectTop - objectHeight / 2,
          x1:
            objectLeft < activeObjectLeft
              ? objectLeft - objectWidth / 2 - this.aligningLineOffset!
              : objectLeft + objectWidth / 2 + this.aligningLineOffset,
          x2:
            activeObjectLeft > objectLeft
              ? activeObjectLeft + activeObjectWidth / 2 + this.aligningLineOffset
              : activeObjectLeft - activeObjectWidth / 2 - this.aligningLineOffset!,
        })
        activeObject.setPositionByOrigin(
          new fabric.Point(
            activeObjectLeft,
            objectTop - objectHeight / 2 + activeObjectHeight / 2
          ),
          'center',
          'center'
        )
      }

      // Привязка по нижней части
      if (
        this.isInRange(
          objectTop + objectHeight / 2,
          activeObjectTop + activeObjectHeight / 2
        )
      ) {
        horizontalInTheRange = true
        this.horizontalLines!.push({
          y: objectTop + objectHeight / 2,
          x1:
            objectLeft < activeObjectLeft
              ? objectLeft - objectWidth / 2 - this.aligningLineOffset!
              : objectLeft + objectWidth / 2 + this.aligningLineOffset,
          x2:
            activeObjectLeft > objectLeft
              ? activeObjectLeft + activeObjectWidth / 2 + this.aligningLineOffset
              : activeObjectLeft - activeObjectWidth / 2 - this.aligningLineOffset!,
        })
        activeObject.setPositionByOrigin(
          new fabric.Point(
            activeObjectLeft,
            objectTop + objectHeight / 2 - activeObjectHeight / 2
          ),
          'center',
          'center'
        )
      }
    }

    if (!horizontalInTheRange) {
      this.horizontalLines!.length = 0
    }

    if (!verticalInTheRange) {
      this.verticalLines!.length = 0
    }
  }

  dispose = () => {
    this.canvas.off('mouse:down', this.mouseDown)

    this.canvas.off('object:moving', this.objectMoving)

    this.canvas.off('before:render', this.beforeRender)

    this.canvas.off('after:render', this.afterRender)

    this.canvas.off('mouse:up', this.mouseUp)
  }
}
