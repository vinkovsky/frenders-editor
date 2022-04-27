import { IUserDataProps } from '@interfaces/auth'
import { ISavedCardProps } from '@interfaces/dashboard'

export interface IInitDataProps {
  initDataUser: IUserDataProps | null
  initDataCard: ISavedCardProps | null
}
