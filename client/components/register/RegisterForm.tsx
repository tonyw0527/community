import { useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import * as Mixins from '../../styles/mixins';
import { DefaultButton, DefaultAnchor, Copyright } from '../common';
import { useRootState, useAppDispatch } from '../../store/store';
import * as AuthActions from '../../store/slices/auth';

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

function RegisterForm() {
  const { registerLoading, registerDone, registerError } = useRootState((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (registerDone) {
      alert('회원가입에 성공하셨습니다!');
      dispatch(AuthActions.resetRegisterState());
      Router.push('/login');
    }
    if (registerError) {
      alert(registerError);
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
          dispatch(AuthActions.register({ email, password, nickname }));
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <$Form>
            <FieldBox>
              <Label htmlFor="email">이메일 *</Label>
              <$Field id="email" name="email" type="email" autoComplete="off" />
              <ErrorBox>{errors.email && touched.email ? <div>{errors.email}</div> : null}</ErrorBox>
            </FieldBox>
            <FieldBox>
              <Label htmlFor="password">비밀번호 *</Label>
              <$Field id="password" name="password" type="password" />
              <ErrorBox>{errors.password && touched.password ? <div>{errors.password}</div> : null}</ErrorBox>
            </FieldBox>
            <FieldBox>
              <Label htmlFor="passwordCheck">비밀번호 확인 *</Label>
              <$Field id="passwordCheck" name="passwordCheck" type="password" />
              <ErrorBox>{errors.passwordCheck && touched.passwordCheck ? <div>{errors.passwordCheck}</div> : null}</ErrorBox>
            </FieldBox>
            <FieldBox>
              <Label htmlFor="nickname">닉네임 *</Label>
              <$Field id="nickname" name="nickname" autoComplete="off" />
              <ErrorBox>{errors.nickname && touched.nickname ? <div>{errors.nickname}</div> : null}</ErrorBox>
            </FieldBox>
            <Button type="submit" disabled={registerLoading}>
              가입하기
            </Button>
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

export default RegisterForm;

const Container = styled.div`
  ${Mixins.flex_column_center};
  width: 100vw;
  height: 100vh;
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
  ${Mixins.default_input}
  width: 100%;
  display: block;
  margin-bottom: 0.6rem;
`;

const ErrorBox = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.error};
`;

const Button = styled(DefaultButton)`
  display: block;
  width: 100%;
  margin: 1.5rem 0;
`;

const A = styled(DefaultAnchor)`
  display: block;
  width: 100%;
  text-align: end;
`;
