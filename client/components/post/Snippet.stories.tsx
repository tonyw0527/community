import React from 'react';
import { Story, Meta } from '@storybook/react';
import Snippet, { SnippetProps } from './Snippet';

export default {
  component: Snippet,
  title: 'Snippet',
} as Meta;

const Template: Story<SnippetProps> = (args) => <Snippet {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '함수 선언',
  markdown: `~~~ts
// 일반적인 함수 선언
function() {
  return true;
}
~~~`,
  user: 'tony',
  slug: 'declare-function',
  createdAt: new Date().toLocaleDateString(),
};
