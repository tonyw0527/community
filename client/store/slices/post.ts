import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as PostAPI from '../../lib/api/post';

interface Snippet {
  title: string;
  markdown: string;
  writer: string;
  slug: string;
  createdAt: Date;
}

interface Post {
  posts: Array<Snippet>;

  title: string;
  markdown: string;

  loadAllPostsLoading: boolean;
  loadAllPostsDone: boolean;
  loadAllPostsError: string | null;

  loadMyPostsLoading: boolean;
  loadMyPostsDone: boolean;
  loadMyPostsError: string | null;

  requestNewPostLoading: boolean;
  requestNewPostDone: boolean;
  requestNewPostError: string | null;

  requestDeletePostLoading: boolean;
  requestDeletePostDone: boolean;
  requestDeletePostError: string | null;
}

const initialState: Post = {
  posts: [],

  title: '',
  markdown: '~~~ts',

  loadAllPostsLoading: false,
  loadAllPostsDone: false,
  loadAllPostsError: null,

  loadMyPostsLoading: false,
  loadMyPostsDone: false,
  loadMyPostsError: null,

  requestNewPostLoading: false,
  requestNewPostDone: false,
  requestNewPostError: null,

  requestDeletePostLoading: false,
  requestDeletePostDone: false,
  requestDeletePostError: null,
}

export const loadAllPosts = createAsyncThunk(
  'post/loadAllPosts',
  async (token: string | undefined, thunkAPI) => {
    try {
      const response = await PostAPI.loadAllPosts(token);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

export const loadMyPosts = createAsyncThunk(
  'post/loadMyPosts',
  async (token: string, thunkAPI) => {
    try {
      const response = await PostAPI.loadMyPosts(token);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

interface PostWithToken extends PostAPI.Post {
  token: string;
}

export const requestNewPost = createAsyncThunk(
  'post/requestNewPost',
  async ({ token, title, markdown, writer }: PostWithToken, thunkAPI) => {
    try {
      const response = await PostAPI.requestNewPost(token, { title, markdown, writer });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

export const requestDeletePost = createAsyncThunk(
  'post/requestDeletePost',
  async ({ token, id }: any, thunkAPI) => {
    try {
      const response = await PostAPI.requestDeletePost(token, id);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setMarkdown: (state, action: PayloadAction<string>) => {
      state.markdown = action.payload;
    },
  },
  extraReducers: {
    // loadAllPosts
    [loadAllPosts.pending.type]: (state) => {
      state.loadAllPostsLoading = true;
      state.loadAllPostsDone = false;
      state.loadAllPostsError = null;
    },
    [loadAllPosts.fulfilled.type]: (state, action: PayloadAction<Array<Snippet>>) => {
      state.posts = action.payload;
      state.loadAllPostsLoading = false;
      state.loadAllPostsDone = true;
    },
    [loadAllPosts.rejected.type]: (state, action: PayloadAction<string|null>) => {
      state.loadAllPostsLoading = false;
      state.loadAllPostsError = action.payload;
    },
     // loadMyPosts
     [loadMyPosts.pending.type]: (state) => {
      state.loadMyPostsLoading = true;
      state.loadMyPostsDone = false;
      state.loadMyPostsError = null;
    },
    [loadMyPosts.fulfilled.type]: (state, action: PayloadAction<Array<Snippet>>) => {
      state.posts = action.payload;
      state.loadMyPostsLoading = false;
      state.loadMyPostsDone = true;
    },
    [loadMyPosts.rejected.type]: (state, action: PayloadAction<string|null>) => {
      state.loadMyPostsLoading = false;
      state.loadMyPostsError = action.payload;
    },
    // requestNewPost
    [requestNewPost.pending.type]: (state) => {
      state.requestNewPostLoading = true;
      state.requestNewPostDone = false;
      state.requestNewPostError = null;
    },
    [requestNewPost.fulfilled.type]: (state) => {
      state.requestNewPostLoading = false;
      state.requestNewPostDone = true;
    },
    [requestNewPost.rejected.type]: (state, action: PayloadAction<string|null>) => {
      state.requestNewPostLoading = false;
      state.requestNewPostError = action.payload;
    },
    // requesDeletePost
    [requestDeletePost.pending.type]: (state) => {
      state.requestDeletePostLoading = true;
      state.requestDeletePostDone = false;
      state.requestDeletePostError = null;
    },
    [requestDeletePost.fulfilled.type]: (state) => {
      state.requestDeletePostLoading = false;
      state.requestDeletePostDone = true;
    },
    [requestDeletePost.rejected.type]: (state, action: PayloadAction<string|null>) => {
      state.requestDeletePostLoading = false;
      state.requestDeletePostError = action.payload;
    },
  }
})

export const { setTitle, setMarkdown } = postSlice.actions;