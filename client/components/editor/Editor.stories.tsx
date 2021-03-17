import React from 'react';
import { Story, Meta } from '@storybook/react';
import Editor from './Editor';

export default {
  component: Editor,
  title: 'Editor',
} as Meta;

const Template: Story = (args) => <Editor {...args} />;

export const Default = Template.bind({});
Default.args = {};
