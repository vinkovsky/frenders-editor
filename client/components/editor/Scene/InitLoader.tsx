import React, { useEffect, memo, FunctionComponent } from 'react'
import { useGLTF } from '@react-three/drei'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { Mesh } from 'three'

import Scene from './Scene'
import { IObjectSettingsProps } from '@interfaces/editor/objectScene'
import { useObjectSceneStore } from '@store/editor/objectScene'
import { useEnvironmentStore } from '@store/editor/environment'
import { useInitDataStore } from '@store/editor/initData'
import { useAssetsStore } from '@store/editor/assets'
import { useLayersUvwStore } from '@store/editor/layers'
import { useCameraStore } from '@store/editor/camera'
import { useHistoryStore } from '@store/editor/history'

const InitLoader: FunctionComponent<any> = () => {
  const { initDataCard, initDataUser } = useInitDataStore<any>(
    (state: any) => state.data
  )
  const { general, maps } = useObjectSceneStore<any>((state: any) => state.api)
  const { setInitHistory } = useHistoryStore<any>((state: any) => state.api)
  const {
    initProjectPresetData,
    initProjectData,
    initLibraryData,
  } = useAssetsStore<any>((state: any) => state.api)
  const { initDataCamera } = useCameraStore<any>((state: any) => state.api)
  const {
    setCurrentEnvironment,
    setCurrentIndexEnvironment,
    initEnvsData,
    initEnvsSavedData,
  } = useEnvironmentStore<any>((state: any) => state.api)
  const { initLayersUvwData } = useLayersUvwStore<any>(
    (state: any) => state.api
  )

  const { scene } = useGLTF(
    initDataCard?.dataModel.model.url,
    '/editor/draco/gltf/'
  )

  useEffect(() => {
    if (!initDataCard?.savedModelData) {
      scene.traverse((child: any) => {
        if (child.children && child.children[0] !== undefined) {
          if (child.children[0].type === 'Mesh') {
            const model: IObjectSettingsProps = {
              id: child.id + 8,
              name: child.name,
              visible: child.visible,
              position: child.position,
              rotation: child.rotation,
              scale: child.scale,
              locked: false,
              modelItems: child.children.map((childrenItem: Mesh | any) => {
                return {
                  id: childrenItem.id + 8,
                  name: childrenItem.name,
                  material: childrenItem.material,
                  geometry: childrenItem.geometry,
                  map: true,
                  metalnessMap: true,
                  roughnessMap: true,
                  normalMap: true,
                }
              }),
            }
            const presetHdr = initDataUser?.environments.filter(
              (env) => env.active
            )
            const presetHdrIndex = initDataUser?.environments.findIndex(
              (env) => env.active
            )
            general.setModelSettings(model)
            maps.initDataMap(initDataCard?.savedUvwData)
            initLibraryData(
              initDataUser?.libraryCards,
              initDataUser?.textures,
              initDataUser?.environments,
              initDataUser?.materials
            )
            const presetTextures = initDataUser?.textures.filter(
              (texture) => texture.active
            )
            initProjectPresetData({
              environments: presetHdr,
              textures: presetTextures,
            })
            initEnvsData(presetHdr)
            setCurrentIndexEnvironment(presetHdrIndex)
            new RGBELoader().load(presetHdr![presetHdrIndex].hdr.url, (hdr) => {
              setCurrentEnvironment(hdr)
            })

            const initDataHistory = {
              model,
              uvw: initDataCard?.savedUvwData,
            }
            setInitHistory(initDataHistory)
          }
        }
      })
    } else {
      const savedDataModel = initDataCard?.savedModelData
      scene.traverse((child: any) => {
        if (child.children && child.children[0] !== undefined) {
          if (child.children[0].type === 'Mesh') {
            const model: IObjectSettingsProps = {
              id: savedDataModel.id,
              name: savedDataModel.name,
              visible: savedDataModel.visible,
              position: savedDataModel.position,
              rotation: savedDataModel.rotation,
              scale: savedDataModel.scale,
              locked: savedDataModel.locked,
              modelItems: child.children.map(
                (childrenItem: Mesh | any, index: number) => {
                  return {
                    id: savedDataModel.modelItems[index].id,
                    name: savedDataModel.modelItems[index].name,
                    material: savedDataModel.modelItems[index].material,
                    geometry: childrenItem.geometry,
                    map: savedDataModel.modelItems[index].map,
                    metalnessMap: savedDataModel.modelItems[index].metalnessMap,
                    roughnessMap: savedDataModel.modelItems[index].roughnessMap,
                    normalMap: savedDataModel.modelItems[index].normalMap,
                  }
                }
              ),
            }
            const presetHdrIndex = initDataCard?.savedAssetsData.environments.envs.findIndex(
              (env) => env.active
            )
            general.setModelSettings(model)
            maps.initDataMap(initDataCard?.savedUvwData)
            initLibraryData(
              initDataUser?.libraryCards,
              initDataUser?.textures,
              initDataUser?.environments,
              initDataUser?.materials
            )
            initProjectData(initDataCard?.savedAssetsData)
            initDataCamera(initDataCard?.savedCameraData.dataCamera)
            initEnvsSavedData(initDataCard?.savedAssetsData.environments)
            initLayersUvwData(initDataCard?.savedUvwData.dataMaps)
            new RGBELoader().load(
              initDataCard?.savedAssetsData.environments.envs[presetHdrIndex]
                .hdr.url,
              (hdr) => {
                setCurrentEnvironment(hdr)
              }
            )
            setCurrentIndexEnvironment(presetHdrIndex)
            const initDataHistory = {
              model,
              uvw: initDataCard?.savedUvwData,
            }
            setInitHistory(initDataHistory)
          }
        }
      })
    }
  }, [])

  return <Scene />
}

export default memo(InitLoader)
