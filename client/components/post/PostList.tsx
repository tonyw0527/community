/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Snippet, { SnippetProps } from './Snippet';

export interface PostListProps {
  data: Array<SnippetProps>;
}

function PostList({ data }: PostListProps) {
  return (
    <div css={container}>
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
  );
}

export default PostList;

const container = css`
  --auto-grid-min-size: 24rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
  grid-gap: 1rem;
  width: 100%;
  padding: 1rem;
`;
