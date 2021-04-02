/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useRef, useEffect } from 'react';
import Router from 'next/router';
import { jsx, css, Theme } from '@emotion/react';
import Editor from './Editor';
import { Button, Popup, Input } from '../common';
import { AuthResult } from '../../store/slices/auth';
import { Post } from '../../lib/api/post';

interface PostWithToken extends Post {
  token: string;
}

interface EditFormProps {
  authResult: AuthResult;
  postId?: number;
  title: string;
  markdown: string;
  onSetTitle: (title: string) => void;
  onSetMarkdown: (markdown: string) => void;
  onRequestComplete: ({ token, title, markdown, writer }: PostWithToken) => void;
  requestDone: boolean;
}

function EditForm({ authResult, postId, title, markdown, onSetTitle, onSetMarkdown, onRequestComplete, requestDone }: EditFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (requestDone) {
      Popup.success('작성 완료');
      Router.push('/main');
    }
  }, [requestDone]);

  return (
    <div css={$container}>
      <Input
        ref={titleRef}
        css={$Title}
        type="text"
        value={title}
        onChange={(e) => {
          if (titleRef.current!.style.getPropertyValue('--placeholder-color') !== 'gray') {
            titleRef.current!.style.setProperty('--placeholder-color', 'gray');
          }
          onSetTitle(e.target.value);
        }}
        placeholder="제목을 입력하세요"
      />
      <Editor markdown={markdown} onSetMarkdown={onSetMarkdown} />
      <div css={$btnBox}>
        <Button
          css={$postBtn}
          onClick={() => {
            if (title === '') {
              titleRef.current!.placeholder = '제목을 입력하세요';
              titleRef.current!.style.setProperty('--placeholder-color', 'red');
              titleRef.current!.focus();
              return;
            }

            onRequestComplete({
              token: authResult.token,
              id: postId,
              title,
              markdown,
              writer: authResult.me.nickname,
            });
          }}
        >
          완료
        </Button>
      </div>
    </div>
  );
}

export default EditForm;

const $container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const borderMix = css`
  border-top: 0;
  border-left: 0;
  border-right: 0;
`;

const $Title = css`
  width: 100%;
  margin-bottom: 1.5rem;
  padding-bottom: 0.3rem;
  ${borderMix}
  border-radius: 0;
  font-size: 1.5rem;

  --placeholder-color: gray;

  &::placeholder {
    font-size: 1rem;
    color: var(--placeholder-color);
  }

  &:hover {
    ${borderMix}
  }
  &:focus {
    ${borderMix}
  }
`;

const $btnBox = (theme: Theme) => css`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
  background: ${theme.mode === 'light' ? '#EAE3C9' : '#333'};
`;

const $postBtn = css`
  width: 4rem;
  margin: 0.5rem 1rem;
  padding: 0.4rem;
`;
