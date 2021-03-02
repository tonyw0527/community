import Link from "next/link";
import { useRootState, useAppDispatch } from "../../store/store";
import * as AuthActions from "../../store/slices/auth";
import styled, { css } from "styled-components";
import { ChangeEvent } from "react";

function AuthForm() {
  const { email, sending, password } = useRootState((state) => state.auth);
  const dispatch = useAppDispatch();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(AuthActions.setEmailInput(e.target.value));
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(AuthActions.setPasswordInput(e.target.value));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(AuthActions.login({ email, password }));
  };

  return (
    <Container>
      <H1>로그인</H1>
      <Form onSubmit={onSubmit}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
          disabled={sending}
          required
        />
        <Input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
          required
        />
        <Button type="submit">로그인</Button>
      </Form>
      <div>
        <span>아직 회원이 아니신가요? </span>
        <Link href="/register">
          <A>회원가입</A>
        </Link>
      </div>
    </Container>
  );
}

export default AuthForm;

const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  ${flexColumnCenter}
  width: 100vw;
  height: 100vh;
`;

const H1 = styled.h1``;

const Form = styled.form`
  ${flexColumnCenter}
  width: 30rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 1rem;
  padding: 0.6rem 0.6rem;
  width: 60%;
  border-radius: 0.5rem;
  border: 0;
  outline: 0;
  &:focus {
    background: rgb(194, 194, 194);
  }
`;

const Button = styled.button`
  display: block;
  width: 60%;
  padding: 0.6rem 0.6rem;
  border-radius: 0.5rem;
  border: 0;
  color: ${({ theme }) => theme.color.text};
  background: #8739f9;
  &:hover {
    cursor: pointer;
    background: #9b6dff;
  }
`;

const A = styled.a`
  color: #9b6dff;
  &:hover {
    cursor: pointer;
  }
`;
