import { wrapper } from "../store/store";
import { useRootState, useAppDispatch } from "../store/store";
import { up, down, incrementBy } from "../store/slices/counter";

function Home() {
  const dispatch = useAppDispatch();
  const counter = useRootState((state) => state.counter);

  return (
    <div>
      {counter}
      <button
        onClick={(e) => {
          dispatch(up());
        }}
      >
        up
      </button>
      <button
        onClick={(e) => {
          dispatch(down());
        }}
      >
        down
      </button>
      <button
        onClick={(e) => {
          dispatch(incrementBy(3));
        }}
      >
        increment by 3
      </button>
    </div>
  );
}

// 예시
// export const getServerSideProps = wrapper.getServerSideProps(store => async ({req,res, ...etc})=> {
//   console.log('2. Page.getServerSideProps uses the store to dispatch things');

//   await store.dispatch(loadEmail());
//   await store.dispatch(loadUrl());
//   await store.dispatch(loadLogs());
// })

export default Home;

// redux hooks 쓰기전 방법
// export default connect((state: any) => state)(Home);
