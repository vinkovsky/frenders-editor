import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

import Fab, { IFabProps } from './Fab'

export default {
  title: 'ui/Fab',
  component: Fab,
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: ['run', 'stop', 'save'],
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

const Template: Story<IFabProps> = ({ ...args }) => (
  <Fab onClick={action('clicked')} {...args} />
)

export const Default = Template.bind({})
Default.args = {
  icon: 'run',
  disabled: false,
}
