import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux'
import { createWrapper } from "next-redux-wrapper";
import { rootReducer } from './slices'

const initStore = (context: any) => configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware()
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ReturnType<typeof initStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();

type StateSelector<T> = (state: RootState) => T;
type EqualityFn<T> = (left: T, right: T) => boolean;

export function useRootState<T>(selector: StateSelector<T>, equalityFn?: EqualityFn<T>) {
  return useSelector(selector, equalityFn);
}

export const wrapper = createWrapper(initStore, {
  debug: process.env.NODE_ENV !== 'production',
});