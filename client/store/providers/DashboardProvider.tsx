import React, {
  createContext,
  FunctionComponent,
  useMemo,
  useReducer,
} from 'react'

import { IContextProviderProps, IInitContextProps } from '@interfaces/index'
import { IDashboardProps } from '@interfaces/dashboard'

export const DashboardContext = createContext(
  {} as IInitContextProps<IDashboardProps>
)

const DashboardProvider: FunctionComponent<
  IContextProviderProps<IDashboardProps>
> = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
