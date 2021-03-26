import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Main } from './Main';
import { Provider } from 'react-redux';
import { action } from '@storybook/addon-actions';
import * as PostListStories from '../post/PostList.stories';

// A super-simple mock of a redux store
const store: any = {
  getState: () => {
    return {
      auth: {
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
      },
    };
  },
  subscribe: () => 0,
  dispatch: action('dispach'),
};

export default {
  component: Main,
  title: 'Main',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => <Main {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: PostListStories.Default.args?.data,
  onToggleTheme: () => console.log('toggle'),
};
