import styled from 'styled-components';

type DarkModeToggleButtonProps = {
  onToggleTheme: () => void;
};

function DarkModeToggleButton({ onToggleTheme }: DarkModeToggleButtonProps) {
  const handleToggleTheme = () => {
    onToggleTheme();
  };

  return (
    <Container>
      <Wrapper onClick={handleToggleTheme}>
        <Button></Button>
      </Wrapper>
    </Container>
  );
}

export default DarkModeToggleButton;

const Container = styled.div`
  &:hover {
    cursor: pointer;
  }
  padding: 8px 20px;
`;

const Wrapper = styled.div`
  display: flex;
  border-radius: 50px;
`;

const Button = styled.button`
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 20px;
  outline: 0;
  background: url(${({ theme }) => theme.mode_img});

  &:hover {
    cursor: pointer;
  }
`;
