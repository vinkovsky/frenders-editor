import { gql } from '@apollo/client'

// Обновление данных пользователя
const UPDATE_USER = gql`
  mutation UpdateUser($input: updateUserInput) {
    updateUser(input: $input) {
      user {
        id
        username
        email
        avatar {
          id
          url
        }
        libraryCards
        textures
        environments
        materials
      }
    }
  }
`

export default UPDATE_USER
