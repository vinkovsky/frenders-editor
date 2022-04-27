import { gql } from '@apollo/client'

// Сброс пароля
const RESET_PASSWORD = gql`
  mutation ResetPasswordUser(
    $password: String!
    $passwordConfirmation: String!
    $code: String!
  ) {
    resetPassword(
      password: $password
      passwordConfirmation: $passwordConfirmation
      code: $code
    ) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`

export default RESET_PASSWORD
