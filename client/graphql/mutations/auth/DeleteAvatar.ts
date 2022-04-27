import { gql } from '@apollo/client'

// Удаление аватара пользователя
const DELETE_AVATAR = gql`
  mutation DeleteAvatar($input: deleteFileInput) {
    deleteFile(input: $input) {
      file {
        id
      }
    }
  }
`

export default DELETE_AVATAR
