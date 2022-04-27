import { gql } from '@apollo/client'

// Получение всех сохраненных проектов
const GET_SAVED_CARDS = gql`
  query {
    savedCards {
      id
      nameGroup
      nameProject
      savedModelData
      savedUvwData
      savedAssetsData
      savedCameraData
      savedPreviewImage
      dataModel
      createdAt
      updatedAt
      user {
        id
      }
    }
  }
`

export default GET_SAVED_CARDS
