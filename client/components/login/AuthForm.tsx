import { useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Anchor, Copyright } from '../common';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useRootState, useAppDispatch } from '../../store/store';
import * as AuthActions from '../../store/slices/auth';

interface Values {
  email: string;
  password: string;
  isAutoLogin: boolean;
}

export interface AuthFormProps {
  loginLoading: boolean;
  loginDone: boolean;
  loginError: string | null;
  onResetLoginState: () => void;
  onLogin: (email: string, password: string, isAutoLogin: boolean) => void;
}

export function AuthForm({ loginLoading, loginDone, loginError, onResetLoginState, onLogin }: AuthFormProps) {
  const theme = useTheme();

  useEffect(() => {
    if (loginDone) {
      onResetLoginState();
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
          onLogin(email, password, isAutoLogin);
        }}
      >
        {({ isSubmitting }) => (
          <$Form>
            <FieldBox>
              <Label htmlFor="email">이메일</Label>
              <$Field theme={theme} type="email" id="email" name="email" />
            </FieldBox>
            <FieldBox>
              <Label htmlFor="password">비밀번호</Label>
              <$Field theme={theme} type="password" id="password" name="password" />
            </FieldBox>
            <FieldBox>
              <Field type="checkbox" id="keep-login" name="isAutoLogin" />
              <label htmlFor="keep-login"> 로그인 유지</label>
            </FieldBox>
            <ErrorBox theme={theme}>{loginError ? loginError : null}</ErrorBox>
            <LoginBtn type="submit" disabled={loginLoading}>
              로그인
            </LoginBtn>
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

export default function Connect() {
  const { loginLoading, loginDone, loginError } = useRootState((state) => state.auth);
  const dispatch = useAppDispatch();

  const onResetLoginState = () => {
    dispatch(AuthActions.resetLoginState());
  };

  const onLogin = (email: string, password: string, isAutoLogin: boolean) => {
    dispatch(AuthActions.login({ email, password, isAutoLogin }));
  };

  return (
    <AuthForm
      loginLoading={loginLoading}
      loginDone={loginDone}
      loginError={loginError}
      onResetLoginState={onResetLoginState}
      onLogin={onLogin}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  /* height: 100vh; */
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
  width: 100%;
  display: block;
  margin-bottom: 0.6rem;

  padding: 1.1rem 0.9rem;

  border-radius: 0.3rem;
  border: 1px solid gray;

  outline: 0;

  background: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.onBackground};

  &:hover {
    border: 1px solid ${({ theme }) => (theme.mode === 'light' ? '#63C5DA' : 'white')};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.secondaryVariant};
    background: ${({ theme }) => theme.color.background};
  }
`;

const ErrorBox = styled.div`
  height: 0.9rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.color.error};
`;

const LoginBtn = styled(Button)`
  display: block;
  width: 100%;
  margin: 1rem 0 1.5rem 0;
`;

const A = styled(Anchor)`
  display: block;
  width: 100%;
  text-align: end;
`;
