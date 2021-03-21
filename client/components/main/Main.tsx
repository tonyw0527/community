import MainHeader from './MainHeader';
import PostList from '../post/PostList';
import styled from '@emotion/styled';

function Main({ data, onToggleTheme }: any) {
  return (
    <Container>
      <MainHeader onToggleTheme={onToggleTheme} />
      {data ? <PostList data={data} /> : <div>no data</div>}
    </Container>
  );
}

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;
