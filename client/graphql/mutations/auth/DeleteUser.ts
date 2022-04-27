import { gql } from '@apollo/client'

// Удаление текущего пользователя
const DELETE_USER = gql`
  mutation DeleteUser($input: deleteUserInput) {
    deleteUser(input: $input) {
      user {
        id
      }
    }
  }
`

export default DELETE_USER
