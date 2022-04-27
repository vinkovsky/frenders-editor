import { gql } from '@apollo/client'

// Загрузка аватара
const LOAD_TEXTURE = gql`
  mutation LoadTexture(
    $file: Upload!
    $refId: ID
    $ref: String
    $field: String
    $source: String
  ) {
    upload(
      file: $file
      refId: $refId
      field: $field
      source: $source
      ref: $ref
    ) {
      name
      id
      url
    }
  }
`

export default LOAD_TEXTURE
