import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as AuthAPI from '../../lib/api/auth';

interface AuthResult {
  me: {
    id: string,
    email: string,
    nickname: string,
    createdAt: string
  },
  token: string
}

interface Auth {
  authResult: AuthResult | null,

  registerLoading: boolean,
  registerDone: boolean,
  registerError: string | null,

  loginLoading: boolean,
  loginDone: boolean,
  loginError: string | null,

  loadMyInfoLoading: boolean,
  loadMyInfoDone: boolean,
  loadMyInfoError: string | null,

  logoutLoading: boolean,
  logoutDone: boolean,
  logoutError: string | null,
}

const initialState: Auth = {
  authResult: null,

  registerLoading: false,
  registerDone: false,
  registerError: null,

  loginLoading: false,
  loginDone: false,
  loginError: null,

  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,

  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
}

export const register = createAsyncThunk(
  'auth/register',
  async ({email, password, nickname}: AuthAPI.RegisterForm, thunkAPI) => {
    try {
      const response = await AuthAPI.register({ email, password, nickname });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password, isAutoLogin}: AuthAPI.LoginForm, thunkAPI) => {
    try {
      const response = await AuthAPI.login({ email, password, isAutoLogin });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

export const loadMyInfo = createAsyncThunk(
  'auth/loadMyInfo',
  async (token: string | undefined, thunkAPI) => {
    try {
      const response = await AuthAPI.loadMyInfo(token);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (undefined, thunkAPI) => {
    try {
      const response = await AuthAPI.logout();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.loginLoading = false;
      state.loginDone = false;
      state.loginError = null;
    },
    resetRegisterState: (state) => {
      state.registerLoading = false;
      state.registerDone = false;
      state.registerError = null;
    },
  },
  extraReducers: {
    // register
    [register.pending.type]: (state) => {
      state.registerLoading = true;
      state.registerDone = false;
      state.registerError = null;
    },
    [register.fulfilled.type]: (state) => {
      state.registerLoading = false;
      state.registerDone = true;
    },
    [register.rejected.type]: (state, action: PayloadAction<string|null>) => {
      state.registerLoading = false;
      state.registerError = action.payload;
    },
    // login
    [login.pending.type]: (state) => {
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = null;
    },
    [login.fulfilled.type]: (state, action: PayloadAction<AuthResult>) => {
      state.loginLoading = false;
      state.authResult = action.payload;
      state.loginDone = true;
    },
    [login.rejected.type]: (state, action: PayloadAction<string|null>) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    // loadMyInfo
    [loadMyInfo.pending.type]: (state) => {
      state.loadMyInfoLoading = true;
      state.loadMyInfoDone = false;
      state.loadMyInfoError = null;
    },
    [loadMyInfo.fulfilled.type]: (state, action: PayloadAction<AuthResult>) => {
      state.loadMyInfoLoading = false;
      state.authResult = action.payload;
      state.loadMyInfoDone = true;
    },
    [loadMyInfo.rejected.type]: (state, action: PayloadAction<string|null>) => {
      state.loadMyInfoLoading = false;
      state.loadMyInfoError = action.payload;
    },
    // logout
    [logout.pending.type]: (state) => {
      state.logoutLoading = true;
      state.logoutDone = false;
      state.logoutError = null;
    },
    [logout.fulfilled.type]: (state) => {
      state.logoutLoading = false;
      state.logoutDone = true;
      state.authResult = null;
    },
    [logout.rejected.type]: (state, action: PayloadAction<string|null>) => {
      state.logoutLoading = false;
      state.logoutError = action.payload;
    },
  }
})

export const { resetLoginState, resetRegisterState } = authSlice.actions;