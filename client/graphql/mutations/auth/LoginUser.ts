import { gql } from '@apollo/client'

// Вход пользователя
const LOGIN_USER = gql`
  mutation LoginUser($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`

export default LOGIN_USER
