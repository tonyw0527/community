import { Layout } from '../../components/common';
import { useRouter } from 'next/router';
import PostComponent from '../../components/post/index';

export default function Post({ onToggleTheme }: any) {
  const router = useRouter();

  return (
    <Layout onToggleTheme={onToggleTheme}>
      <p>Post ID - {router.query.post}</p>
      <PostComponent postid={router.query.post} />
    </Layout>
  );
}
