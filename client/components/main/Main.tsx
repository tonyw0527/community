import PostList from './post-list/PostList';
import { useRootState } from '../../store/store';

export function Main({ data }: any) {
  return <>{data ? <PostList data={data} /> : <div>no data</div>}</>;
}

export default function connect() {
  const { posts } = useRootState((state) => state.post);

  return <Main data={posts} />;
}
