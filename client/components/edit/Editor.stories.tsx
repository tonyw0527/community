import React from 'react';
import { Story, Meta } from '@storybook/react';
import Editor, { EditorProps } from './Editor';
import { Provider } from 'react-redux';
import { action } from '@storybook/addon-actions';

const store: any = {
  getState: () => {
    return {
      post: {
        markdown: '~~~ts',
      },
    };
  },
  subscribe: () => 0,
  dispatch: action('dispach'),
};

export default {
  component: Editor,
  title: 'Page/Edit/Editor',
  decorators: [
    (story) => (
      <Provider store={store}>
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{story()}</div>
      </Provider>
    ),
  ],
} as Meta;

const Template: Story<EditorProps> = (args) => <Editor {...args} />;

export const Default = Template.bind({});
Default.args = {};
