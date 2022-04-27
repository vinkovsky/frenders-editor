import { gql } from '@apollo/client'

// Получение ассетов из библиотеки пользователя
const GET_LIBRARY_ASSETS = gql`
  query {
    libraryCards {
      id
      title
      category
      categoryItem
      colorChip
      favorite
      height
      img {
        id
        url
      }
      model {
        id
        url
      }
      createdAt
      published_at
    }
    environments {
      id
      title
      img {
        id
        url
      }
      hdr {
        id
        url
      }
      exposure
      active
    }
    materials {
      id
      title
      img {
        id
        url
      }
    }
    textures {
      id
      title
      img {
        id
        url
      }
      active
    }
  }
`

export default GET_LIBRARY_ASSETS
