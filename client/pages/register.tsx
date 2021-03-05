import { useEffect } from 'react';
import Router from 'next/router';
import { wrapper, useRootState } from '../store/store';
import * as AuthActions from '../store/slices/auth';
import defaultClient from '../lib/defaultClient';
import RegisterComponent from '../components/register';

const Register = () => {
  const { authResult } = useRootState((state) => state.auth);

  useEffect(() => {
    if (authResult) {
      Router.push('/main');
    }
  }, [authResult]);

  return <RegisterComponent />;
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

export default Register;
