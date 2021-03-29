import { useEffect } from 'react';
import Router from 'next/router';
import { wrapper, useRootState, useAppDispatch } from '../store/store';
import * as AuthActions from '../store/slices/auth';
import * as PostActions from '../store/slices/post';
import defaultClient from '../lib/defaultClient';
import MainComponent from '../components/main';
import { Popup, Layout } from '../components/common';

const Main = ({ onToggleTheme }: any) => {
  const { authResult, logoutDone, loadMyInfoError } = useRootState((state) => state.auth);
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

  return (
    <Layout onToggleTheme={onToggleTheme}>
      <MainComponent />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  defaultClient.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (context.req && cookie) {
    defaultClient.defaults.headers.Cookie = cookie;
  }

  await context.store.dispatch(AuthActions.loadMyInfo());
  await context.store.dispatch(PostActions.loadAllPosts());

  return {
    props: {},
  };
});

export default Main;
