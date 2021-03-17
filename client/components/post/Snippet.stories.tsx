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
  title: '화살표 함수',
  markdown: `
  ~~~js
  const foo = () => ();
  `,
};
