import React from 'react';
import { Story, Meta } from '@storybook/react';
import PostList, { PostListProps } from './PostList';

export default {
  component: PostList,
  title: 'Page/Main/PostList',
  decorators: [(story) => <div style={{ margin: '1rem', padding: '1rem', width: '100vw' }}>{story()}</div>],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<PostListProps> = (args) => <PostList {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      id: 1,
      title: '화살표 함수',
      markdown: `~~~js
const foo = () => ();`,
      writer: 'tony',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: '변수 선언',
      markdown: `~~~js
const foo = 1; // 선언 후 값 변경 불가
let bar = 0; // 선언 후 값 변경 가능`,
      writer: 'tony',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      title: 'if문',
      markdown: `~~~js
if(true){
  console.log('true here');
} else {
  console.log('false here');
}`,
      writer: 'tony',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: 4,
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
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: 5,
      title: 'map 함수',
      markdown: `~~~js
arr.map((item, index) => {
  return item + index;
})`,
      writer: 'tony',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: 6,
      title: 'for 문',
      markdown: `~~~js
// 10번 반복하여 콘솔 출력
for(let i=0; i<10; i++){
  console.log(i);
}`,
      writer: 'tony',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: 7,
      title: '함수',
      markdown: '~~~js\nfunction() {\n  return true;\n}\n~~~',
      writer: 'tony',
      createdAt: new Date().toLocaleDateString(),
    },
  ],
};
