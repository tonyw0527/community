import React from 'react';
import { Story, Meta } from '@storybook/react';
import EditForm from './EditForm';
import { Provider } from 'react-redux';
import { action } from '@storybook/addon-actions';

const store: any = {
  getState: () => {
    return {
      auth: {},
      post: {
        markdown: '~~~ts',
      },
    };
  },
  subscribe: () => 0,
  dispatch: action('dispach'),
};

export default {
  component: EditForm,
  title: 'Page/edit/index',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} as Meta;

const Template: Story = (args) => <EditForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
