import { useEffect } from 'react';
import Router from 'next/router';
import { wrapper, useRootState } from '../store/store';
import * as AuthActions from '../store/slices/auth';
import defaultClient from '../lib/defaultClient';
import MainComponent from '../components/main';

const Main = ({ onToggleTheme }: any) => {
  const { authResult, logoutDone } = useRootState((state) => state.auth);

  useEffect(() => {
    if (!authResult && !logoutDone) {
      alert('로그인이 필요한 페이지입니다.');
      Router.push('/login');
    }
  }, [authResult]);

  return <MainComponent onToggleTheme={onToggleTheme} />;
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

  return {
    props: {},
  };
});

export default Main;
