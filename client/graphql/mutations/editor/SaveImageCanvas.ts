import { gql } from '@apollo/client'

// Сохранение изображения текущего состояния канваса
const SAVE_IMAGE_CANVAS = gql`
  mutation SaveImageCanvas($input: updateSavedCardInput) {
    updateSavedCard(input: $input) {
      savedCard {
        savedPreviewImage
      }
    }
  }
`

export default SAVE_IMAGE_CANVAS
