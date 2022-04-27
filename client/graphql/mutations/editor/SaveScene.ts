import { gql } from '@apollo/client'

// Сохранение данных сцены
const SAVE_SCENE = gql`
  mutation SaveScene($input: updateSavedCardInput) {
    updateSavedCard(input: $input) {
      savedCard {
        id
        nameGroup
        nameProject
        savedModelData
        savedUvwData
        savedAssetsData
        savedCameraData
        dataModel
        updatedAt
        createdAt
      }
    }
  }
`

export default SAVE_SCENE
