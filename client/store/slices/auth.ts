import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as AuthAPI from '../../lib/api/auth';

interface AuthResult {
  user: {
    id: string,
    email: string,
    nickname: string,
    provider: string,
    createdAt: string
  }
}

interface Auth {
  sending: boolean,
  authResult: AuthResult | null,
}

const initialState: Auth = {
  sending: false,
  authResult: null
}

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password, isAutoLogin}: AuthAPI.LoginForm, thunkAPI) => {
    const response = await AuthAPI.login({ email, password, isAutoLogin });
    return response.data;
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async ({email, password, nickname}: AuthAPI.RegisterForm, thunkAPI) => {
    const response = await AuthAPI.register({email, password, nickname});
    return response.data;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setEmailInput: (state, action: PayloadAction<string>) => {
    //   state.email = action.payload;
    // },
    // setPasswordInput: (state, action: PayloadAction<string>) => {
    //   state.password = action.payload;
    // }
  },
  extraReducers: {
    [login.pending.type]: (state, action) => {
      state.sending = true;
    },
    [login.fulfilled.type]: (state, action: PayloadAction<AuthResult>) => {
      state.sending = true;
      state.authResult = action.payload;
    },
    [login.rejected.type]: (state, action) => {
      state.sending = false;
      state.authResult = null;
    },
    [register.pending.type]: (state, action) => {
    },
    [register.fulfilled.type]: (state, action: PayloadAction<AuthResult>) => {
      state.authResult = action.payload;
    },
    [register.rejected.type]: (state, action) => {
      state.authResult = null;
    },
  }
})

// export const { setEmailInput, setPasswordInput } = authSlice.actions;