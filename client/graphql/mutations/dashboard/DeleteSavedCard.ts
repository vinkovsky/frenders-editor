import { gql } from '@apollo/client'

// Удаление сохраненного проекта
const DELETE_SAVED_CARD = gql`
  mutation DeleteSavedCard($input: deleteSavedCardInput) {
    deleteSavedCard(input: $input) {
      savedCard {
        id
        nameGroup
        nameProject
        dataModel
        updatedAt
        createdAt
      }
    }
  }
`

export default DELETE_SAVED_CARD
