import DropdownMenu from "./DropdownMenu";
import styled from "styled-components";

function MainHeader() {
  return (
    <header>
      <Container>
        <DropdownMenu />
      </Container>
    </header>
  );
}

export default MainHeader;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100vw;
  height: 3rem;
  background: rgba(0, 0, 0, 0.3);
`;
