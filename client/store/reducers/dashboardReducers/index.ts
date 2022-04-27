import combineReducers from 'react-combine-reducers'
import { IDashboardProps } from '@interfaces/dashboard'
import { IActionsProps } from '@interfaces/index'
import {
  dashboardSettingsReducer,
  initialDashboardSettingsState,
} from '@reducers/dashboardReducers/dashboardSettingsReducer'
import {
  cardsReducer,
  initialCardsState,
} from '@reducers/dashboardReducers/cardsReducer'

type DashboardReducer = (
  state: IDashboardProps,
  action: IActionsProps
) => IDashboardProps

export const [
  dashboardReducer,
  initialStateDashboard,
] = combineReducers<DashboardReducer>({
  settings: [dashboardSettingsReducer, initialDashboardSettingsState],
  cards: [cardsReducer, initialCardsState],
})
