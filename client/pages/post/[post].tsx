import { GetServerSideProps } from 'next';
import { Layout } from '../../components/common';
import { useRouter } from 'next/router';
import PostComponent from '../../components/post/index';
import { wrapper } from '../../store/store';
import * as PostActions from '../../store/slices/post';

export default function Post({ postid, onToggleTheme }: any) {
  const router = useRouter();

  return (
    <Layout onToggleTheme={onToggleTheme}>
      <p>Post ID from useRouter - {router.query.post}</p>
      <p>Post ID from getStaticProps - {postid}</p>
      <PostComponent />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
  // you also have access to the param postId from the context
  const postid: string = context.params!.post as string;

  if (postid) {
    await context.store.dispatch(PostActions.loadOnePost(postid));
  }

  // query the data based on the postId and return as props
  return {
    props: {
      postid,
    },
  };
});
