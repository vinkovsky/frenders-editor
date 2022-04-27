import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Tooltip, { TooltipType } from './Tooltip'
import IconButton from '../IconButton'

export default {
  title: 'ui/Tooltip',
  component: Tooltip,
  argTypes: {
    arrow: {
      control: {
        type: 'boolean',
      },
      defaultValue: true,
    },
    title: {
      control: {
        type: 'text',
      },
      defaultValue: 'Undo',
    },
  },
} as Meta

const Template: Story<TooltipType> = ({ children, ...args }) => (
  <Tooltip {...args}>{children}</Tooltip>
)

export const Default = Template.bind({})
Default.args = {
  children: <IconButton icon={'undo'} />,
  arrow: true,
  title: 'Undo',
}
