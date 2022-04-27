import React, { FunctionComponent } from 'react'

import DashboardProvider from '@providers/DashboardProvider'
import {
  initialStateDashboard,
  dashboardReducer,
} from '@reducers/dashboardReducers'

const DashboardController: FunctionComponent = ({ children }) => {
  return (
    <DashboardProvider
      reducer={dashboardReducer}
      initialState={initialStateDashboard}
    >
      {children}
    </DashboardProvider>
  )
}

export default DashboardController
