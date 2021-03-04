import DefaultAnchor from './DefaultAnchor';
import styled from 'styled-components';

function Copyright() {
  return (
    <Container>
      {'Copyright © '}
      <A href="https://tonyw.tistory.com/">Community.com</A> {new Date().getFullYear()}
      {'.'}
    </Container>
  );
}

export default Copyright;

const Container = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.on_background + theme.overlay.medium};
  background: none;
`;

const A = styled(DefaultAnchor)`
  color: ${({ theme }) => theme.color.on_background + theme.overlay.medium};
`;
