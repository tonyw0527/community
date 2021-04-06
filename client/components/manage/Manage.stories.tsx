import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Manage, ManageProps } from './Manage';

export default {
  component: Manage,
  title: 'Page/Manage',
  decorators: [(story) => <div style={{ margin: '1rem' }}>{story()}</div>],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<ManageProps> = (args) => <Manage {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      id: 25,
      title: '최신글',
      markdown: '~~~ts\nㅇㅇ',
      writer: 'tony',
      sanitizedHtml: '<p>~~~ts\nㅇㅇ</p>\n',
      createdAt: '2021-04-02T06:46:53.092Z',
      updatedAt: '2021-04-02T06:46:53.092Z',
    },
    {
      id: 23,
      title: 'test',
      markdown: '~~~ts\ntest',
      writer: 'tony',
      sanitizedHtml: '<p>~~~ts\ntest</p>\n',
      createdAt: '2021-04-02T06:07:10.099Z',
      updatedAt: '2021-04-02T06:07:10.099Z',
    },
    {
      id: 21,
      title: 'Hooks 기본',
      markdown: '~~~jsx\nfunction Button() {\n  return <button>Click</button>;\n}\n~~~',
      writer: 'tony',
      sanitizedHtml:
        '<pre><code class="language-jsx">function Button() {\n  return &lt;button&gt;Click&lt;/button&gt;;\n}\n</code></pre>\n',
      createdAt: '2021-04-02T05:09:15.090Z',
      updatedAt: '2021-04-02T05:09:15.090Z',
    },
    {
      id: 14,
      title: '업데이트',
      markdown: '~~~ts\n// 내용을 수정합니다.',
      writer: 'tony',
      sanitizedHtml: '<p>~~~ts\n// 내용을 수정합니다.</p>\n',
      createdAt: '2021-04-01T04:17:12.053Z',
      updatedAt: '2021-04-02T06:46:25.000Z',
    },
  ],
  authResult: {
    me: {
      id: 'c567785',
      email: 'z@z.com',
      nickname: 'zito',
    },
    token: '123.zcc.!@#',
  },
  requestDeletePostDone: false,
  onRequestDeletePost: () => {},
};
