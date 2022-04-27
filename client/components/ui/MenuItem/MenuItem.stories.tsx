import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import MenuItem, { IMenuItemProps } from './MenuItem'

export default {
  title: 'ui/MenuItem',
  component: MenuItem,
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
      defaultValue: 'MenuItem',
    },
    icon: {
      control: {
        type: 'select',
        options: ['settings', 'logout'],
      },
    },
  },
} as Meta

const Template: Story<IMenuItemProps> = ({ ...args }) => <MenuItem {...args} />

export const NotIcon = Template.bind({})
NotIcon.args = {
  children: 'MenuItem',
}

export const Icon = Template.bind({})
Icon.args = {
  text: 'MenuItem',
  icon: 'settings',
}
