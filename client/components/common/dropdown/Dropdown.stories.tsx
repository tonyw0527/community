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
  nickname: 'tony',
  email: 'a@b.com',
  onLogout: () => console.log('logout'),
  onToggleTheme: () => console.log('toggle theme'),
};
