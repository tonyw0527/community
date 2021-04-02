import { useEffect } from 'react';
import Router from 'next/router';
import { wrapper, useRootState, useAppDispatch } from '../store/store';
import * as AuthActions from '../store/slices/auth';
import * as PostActions from '../store/slices/post';
import defaultClient from '../lib/defaultClient';
import { Popup, Layout } from '../components/common';
import EditForm from '../components/edit';
import { Post } from '../lib/api/post';

interface PostWithToken extends Post {
  token: string;
}

const New = ({ onToggleTheme }: any) => {
  const { authResult, logoutDone, loadMyInfoError } = useRootState((state) => state.auth);
  const { title, markdown, requestNewPostDone } = useRootState((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!authResult && !logoutDone) {
      Popup.success('로그인이 필요한 페이지입니다.');
      Router.push('/login');
    }
  }, [authResult]);

  useEffect(() => {
    if (loadMyInfoError === '토큰이 만료되었습니다 다시 로그인해 주세요.') {
      Popup.success(loadMyInfoError);
      dispatch(AuthActions.logout());
    }
  }, [loadMyInfoError]);

  const onSetTitle = (title: string) => {
    dispatch(PostActions.setTitle(title));
  };

  const onSetMarkdown = (markdown: string) => {
    dispatch(PostActions.setMarkdown(markdown));
  };

  const onRequestComplete = ({ token, title, markdown, writer }: PostWithToken) => {
    dispatch(PostActions.requestNewPost({ token, title, markdown, writer }));
  };

  return (
    <Layout onToggleTheme={onToggleTheme}>
      <EditForm
        title={title}
        markdown={markdown}
        authResult={authResult}
        onSetMarkdown={onSetMarkdown}
        onSetTitle={onSetTitle}
        onRequestComplete={onRequestComplete}
        requestDone={requestNewPostDone}
      />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  defaultClient.defaults.headers.Cookie = '';

  if (context.req && cookie) {
    defaultClient.defaults.headers.Cookie = cookie;
  }
  await context.store.dispatch(AuthActions.loadMyInfo());

  return {
    props: {},
  };
});

export default New;
