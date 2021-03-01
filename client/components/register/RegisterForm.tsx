import Link from "next/link";
import { useAppDispatch } from "../../store/store";
import * as AuthActions from "../../store/slices/auth";
import styled, { css } from "styled-components";
import { useState } from "react";

function RegisterForm() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e: any) => {
    setPasswordConfirm(e.target.value);
  };

  const onBlurPasswordCheck = (e: any) => {
    setTimeout(() => {
      checkPasswordConfrim(password, passwordConfirm);
    }, 10);
  };

  const onChangeNickname = (e: any) => {
    setNickname(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const result = checkForm(email, password, passwordConfirm, nickname);
    if (result !== "pass") {
      alert(result);
      return;
    }
    dispatch(AuthActions.register({ email, password, nickname }));
  };

  return (
    <Container>
      <H1>회원가입</H1>
      <Form onSubmit={onSubmit}>
        <Input
          type="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
          required
        />
        <Input
          type="password"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
          onBlur={onBlurPasswordCheck}
          placeholder="비밀번호 확인"
          required
        />
        <Input
          type="text"
          value={nickname}
          onChange={onChangeNickname}
          placeholder="닉네임"
          required
        />
        <Button type="submit">완료</Button>
      </Form>
      <div>
        <span>이미 가입하셨나요? </span>
        <Link href="/">
          <A>로그인</A>
        </Link>
      </div>
    </Container>
  );
}

const checkPasswordConfrim = (password: string, passwordConfirm: string) => {
  if (password !== passwordConfirm) {
    console.log("패스워드 불일치");
    return false;
  } else {
    console.log("패스워드 일치");
    return true;
  }
};

const checkForm = (
  email: string,
  password: string,
  passwordConfirm: string,
  nickname: string
) => {
  if (email === "") return "이메일을 입력해주세요";
  if (password === "") return "비밀번호를 입력해주세요";
  if (!checkPasswordConfrim(password, passwordConfirm))
    return "비밀번호를 다시 확인해주세요";
  if (nickname === "") return "닉네임을 입력해주세요";
  return "pass";
};

export default RegisterForm;

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
