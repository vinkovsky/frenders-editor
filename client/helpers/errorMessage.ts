// Получение ошибок
export const errorMessage = (error: any) => {
  if (error.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === 'INTERNAL_SERVER_ERROR'
      ) {
        return graphQLError.extensions.exception.data.message[0].messages[0]
          .message
      }
    }
  }
  return 'An error occurred'
}
