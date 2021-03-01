import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as AuthAPI from '../../lib/api/auth';

interface AuthResult {
  user: {
    id: string,
    email: string,
    nickname: string,
  },
  token: string,
}

interface Auth {
  email: string,
  password: string,
  sending: boolean,
  authResult: AuthResult | null,
}

const initialState: Auth = {
  email: '',
  password: '',
  sending: false,
  authResult: null
}

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}: AuthAPI.LoginForm, thunkAPI) => {
    const response = await AuthAPI.localLogin({email, password});
    return response.data;
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async ({email, password, nickname}: AuthAPI.RegisterForm, thunkAPI) => {
    const response = await AuthAPI.localRegister({email, password, nickname});
    return response.data;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmailInput: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPasswordInput: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    }
  },
  extraReducers: {
    [login.pending.type]: (state, action) => {
      state.sending = true;
      state.password = '';
    },
    [login.fulfilled.type]: (state, action: PayloadAction<AuthResult>) => {
      state.sending = true;
      state.authResult = action.payload;
    },
    [login.rejected.type]: (state, action) => {
      state.sending = false;
      state.email = '';
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

export const { setEmailInput, setPasswordInput } = authSlice.actions;