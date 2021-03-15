import React from 'react';
import { Story, Meta } from '@storybook/react';
import Landing from './Landing';

export default {
  component: Landing,
  title: 'Landing',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => <Landing {...args} />;

export const Default = Template.bind({});
Default.args = {};
