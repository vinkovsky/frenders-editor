import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import NavigationTabs, { ITabsProps } from './NavigationTabs'
import { leftSidebarTabsData } from '../../../utils/editor/leftSidebarTabsData'
import { rightSidebarTabsData } from '../../../utils/editor/rightSidebarTabsData'

export default {
  title: 'ui/NavigationTabs',
  component: NavigationTabs,
  argTypes: {
    tabsData: {
      control: {
        type: 'select',
        options: [rightSidebarTabsData, leftSidebarTabsData],
      },
    },
    value: {
      control: {
        type: 'select',
        options: [
          ...rightSidebarTabsData.map((tabsItem) => tabsItem.value),
          ...leftSidebarTabsData.map((tabsItem) => tabsItem.value),
        ],
      },
    },
  },
} as Meta

const Template: Story<ITabsProps> = ({ ...args }) => (
  <NavigationTabs {...args} />
)

export const Default = Template.bind({})

Default.args = {
  tabsData: rightSidebarTabsData,
  value: 'Assets',
}
