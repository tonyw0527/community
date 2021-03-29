import React from 'react';
import { Story, Meta } from '@storybook/react';
import New from './New';

export default {
  component: New,
  title: 'Page/New/index',
} as Meta;

const Template: Story = (args) => <New {...args} />;

export const Default = Template.bind({});
Default.args = {};
