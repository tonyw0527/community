import Link from 'next/link';
import styled from 'styled-components';
import * as Mixins from '../../styles/mixins';
import { DefaultButton, Copyright } from '../common';

function Landing() {
  return (
    <Container>
      <ImageBox></ImageBox>
      <SideBox>
        <Title>Community</Title>
        <P>자유로운 커뮤니티에 참여하세요.</P>
        <LinkBox>
          <Link href="/login">
            <a>
              <LoginBtn>로그인</LoginBtn>
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

const ImageBox = styled.div`
  width: 60%;
  height: 100%;
  background-image: url('https://source.unsplash.com/random?people');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const SideBox = styled.div`
  ${Mixins.flex_column_center}
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

const Button = styled(DefaultButton)`
  width: 10rem;
  margin: 1rem 0.5rem;
  @media screen and (min-width: 769px) {
    font-size: 1.3rem;
  }
`;

const LoginBtn = styled(Button)`
  border: 1px solid ${({ theme }) => theme.color.secondary_variant};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.secondary_variant};
  &:hover {
    background: ${({ theme }) => (theme.mode === 'light' ? 'rgba(0,0,0,0.03)' : '#262626')};
  }
`;
