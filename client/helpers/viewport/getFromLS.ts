// Получение сохраненных данных панелей вьюпорта
export function getFromLS(key: string) {
  let ls = {}
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8') as string) || {}
    } catch (e) {
      console.log(e)
    }
  }
  return ls[key]
}
