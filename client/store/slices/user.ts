import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as UserAPI from '../../lib/api/user';

interface User {

}

const initialState: User = {

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: {

  }
})

export const {  } = userSlice.actions;