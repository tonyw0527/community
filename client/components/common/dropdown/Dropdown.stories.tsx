import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Dropdown, DropdownProps } from './Dropdown';

export default {
  component: Dropdown,
  title: 'Common/Dropdown',
  decorators: [(story) => <div style={{ position: 'fixed', top: '1rem', right: '1rem' }}>{story()}</div>],
} as Meta;

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  authResult: {
    me: {
      id: '2109d210-8184-11eb-ba51-a75dd73260fc',
      email: '1@2.com',
      nickname: 'tony',
      createdAt: '2021-03-10T09:36:45.000Z',
    },
    token: 'test',
  },
  logoutDone: false,
  onLogout: () => console.log('logout'),
  onLoadMyInfo: (token: string) => console.log('load my info'),
  onToggleTheme: () => console.log('toggle theme'),
};
