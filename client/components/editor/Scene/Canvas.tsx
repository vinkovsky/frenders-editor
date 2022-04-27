import React, { FunctionComponent, memo, MutableRefObject, useRef } from 'react'
import { ResizeContainer } from 'react-three-fiber'
import { WebGLRenderer } from 'three'
import { RayTracingRenderer } from 'ray-tracing-renderer'

import { ContainerProps } from '@interfaces/editor/three'
import { useRendererStore } from '@store/editor/renderer'
import { useObjectSceneStore } from '@store/editor/objectScene'

const Canvas: FunctionComponent<any> = memo(
  ({ children, ...props }: ContainerProps) => {
    const canvasRef = useRef<HTMLCanvasElement>()
    const { isRayTracing } = useRendererStore<any>((state: any) => state.data)
    const { general } = useObjectSceneStore<any>((state: any) => state.api)

    const { ...rest } = props

    const renderer = isRayTracing ? RayTracingRenderer : WebGLRenderer

    const renderStateChange = () => {
      if (canvasRef.current) {
        const render = new renderer({
          canvas: canvasRef.current,
          antialias: true,
          preserveDrawingBuffer: true,
        })
        if (isRayTracing) {
          render.compile = () => ({})
        } else {
          general.setCanvas(canvasRef.current)
        }
        return render
      }
    }

    return (
      <>
        <ResizeContainer
          {...rest}
          key={renderer}
          renderer={renderStateChange}
          preRender={
            <canvas
              ref={canvasRef as MutableRefObject<HTMLCanvasElement>}
              style={{ display: 'block' }}
            />
          }
        >
          {children}
        </ResizeContainer>
      </>
    )
  }
)

export default memo(Canvas)
