import React from 'react';
import { Story, Meta } from '@storybook/react';
import PostList, { PostListProps } from './PostList';

export default {
  component: PostList,
  title: 'Page/Main/PostList',
  decorators: [(story) => <div style={{ width: '100vw' }}>{story()}</div>],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<PostListProps> = (args) => <PostList {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      title: '화살표 함수',
      markdown: `~~~js
const foo = () => ();`,
      writer: 'tony',
      slug: 'declare-function',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      title: '변수 선언',
      markdown: `~~~js
const foo = 1; // 선언 후 값 변경 불가
let bar = 0; // 선언 후 값 변경 가능`,
      writer: 'tony',
      slug: 'declare-function',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      title: 'if문',
      markdown: `~~~js
if(true){
  console.log('true here');
} else {
  console.log('false here');
}`,
      writer: 'tony',
      slug: 'declare-function',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      title: 'else if 문',
      markdown: `~~~js
if(num < 0){
  console.log('-');
} else if (num > 0) {
  console.log('+');
} else {
  console.log('0');
}  else if (num > 0) {
  console.log('+');
} else {
  console.log('0');
} else {
  console.log('0');
}  else if (num > 0) {
  console.log('+');
} else {
  console.log('0');
}`,
      writer: 'tony',
      slug: 'declare-function',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      title: 'map 함수',
      markdown: `~~~js
arr.map((item, index) => {
  return item + index;
})`,
      writer: 'tony',
      slug: 'declare-function',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      title: 'for 문',
      markdown: `~~~js
// 10번 반복하여 콘솔 출력
for(let i=0; i<10; i++){
  console.log(i);
}`,
      writer: 'tony',
      slug: 'declare-function',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      title: '함수',
      markdown: '~~~js\nfunction() {\n  return true;\n}\n~~~',
      writer: 'tony',
      slug: 'declare-function',
      createdAt: new Date().toLocaleDateString(),
    },
  ],
};
