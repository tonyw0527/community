import React from 'react';
import { Story, Meta } from '@storybook/react';
import Editor, { EditorProps } from './Editor';
import { Provider } from 'react-redux';
import { action } from '@storybook/addon-actions';

const store: any = {
  getState: () => {
    return {
      editor: {
        markdown: '~~~ts',
      },
    };
  },
  subscribe: () => 0,
  dispatch: action('dispach'),
};

export default {
  component: Editor,
  title: 'Editor',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} as Meta;

const Template: Story<EditorProps> = (args) => <Editor {...args} />;

export const Default = Template.bind({});
Default.args = {};
