import React from 'react';
import { Story, Meta } from '@storybook/react';
import { AuthForm, AuthFormProps } from './AuthForm';

export default {
  component: AuthForm,
  title: 'Page/Login',
  decorators: [(story) => <div style={{ width: '100%' }}>{story()}</div>],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<AuthFormProps> = (args) => <AuthForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  loginLoading: false,
  loginDone: false,
  loginError: null,
  onResetLoginState: () => console.log('reset'),
  onLogin: (email: string, password: string, isAutoLogin: boolean) => console.log('login', email, password, isAutoLogin),
};

export const Error = Template.bind({});
Error.args = {
  loginLoading: false,
  loginDone: false,
  loginError: '비밀번호가 일치하지 않습니다.',
  onResetLoginState: () => console.log('reset'),
  onLogin: (email: string, password: string, isAutoLogin: boolean) => console.log('login', email, password, isAutoLogin),
};
