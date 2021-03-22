import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as UserAPI from '../../lib/api/user';

interface Editor {
  markdown: string;
}

const initialState: Editor = {
  markdown: '~~~ts',
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setMarkdown: (state, action: PayloadAction<string>) => {
      state.markdown = action.payload;
    }
  },
  extraReducers: {

  }
})

export const { setMarkdown } = editorSlice.actions;