import DropdownMenu from './DropdownMenu';
import styled from 'styled-components';

function MainHeader({ onToggleTheme }: any) {
  return (
    <header>
      <Container>
        <RightSideBox>
          <DropdownMenu onToggleTheme={onToggleTheme} />
        </RightSideBox>
      </Container>
    </header>
  );
}

export default MainHeader;

const Container = styled.div`
  width: 100vw;
  height: 3rem;
  background: ${({ theme }) => theme.color.primary};
`;

const RightSideBox = styled.div`
  position: absolute;
  top: 0.7rem;
  right: 1rem;
`;
