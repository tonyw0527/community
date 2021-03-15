import { useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { useRootState, useAppDispatch } from '../../store/store';
import * as AuthActions from '../../store/slices/auth';

import { Button, Anchor, Copyright, Popup } from '../common';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('올바르지 않은 이메일 형식입니다.').required('이메일은 필수 항목입니다.'),
  password: Yup.string().required('비밀번호는 필수 항목입니다.'),
  passwordCheck: Yup.string()
    .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 항목입니다.'),
  nickname: Yup.string().min(2, '2자리 이상 입력해주세요.').max(12, '12자리 이하로 입력해주세요.').required('닉네임은 필수 항목입니다.'),
});

interface Values {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

export interface RegisterFormProps {
  registerLoading: boolean;
  registerDone: boolean;
  registerError: string | null;
  onResetRegisterState: () => void;
  onRegister: (email: string, password: string, nickname: string) => void;
}

export function RegisterForm({ registerLoading, registerDone, registerError, onResetRegisterState, onRegister }: RegisterFormProps) {
  const theme = useTheme();

  useEffect(() => {
    if (registerDone) {
      Popup.success('회원가입에 성공하셨습니다!');
      onResetRegisterState();
      Router.push('/login');
    }
    if (registerError) {
      Popup.error(registerError);
    }
  }, [registerDone, registerError]);

  return (
    <Container>
      <H1>회원가입</H1>
      <Formik
        initialValues={{
          email: '',
          password: '',
          passwordCheck: '',
          nickname: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={({ email, password, nickname }: Values, { setSubmitting }: FormikHelpers<Values>) => {
          onRegister(email, password, nickname);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <$Form>
            <FieldBox>
              <Label htmlFor="email">이메일 *</Label>
              <$Field theme={theme} id="email" name="email" type="email" autoComplete="off" />
              <ErrorBox theme={theme}>{errors.email && touched.email ? <div>{errors.email}</div> : null}</ErrorBox>
            </FieldBox>
            <FieldBox>
              <Label htmlFor="password">비밀번호 *</Label>
              <$Field theme={theme} id="password" name="password" type="password" />
              <ErrorBox theme={theme}>{errors.password && touched.password ? <div>{errors.password}</div> : null}</ErrorBox>
            </FieldBox>
            <FieldBox>
              <Label htmlFor="passwordCheck">비밀번호 확인 *</Label>
              <$Field theme={theme} id="passwordCheck" name="passwordCheck" type="password" />
              <ErrorBox theme={theme}>{errors.passwordCheck && touched.passwordCheck ? <div>{errors.passwordCheck}</div> : null}</ErrorBox>
            </FieldBox>
            <FieldBox>
              <Label htmlFor="nickname">닉네임 *</Label>
              <$Field theme={theme} id="nickname" name="nickname" autoComplete="off" />
              <ErrorBox theme={theme}>{errors.nickname && touched.nickname ? <div>{errors.nickname}</div> : null}</ErrorBox>
            </FieldBox>
            <CompleteBtn type="submit" disabled={registerLoading}>
              가입하기
            </CompleteBtn>
            <Link href="/login">
              <A>이미 회원이신가요? 로그인하기</A>
            </Link>
          </$Form>
        )}
      </Formik>
      <Copyright />
    </Container>
  );
}

export default function connect() {
  const { registerLoading, registerDone, registerError } = useRootState((state) => state.auth);
  const dispatch = useAppDispatch();

  const onResetRegisterState = () => {
    dispatch(AuthActions.resetRegisterState());
  };

  const onRegister = (email: string, password: string, nickname: string) => {
    dispatch(AuthActions.register({ email, password, nickname }));
  };

  return (
    <RegisterForm
      registerLoading={registerLoading}
      registerDone={registerDone}
      registerError={registerError}
      onResetRegisterState={onResetRegisterState}
      onRegister={onRegister}
    />
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 769px) {
    height: 100%;
  }
`;

const H1 = styled.h1``;

const $Form = styled(Form)`
  width: 20rem;
  margin-bottom: 2rem;
`;

const FieldBox = styled.div`
  margin-bottom: 2rem;
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
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.error};
`;

const CompleteBtn = styled(Button)`
  display: block;
  width: 100%;
  margin: 1.5rem 0;
`;

const A = styled(Anchor)`
  display: block;
  width: 100%;
  text-align: end;
`;
