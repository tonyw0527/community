import React from 'react';
import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  component: Button,
  title: 'Common/Button',
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
};

// export const Primary = Template.bind({});
// Primary.args = {
//   children: 'Primary',
//   theme: 'primary',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   children: 'Secondary',
//   theme: 'secondary',
// };
