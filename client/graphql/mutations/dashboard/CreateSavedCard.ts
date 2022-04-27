import { gql } from '@apollo/client'

// Создание нового проекта
const CREATE_SAVED_CARD = gql`
  mutation CreateSavedCard($input: createSavedCardInput) {
    createSavedCard(input: $input) {
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

export default CREATE_SAVED_CARD
