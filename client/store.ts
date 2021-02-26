import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createWrapper} from "next-redux-wrapper";
import {reducer} from './lib/slices'

const makeStore = (context: any) => configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware()
});

export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production',
});