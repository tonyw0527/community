import React from 'react';
import { Story, Meta } from '@storybook/react';
import { RegisterForm, RegisterFormProps } from './RegisterForm';

export default {
  component: RegisterForm,
  title: 'Page/Register',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<RegisterFormProps> = (args) => <RegisterForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  registerLoading: false,
  registerDone: false,
  registerError: null,
  onResetRegisterState: () => console.log('reset'),
  onRegister: (email: string, password: string, nickname: string) => console.log('register', email, password, nickname),
};

export const Error = Template.bind({});
Error.args = {
  registerLoading: false,
  registerDone: false,
  registerError: '이미 등록된 이메일입니다.',
  onResetRegisterState: () => console.log('reset'),
  onRegister: (email: string, password: string, nickname: string) => console.log('register', email, password, nickname),
};
