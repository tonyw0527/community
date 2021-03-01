import { useRootState, useAppDispatch } from "../../store/store";
import * as AuthActions from "../../store/slices/auth";
import styled from "styled-components";
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
      <p>로그인</p>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={onChangeEmail}
          disabled={sending}
        />
        <input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="패스워드를 입력하세요"
        />
        <button type="submit">로그인</button>
      </form>
    </Container>
  );
}

export default AuthForm;

const Container = styled.div``;
