import React from 'react';
import { Story, Meta } from '@storybook/react';
import Copyright from './Copyright';

export default {
  component: Copyright,
  title: 'Copyright',
} as Meta;

const Template: Story = (args) => <Copyright {...args} />;

export const Default = Template.bind({});
Default.args = {};
