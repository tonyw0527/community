import MainHeader from './MainHeader';
import PostList from '../post/PostList';
import styled from '@emotion/styled';

function Main({ data, onToggleTheme }: any) {
  return (
    <Container>
      <MainHeader onToggleTheme={onToggleTheme} />
      <PostList data={data} />
    </Container>
  );
}

export default Main;

const Container = styled.div`
  width: 100vw;
`;
