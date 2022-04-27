import { gql } from '@apollo/client'

// Подтверждение e-mail пользователя по почте
const CONFIRM_EMAIL = gql`
  mutation ConfirmEmailUser($email: String!) {
    emailConfirmation(confirmation: $email) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`

export default CONFIRM_EMAIL
