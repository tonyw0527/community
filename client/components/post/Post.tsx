/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect } from 'react';
import { jsx, css, useTheme, Theme } from '@emotion/react';
import ReactMarkdown from '../edit/ReactMarkdown';
import { useRootState, useAppDispatch } from '../../store/store';
import * as PostActions from '../../store/slices/post';

interface PostProps {
  markdown: string;
}

function Post({ markdown }: PostProps) {
  return <ReactMarkdown css={$viewer} markdown={markdown} />;
}

export default function connect({ postid }: any) {
  const { post } = useRootState((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(PostActions.loadOnePost(postid));
  }, []);

  return <Post markdown={post ? post.markdown : ''} />;
}

const $viewer = css`
  width: 90%;
  height: 100%;
  min-height: 100vh;
  padding: 0 1rem;
  overflow: auto;
`;
