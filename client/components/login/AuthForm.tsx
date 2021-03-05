import { useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import * as Mixins from '../../styles/mixins';
import { DefaultButton, DefaultAnchor, Copyright } from '../common';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useRootState, useAppDispatch } from '../../store/store';
import * as AuthActions from '../../store/slices/auth';

interface Values {
  email: string;
  password: string;
  isAutoLogin: boolean;
}

function AuthForm() {
  const { loginLoading, loginDone, loginError } = useRootState((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loginDone) {
      dispatch(AuthActions.resetLoginState());
      Router.push('/main');
    }
  }, [loginDone]);

  return (
    <Container>
      <H1>로그인</H1>
      <Formik
        initialValues={{
          email: '',
          password: '',
          isAutoLogin: false,
        }}
        onSubmit={({ email, password, isAutoLogin }: Values, { setSubmitting }: FormikHelpers<Values>) => {
          dispatch(AuthActions.login({ email, password, isAutoLogin }));
        }}
      >
        {({ isSubmitting }) => (
          <$Form>
            <FieldBox>
              <Label htmlFor="email">이메일</Label>
              <$Field type="email" id="email" name="email" />
            </FieldBox>
            <FieldBox>
              <Label htmlFor="password">비밀번호</Label>
              <$Field type="password" id="password" name="password" />
            </FieldBox>
            <FieldBox>
              <Field type="checkbox" id="keep-login" name="isAutoLogin" />
              <label htmlFor="keep-login"> 로그인 유지</label>
            </FieldBox>
            <ErrorBox>{loginError ? loginError : null}</ErrorBox>
            <Button type="submit" disabled={loginLoading}>
              로그인
            </Button>
            <Link href="/register">
              <A>아직 회원이 아니신가요? 회원가입하기</A>
            </Link>
          </$Form>
        )}
      </Formik>
      <Copyright />
    </Container>
  );
}

export default AuthForm;

const Container = styled.div`
  ${Mixins.flex_column_center}
  width: 100vw;
  height: 100vh;
`;

const H1 = styled.h1``;

const $Form = styled(Form)`
  width: 20rem;
  margin-bottom: 2rem;
`;

const FieldBox = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const $Field = styled(Field)`
  ${Mixins.default_input}
  width: 100%;
  display: block;
  margin-bottom: 0.6rem;
`;

const ErrorBox = styled.div`
  height: 0.9rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.color.error};
`;

const Button = styled(DefaultButton)`
  display: block;
  width: 100%;
  margin: 1rem 0 1.5rem 0;
`;

const A = styled(DefaultAnchor)`
  display: block;
  width: 100%;
  text-align: end;
`;
