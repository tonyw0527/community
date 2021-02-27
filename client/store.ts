import { configureStore, EnhancedStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from 'react-redux'
import { rootReducer } from './lib/slices'

const initStore = (context: any) => configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware()
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ReturnType<typeof initStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper(initStore, {
  debug: process.env.NODE_ENV !== 'production',
});