import { gql } from '@apollo/client'

// Регистрация пользователя
const REGISTER_USER = gql`
  mutation RegisterUser($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`

export default REGISTER_USER
