/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Snippet, { SnippetProps } from './Snippet';

export interface PostListProps {
  data: Array<SnippetProps>;
}

function PostList({ data }: PostListProps) {
  return (
    <div css={$container}>
      <h1>{'The latest snippets'}</h1>
      <div css={$snippets}>
        {data.map((item, index) => (
          <Snippet
            key={'snp' + index}
            title={item.title}
            markdown={item.markdown}
            writer={item.writer}
            slug={item.slug}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default PostList;

const $container = css`
  padding: 1rem 6rem;

  @media screen and (max-width: 769px) {
    padding: 1rem;
  }
`;

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
