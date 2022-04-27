import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import ScrollableTabs, { IScrollableTabsProps } from './ScrollableTabs'
import { objectTabsData } from '../../../utils/editor/objectTabsData'
import { uvwTabsData } from '../../../utils/editor/uvwTabsData'

export default {
  title: 'ui/ScrollableTabs',
  component: ScrollableTabs,
  argTypes: {
    tabsData: {
      control: {
        type: 'select',
        options: [objectTabsData, uvwTabsData],
      },
    },
    value: {
      control: {
        type: 'select',
        options: [
          ...objectTabsData.map((tabsItem) => tabsItem.value),
          ...uvwTabsData.map((tabsItem) => tabsItem.value),
        ],
      },
    },
  },
} as Meta

const Template: Story<IScrollableTabsProps> = ({ ...args }) => (
  <ScrollableTabs {...args} />
)

export const Default = Template.bind({})

Default.args = {
  tabsData: objectTabsData,
  value: 'Assets',
  scrollable: true,
}
