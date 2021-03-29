import React from 'react';
import { Story, Meta } from '@storybook/react';
import Sidebar from './Sidebar';

export default {
  component: Sidebar,
  title: 'Page/Main/Sidebar',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [(story) => <div style={{ margin: '0.5rem' }}>{story()}</div>],
} as Meta;

const Template: Story = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {};
