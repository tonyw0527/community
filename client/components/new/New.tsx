/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { jsx, css, useTheme, Theme } from '@emotion/react';
import Editor from './Editor';
import { Button, Popup } from '../common';
import { useRootState, useAppDispatch } from '../../store/store';
import { setTitle, setMarkdown, requestNewPost } from '../../store/slices/post';
import { AuthResult } from '../../store/slices/auth';
import { Post } from '../../lib/api/post';

interface PostWithToken extends Post {
  token: string;
}

interface NewProps {
  authResult: AuthResult;
  title: string;
  markdown: string;
  onSetTitle: (title: string) => void;
  onSetMarkdown: (markdown: string) => void;
  onRequestNewPost: ({ token, title, markdown, writer }: PostWithToken) => void;
  requestNewPostDone: boolean;
}

function New({ authResult, title, markdown, onSetTitle, onSetMarkdown, onRequestNewPost, requestNewPostDone }: NewProps) {
  useEffect(() => {
    if (requestNewPostDone) {
      Popup.success('작성 완료');
      Router.push('/main');
    }
  }, [requestNewPostDone]);

  return (
    <div css={container}>
      <input type="text" value={title} onChange={(e) => onSetTitle(e.target.value)} placeholder="Title" />
      <Editor markdown={markdown} onSetMarkdown={onSetMarkdown} />
      <div css={btnBox}>
        <Button onClick={() => Router.push('/main')}>Cancel</Button>
        <Button
          onClick={() =>
            onRequestNewPost({
              token: authResult.token,
              title,
              markdown,
              writer: authResult.me.nickname,
            })
          }
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default function connect() {
  const { authResult } = useRootState((state) => state.auth);
  const { title, markdown, requestNewPostDone } = useRootState((state) => state.post);
  const dispatch = useAppDispatch();

  const onSetTitle = (title: string) => {
    dispatch(setTitle(title));
  };

  const onSetMarkdown = (markdown: string) => {
    dispatch(setMarkdown(markdown));
  };

  const onRequestNewPost = ({ token, title, markdown, writer }: PostWithToken) => {
    dispatch(requestNewPost({ token, title, markdown, writer }));
  };

  return (
    <New
      title={title}
      markdown={markdown}
      authResult={authResult}
      onSetMarkdown={onSetMarkdown}
      onSetTitle={onSetTitle}
      onRequestNewPost={onRequestNewPost}
      requestNewPostDone={requestNewPostDone}
    />
  );
}

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
`;

const btnBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
