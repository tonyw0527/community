import Link from "next/link";
import styled, { css } from "styled-components";

function Landing() {
  return (
    <Container>
      <p>자유로운 커뮤니티에 참여하세요.</p>
      <Link href="/register">
        <A>가입하기</A>
      </Link>
      <Link href="/login">
        <A>로그인</A>
      </Link>
    </Container>
  );
}

export default Landing;

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

const A = styled.a`
  display: block;
  width: 60%;
  margin: 0.7rem;
  padding: 0.6rem 0.6rem;
  border-radius: 0.5rem;
  border: 0;
  text-align: center;
  color: ${({ theme }) => theme.color.text};
  background: #8739f9;
  &:hover {
    cursor: pointer;
    background: #9b6dff;
  }
`;
