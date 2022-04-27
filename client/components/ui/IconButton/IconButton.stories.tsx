import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

import IconButton, { IIconButtonProps } from './IconButton'
import Avatar from '../Avatar'

export default {
  title: 'ui/IconButton',
  component: IconButton,
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: ['edit', 'photo', 'close', 'undo', 'redo'],
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<IIconButtonProps> = ({ children, ...args }) => (
  <IconButton onClick={action('clicked')} {...args}>
    {children}
  </IconButton>
)

export const Icon = Template.bind({})
Icon.args = {
  icon: 'photo',
  disabled: false,
  children: <Avatar>E</Avatar>,
}
