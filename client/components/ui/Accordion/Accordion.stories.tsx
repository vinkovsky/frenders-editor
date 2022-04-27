import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Accordion from './Accordion'

export default {
  title: 'ui/Accordion',
  component: Accordion,
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: ['general', 'advanced'],
      },
    },
    title: {
      control: {
        type: 'text',
      },
      defaultValue: 'Title',
    },
  },
} as Meta

const Template: Story = ({ title, icon, children }) => (
  <Accordion title={title} icon={icon}>
    {children}
  </Accordion>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
  icon: 'general',
  children: <h2>Settings</h2>,
}
