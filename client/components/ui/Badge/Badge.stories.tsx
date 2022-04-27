import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Avatar from '../Avatar'
import IconButton from '../IconButton'
import Badge, { IBadgeProps } from './Badge'

export default {
  title: 'ui/Badge',
  component: Badge,
} as Meta

const Template: Story<IBadgeProps> = ({ children, ...args }) => (
  <Badge {...args}>{children}</Badge>
)

export const Default = Template.bind({})
Default.args = {
  badgeContent: (
    <IconButton
      disabled={true}
      icon="photo"
      style={{
        padding: 4,
        border: '1px solid black',
        borderRadius: '100%',
      }}
    />
  ),
  children: (
    <Avatar style={{ width: 90, height: 90, fontSize: '2.25rem' }}>E</Avatar>
  ),
}

export const Image = Template.bind({})
Image.args = {
  badgeContent: (
    <IconButton
      disabled={true}
      icon="photo"
      style={{
        padding: 4,
        border: '1px solid black',
        borderRadius: '100%',
      }}
    />
  ),
  children: (
    <Avatar
      src="https://i.pravatar.cc/300"
      style={{ width: 90, height: 90, fontSize: '2.25rem' }}
    />
  ),
}
