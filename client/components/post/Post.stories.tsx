import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Post, PostProps } from './Post';

export default {
  component: Post,
  title: 'Page/Post',
  decorators: [(story) => <div style={{ margin: '1rem' }}>{story()}</div>],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<PostProps> = (args) => <Post {...args} />;

export const Default = Template.bind({});
Default.args = {
  post: {
    id: 19,
    title: 'Editor component',
    markdown:
      "~~~ts\n/** @jsxRuntime classic */\n/** @jsx jsx */\nimport React, { useRef, useEffect } from 'react';\nimport Router from 'next/router';\nimport { jsx, css, useTheme, Theme } from '@emotion/react';\nimport Editor from './Editor';\nimport { Button, Popup, Input } from '../common';\nimport { useRootState, useAppDispatch } from '../../store/store';\nimport { setTitle, setMarkdown, requestNewPost } from '../../store/slices/post';\nimport { AuthResult } from '../../store/slices/auth';\nimport { Post } from '../../lib/api/post';\n\ninterface PostWithToken extends Post {\n  token: string;\n}\n\ninterface NewProps {\n  authResult: AuthResult;\n  title: string;\n  markdown: string;\n  onSetTitle: (title: string) => void;\n  onSetMarkdown: (markdown: string) => void;\n  onRequestNewPost: ({ token, title, markdown, writer }: PostWithToken) => void;\n  requestNewPostDone: boolean;\n}\n\nfunction New({ authResult, title, markdown, onSetTitle, onSetMarkdown, onRequestNewPost, requestNewPostDone }: NewProps) {\n  const titleRef = useRef<HTMLInputElement>(null);\n\n  useEffect(() => {\n    if (requestNewPostDone) {\n      Popup.success('작성 완료');\n      Router.push('/main');\n    }\n  }, [requestNewPostDone]);\n\n  return (\n    <div css={$container}>\n      <Input\n        ref={titleRef}\n        css={$Title}\n        type=\"text\"\n        value={title}\n        onChange={(e) => {\n          if (titleRef.current!.style.getPropertyValue('--placeholder-color') !== 'gray') {\n            titleRef.current!.style.setProperty('--placeholder-color', 'gray');\n          }\n          onSetTitle(e.target.value);\n        }}\n        placeholder=\"제목을 입력하세요\"\n      />\n      <Editor markdown={markdown} onSetMarkdown={onSetMarkdown} />\n      <div css={$btnBox}>\n        <Button\n          css={$postBtn}\n          onClick={() => {\n            if (title === '') {\n              titleRef.current!.placeholder = '제목을 입력하세요';\n              titleRef.current!.style.setProperty('--placeholder-color', 'red');\n              titleRef.current!.focus();\n              return;\n            }\n\n            onRequestNewPost({\n              token: authResult.token,\n              title,\n              markdown,\n              writer: authResult.me.nickname,\n            });\n          }}\n        >\n          Post\n        </Button>\n      </div>\n    </div>\n  );\n}\n\nexport default function connect() {\n  const { authResult } = useRootState((state) => state.auth);\n  const { title, markdown, requestNewPostDone } = useRootState((state) => state.post);\n  const dispatch = useAppDispatch();\n\n  const onSetTitle = (title: string) => {\n    dispatch(setTitle(title));\n  };\n\n  const onSetMarkdown = (markdown: string) => {\n    dispatch(setMarkdown(markdown));\n  };\n\n  const onRequestNewPost = ({ token, title, markdown, writer }: PostWithToken) => {\n    dispatch(requestNewPost({ token, title, markdown, writer }));\n  };\n\n  return (\n    <New\n      title={title}\n      markdown={markdown}\n      authResult={authResult}\n      onSetMarkdown={onSetMarkdown}\n      onSetTitle={onSetTitle}\n      onRequestNewPost={onRequestNewPost}\n      requestNewPostDone={requestNewPostDone}\n    />\n  );\n}\n\nconst $container = css`\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n`;\n\nconst borderMix = css`\n  border-top: 0;\n  border-left: 0;\n  border-right: 0;\n`;\n\nconst $Title = css`\n  width: 100%;\n  margin-bottom: 1.5rem;\n  padding-bottom: 0.3rem;\n  ${borderMix}\n  border-radius: 0;\n  font-size: 1.5rem;\n\n  --placeholder-color: gray;\n\n  &::placeholder {\n    font-size: 1rem;\n    color: var(--placeholder-color);\n  }\n\n  &:hover {\n    ${borderMix}\n  }\n  &:focus {\n    ${borderMix}\n  }\n`;\n\nconst $btnBox = css`\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  z-index: 10;\n  background: gray;\n`;\n\nconst $postBtn = css`\n  width: 4rem;\n  margin: 0.5rem 1rem;\n  padding: 0.4rem;\n`;\n",
    writer: 'znx',
    createdAt: '2021-04-01T07:24:43.688Z',
    updatedAt: '2021-04-01T07:24:43.688Z',
  },
};
