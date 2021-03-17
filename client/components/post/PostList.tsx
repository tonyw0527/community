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
        <Snippet key={'snp' + index} title={item.title} markdown={item.markdown} />
      ))}
    </div>
  );
}

export default PostList;

const container = css`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
`;
