import MainHeader from './MainHeader';
import styled from '@emotion/styled';

function Main({ onToggleTheme }: any) {
  return (
    <Container>
      <MainHeader onToggleTheme={onToggleTheme} />
    </Container>
  );
}

export default Main;

const Container = styled.div`
  width: 100vw;
`;
