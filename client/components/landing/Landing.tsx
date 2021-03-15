/** @jsxRuntime classic */
/** @jsx jsx */
import Link from 'next/link';
import { jsx, css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Copyright } from '../common';
import { Button } from '../common';

function Landing() {
  return (
    <Container>
      <div css={ImageBox}></div>
      <SideBox>
        <Title>Community</Title>
        <P>자유로운 커뮤니티에 참여하세요.</P>
        <LinkBox>
          <Link href="/login">
            <a>
              <Button css={loginBtn}>로그인</Button>
            </a>
          </Link>
          <Link href="/register">
            <a>
              <Button>가입하기</Button>
            </a>
          </Link>
        </LinkBox>
        <Copyright />
      </SideBox>
    </Container>
  );
}

export default Landing;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const ImageBox = css`
  width: 60%;
  height: 100%;
  background-image: url('https://source.unsplash.com/random?people');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const SideBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 40%;
  min-width: 30rem;
`;

const Title = styled.h1`
  @media screen and (min-width: 769px) {
    font-size: 3.5rem;
  }
`;

const P = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  @media screen and (min-width: 769px) {
    font-size: 1.6rem;
  }
`;

const LinkBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const loginBtn = (theme: Theme) => css`
  background: ${theme.color.background};
  color: ${theme.color.onBackground};
`;
