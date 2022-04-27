import { gql } from '@apollo/client'

// Изменение пароля пользователя
const FORGOT_PASSWORD = gql`
  mutation ForgotPasswordUser($email: String!) {
    forgotPassword(email: $email) {
      ok
    }
  }
`

export default FORGOT_PASSWORD
