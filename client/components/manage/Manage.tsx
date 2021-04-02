import React, { useEffect } from 'react';
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
      <li key={'mypost' + index}>
        <Link href={`/post/[post]`} as={`/post/${item.id}`}>
          <a>{item.title}</a>
        </Link>{' '}
        <Link href={`/edit/[edit]`} as={`/edit/${item.id}`}>
          <a>편집</a>
        </Link>
        <button
          id={item.id}
          onClick={(e) => {
            onRequestDeletePost(authResult.token, e.currentTarget.id);
          }}
        >
          삭제
        </button>
      </li>
    ));
    return <ul>{lists}</ul>;
  };

  return (
    <div>
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
