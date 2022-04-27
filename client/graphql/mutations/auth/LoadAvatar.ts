import { gql } from '@apollo/client'

// Загрузка аватара
const LOAD_AVATAR = gql`
  mutation LoadAvatar(
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
      id
      url
    }
  }
`

export default LOAD_AVATAR
