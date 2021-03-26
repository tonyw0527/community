import React, { useEffect } from 'react';
import Router from 'next/router';
import { useRootState, useAppDispatch } from '../../store/store';
import * as PostActions from '../../store/slices/post';

function Manage({ data, authResult, requestDeletePostDone, onRequestDeletePost }: any) {
  useEffect(() => {
    if (requestDeletePostDone) {
      Router.reload();
    }
  }, [requestDeletePostDone]);

  const renderMyPosts = () => {
    const lists = data.map((item: any, index: any) => (
      <li key={'mypost' + index}>
        <span>{item.title}</span>
        <button
          id={item.id}
          onClick={(e) => {
            alert(e.currentTarget.id);
          }}
        >
          편집
        </button>
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
