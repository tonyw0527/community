import MainHeader from './MainHeader';
import styled from 'styled-components';

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
