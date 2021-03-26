import MainHeader from './MainHeader';
import PostList from '../post/PostList';
import styled from '@emotion/styled';
import { useRootState } from '../../store/store';

export function Main({ data, onToggleTheme }: any) {
  return (
    <Container>
      <MainHeader onToggleTheme={onToggleTheme} />
      {data ? <PostList data={data} /> : <div>no data</div>}
    </Container>
  );
}

export default function connect({ onToggleTheme }: any) {
  const { posts } = useRootState((state) => state.post);

  return <Main data={posts} onToggleTheme={onToggleTheme} />;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;
