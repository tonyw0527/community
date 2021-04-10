/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css, Theme } from '@emotion/react';
import ReactMarkdown from '../edit/ReactMarkdown';
import { useRootState } from '../../store/store';
import * as PostActions from '../../store/slices/post';

export interface PostProps {
  post: PostActions.Snippet;
}

export function Post({ post }: PostProps) {
  const { title, writer, markdown, createdAt } = post;

  return (
    <>
      <h1 css={$title}>{title}</h1>
      <span css={$info}>
        <strong>{writer}</strong>
        <span css={$line}></span>
        {new Date(createdAt).toLocaleString()}
      </span>
      <ReactMarkdown css={$viewer} markdown={markdown} />
    </>
  );
}

export default function connect() {
  const { post } = useRootState((state) => state.post);

  if (!post) {
    return <div>Loading...</div>;
  }

  return <Post post={post} />;
}

const $viewer = css`
  width: 90%;
  height: 100%;
  min-height: 100vh;
  padding: 0 1rem;
  overflow: auto;
`;

const borderMix = css`
  border-top: 0;
  border-left: 0;
  border-right: 0;
`;

const $title = css`
  width: 100%;
  margin-bottom: 0.5rem;
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

const $info = (theme: Theme) => css`
  display: block;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(6, 6, 6, 0.2);
  color: ${theme.color.onBackgroundLow};
  font-size: 0.9rem;
`;

const $line = (theme: Theme) => css`
  display: inline-block;
  width: 1.1px;
  height: 0.8rem;
  margin: 0 1rem;
  background: ${theme.color.onBackgroundLow};
`;
