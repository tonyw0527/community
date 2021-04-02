/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect } from 'react';
import { jsx, css, useTheme, Theme } from '@emotion/react';
import Router from 'next/router';
import Link from 'next/link';
import { useRootState, useAppDispatch } from '../../store/store';
import * as PostActions from '../../store/slices/post';

function Manage({ data, authResult, requestDeletePostDone, onRequestDeletePost }: any) {
  useEffect(() => {
    if (requestDeletePostDone) {
      Router.reload();
    }
  }, [requestDeletePostDone]);

  const renderMyPosts = () => {
    if (!data) {
      return <div>no data</div>;
    }

    const lists = data.map((item: any, index: any) => (
      <li css={$list} key={'mypost' + index}>
        <div css={$left}>
          <Link href={`/post/[post]`} as={`/post/${item.id}`}>
            <a css={$name}>{item.title}</a>
          </Link>{' '}
          <div css={$info}>{new Date(item.createdAt).toLocaleString()}</div>
        </div>
        <div css={$right}>
          <button css={$button}>
            <Link href={`/edit/[edit]`} as={`/edit/${item.id}`}>
              <a css={css``}>편집</a>
            </Link>
          </button>
          <button
            css={$button}
            id={item.id}
            onClick={(e) => {
              onRequestDeletePost(authResult.token, e.currentTarget.id);
            }}
          >
            삭제
          </button>
        </div>
      </li>
    ));
    return <ul>{lists}</ul>;
  };

  return (
    <div css={$container}>
      <h1>글 관리</h1>
      {data === [''] ? <div>no data</div> : renderMyPosts()}
    </div>
  );
}

export default function connect() {
  const { authResult } = useRootState((state) => state.auth);
  const { posts, loadMyPostsError, requestDeletePostDone } = useRootState((state) => state.post);
  const dispatch = useAppDispatch();

  const onRequestDeletePost = (token: string, id: string) => dispatch(PostActions.requestDeletePost({ token, id }));

  return (
    <Manage data={posts} authResult={authResult} requestDeletePostDone={requestDeletePostDone} onRequestDeletePost={onRequestDeletePost} />
  );
}

const $container = css`
  min-height: 100vh;
`;

const $list = css`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(6, 6, 6, 0.2);
  list-style: none;
`;

const $left = css``;

const $name = css`
  font-size: 1.3rem;
  cursor: pointer;
`;

const $info = css`
  margin-top: 0.3rem;
  font-size: 0.8rem;
`;

const $right = css``;

const $button = (theme: Theme) => css`
  margin: 0.2rem;
  padding: 0.3rem;
  background: none;
  border: 0;
  color: ${theme.color.onBackground};
  cursor: pointer;
`;
