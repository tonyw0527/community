import { GetServerSideProps } from 'next';
import { Layout } from '../../components/common';
import PostComponent from '../../components/post/index';
import { wrapper } from '../../store/store';
import * as PostActions from '../../store/slices/post';

export default function Post({ onToggleTheme }: any) {
  return (
    <Layout onToggleTheme={onToggleTheme}>
      <PostComponent />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
  // you also have access to the param postId from the context
  const postId: string = context.params!.post as string;

  if (postId) {
    await context.store.dispatch(PostActions.loadOnePost(postId));
  }

  // query the data based on the postId and return as props
  return {
    props: {},
  };
});
