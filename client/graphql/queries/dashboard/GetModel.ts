import { gql } from '@apollo/client'

// Получение данных о загруженного проекта пользователя
const GET_MODEL = gql`
  query GET_MODEL_USER($id: ID!) {
    savedCard(id: $id) {
      id
      dataModel
      savedModelData
      savedUvwData
      savedAssetsData
      savedCameraData
      nameProject
    }
  }
`

export default GET_MODEL
