import { gql } from '@apollo/client'

// Получение данных пользователя
const GET_USER = gql`
  query {
    me {
      id
      username
      email
      avatar {
        id
        url
      }
      libraryCards
      environments
      textures
      materials
    }
  }
`

export default GET_USER
