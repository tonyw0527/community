/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react';
import Snippet, { SnippetProps } from './Snippet';

export interface PostListProps {
  data: Array<SnippetProps>;
}

function PostList({ data }: PostListProps) {
  return (
    <>
      <h1>{'The latest snippets'}</h1>
      <div css={$snippets}>
        {data.map((item, index) => (
          <Snippet
            key={'snp' + index}
            id={item.id}
            title={item.title}
            markdown={item.markdown}
            writer={item.writer}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </>
  );
}

export default PostList;

const $snippets = css`
  --auto-grid-min-size: 25rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
  grid-gap: 1rem;
  width: 100%;

  @media screen and (max-width: 769px) {
    --auto-grid-min-size: 20rem;
  }
`;
