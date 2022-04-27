import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

import Chip, { IChipProps } from './Chip'

export default {
  title: 'ui/Chip',
  component: Chip,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Chip',
    },
    clickable: {
      control: {
        type: 'boolean',
      },
      defaultValue: true,
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    background: {
      control: {
        type: 'color',
      },
      defaultValue: '#e65b5b',
    },
  },
} as Meta

const Template: Story<IChipProps> = ({
  label,
  background,
  clickable,
  disabled,
}) => (
  <Chip
    label={label}
    style={{ background }}
    clickable={clickable}
    disabled={disabled}
    onClick={action('clicked')}
    onDelete={action('clicked')}
  />
)

export const Default = Template.bind({})
Default.args = {
  label: 'Chip',
  background: '#e65b5b',
  clickable: true,
  disabled: false,
}
