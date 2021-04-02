import PostList from './post-list/PostList';
import { useRootState } from '../../store/store';

export function Main({ data }: any) {
  return (
    <>
      <h1>{'최신'}</h1>
      {data ? <PostList data={data} /> : <div>no data</div>}
    </>
  );
}

export default function connect() {
  const { posts } = useRootState((state) => state.post);

  return <Main data={posts} />;
}
