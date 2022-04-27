import React, { FunctionComponent, MouseEvent, useContext } from 'react'
import { List } from '@material-ui/core'

import { ListItem } from '@ui/index'
import { IListItemProps } from '@ui/ListItem/ListItem'
import { menuSidebarListData } from '@utils/dashboard/menuSidebarListData'
import { DashboardContext } from '@providers/DashboardProvider'
import * as ACTIONS from '@actions/dashboard/dashboardSettings'

import { useStyles } from './SidebarMenuList.styles'

const SidebarMenuList: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(DashboardContext)

  const handleListItemClick = (
    event: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    dispatch(ACTIONS.setChangeProfileMenu(index))
  }

  return (
    <List component="nav" className={classes.list}>
      {menuSidebarListData.map(
        (item: Partial<IListItemProps>, index: number) => {
          return (
            <ListItem
              key={item.text}
              className={classes.listItem}
              selected={state.settings.selectedIndex === index}
              onClick={(e) => handleListItemClick(e, index)}
              {...item}
            />
          )
        }
      )}
    </List>
  )
}

export default SidebarMenuList
