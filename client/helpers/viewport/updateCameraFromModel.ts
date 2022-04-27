import { Box3, Vector3 } from "three";

export const updateCameraFromModel = (camera, model, setTransformCamera) => {
    const bounds = new Box3()
    bounds.setFromObject(model)

    const center = new Vector3()
    bounds.getCenter(center)

    const distance = bounds.min.distanceTo(bounds.max)

    camera.position.set(0, (bounds.max.y - bounds.min.y) * 0.75, distance * 1.2)

    setTransformCamera({
        area: 'targetPosition',
        coords: center,
    })

    console.log(`Camera at ${camera.position.toArray()}`)
}