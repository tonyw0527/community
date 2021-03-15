import React from 'react';
import { Story, Meta } from '@storybook/react';
import { GlobalPopup, GlobalPopupProps } from './Popup';

export default {
  component: GlobalPopup,
  title: 'GlobalPopup',
  parameters: {
    docs: {
      inlineStories: false,
    },
  },
} as Meta;

const Template: Story<GlobalPopupProps> = (args) => <GlobalPopup {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'normal',
  content: 'normal message',
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  content: 'success message',
};

export const Warn = Template.bind({});
Warn.args = {
  type: 'warn',
  content: 'warn message',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  content: 'error message',
};
