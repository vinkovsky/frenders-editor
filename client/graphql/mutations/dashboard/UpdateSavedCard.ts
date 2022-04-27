import { gql } from '@apollo/client'

// Обновление данных текущего проекта
const UPDATE_SAVED_CARD = gql`
  mutation UpdateSavedCardsUser($input: updateSavedCardInput) {
    updateSavedCard(input: $input) {
      savedCard {
        id
        nameGroup
        nameProject
        savedModelData
        savedUvwData
        savedAssetsData
        savedAssetsData
        dataModel
        updatedAt
        createdAt
      }
    }
  }
`

export default UPDATE_SAVED_CARD
