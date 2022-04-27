import { ICardProps } from '@interfaces/dashboard'
import {
  IEnvProps,
  IMaterialProps,
  ITextureProps,
} from '@interfaces/editor/assets'

export interface IAvatarProps {
  id: string
  url: string
}

export interface IUserDataProps {
  id: string
  username: string
  email: string
  avatar: IAvatarProps | null
  libraryCards?: Array<ICardProps>
  textures?: Array<ITextureProps>
  materials?: Array<IMaterialProps>
  environments?: Array<IEnvProps>
}

export interface IAppProps {
  isAuthenticated: boolean
  user: Partial<IUserDataProps> | null
  loading: boolean
  token: string | null
  avatar: IAvatarProps
}

export interface IUserDataMutationProps {
  jwt: string
  user: IUserDataProps
}

export interface IRegisterProps {
  username: string
  email: string
  password: string
}

export interface IRegisterMutationProps {
  register: IUserDataMutationProps
}

export interface ILoginProps {
  identifier: string
  password: string
}

export interface ILoginMutationProps {
  login: IUserDataMutationProps
}

export interface IForgotProps {
  setEmailData: (value: boolean) => void
  setFormikEmailData: (value: string) => void
}

export interface IForgotPasswordProps {
  email: string
}

export interface IForgotPasswordMutationProps {
  ok: boolean
}

export interface IResetPasswordProps {
  password: string
  passwordConfirmation: string
  code: string
}

export interface IUpdateUserProps {
  username: string
  email: string
  password?: string
  newPassword?: string
  newPasswordConfirm?: string
  libraryCards?: Array<ICardProps>
  textures?: Array<ITextureProps>
  materials?: Array<IMaterialProps>
  environments?: Array<IEnvProps>
}

export interface IUpdateMutationProps {
  updateUser: IUserDataProps
}

export interface IDeleteUserProps {
  id: string
}

export interface IDeleteUserMutationProps {
  deleteUser: IDeleteUserProps
}

export interface IUploadFileMutationProps {
  upload: IUploadFileProps
}

export interface IUploadFileProps {
  file: File
  refId: string | undefined
  ref: string
  field: string
  source: string
}

export interface IDeleteAvatarProps {
  id: string
}

export interface IDeleteAvatarMutationProps {
  deleteFile: IDeleteAvatarProps
}

export interface IUpdateMutationLibraryCardProps {
  updateLibraryCard: ICardProps[]
}
