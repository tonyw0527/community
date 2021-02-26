import { connect, useDispatch, useSelector } from "react-redux";
import { wrapper } from "../store";
import { up, down } from "../lib/slices/counter";
import { RootState } from "../lib/slices";

function Home() {
  const dispatch = useDispatch();
  const counterValue = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      {counterValue}
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
    </div>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({req,res, ...etc})=> {
//   console.log('2. Page.getServerSideProps uses the store to dispatch things');

//   await store.dispatch(loadEmail());
//   await store.dispatch(loadUrl());
//   await store.dispatch(loadLogs());
// })

export default connect((state: any) => state)(Home);
