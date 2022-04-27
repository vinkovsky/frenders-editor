import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import ColorPicker, { IColorPickerProps } from './ColorPicker'

export default {
  title: 'ui/ColorPicker',
  component: ColorPicker,
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
      defaultValue: '#ffffff',
    },
    open: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<IColorPickerProps> = ({ ...args }) => (
  <ColorPicker {...args} />
)

export const Default = Template.bind({})
Default.args = {
  color: '#ffffff',
}
