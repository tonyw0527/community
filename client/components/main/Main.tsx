import MainHeader from "./MainHeader";
import styled from "styled-components";

function Main() {
  return (
    <Container>
      <MainHeader />
    </Container>
  );
}

export default Main;

const Container = styled.div`
  width: 100vw;
`;
