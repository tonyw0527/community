import React from 'react';
import { Story, Meta } from '@storybook/react';
import Input from './Input';

export default {
  component: Input,
  title: 'Common/Input',
} as Meta;

const Template: Story = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {};
