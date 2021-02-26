import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from '@reduxjs/toolkit';

import { counterSlice, Counter } from './counter';

export interface RootState {
  counter: Counter
} 

export const reducer = (state: any = {}, action: any) => {
    if (action.type === HYDRATE) {
        console.log("HYDRATE", action);
        return {
            ...state,
            ...action.payload
        };
    }
    return combineReducers({
        [counterSlice.name]: counterSlice.reducer,
        // [urlSlice.name]: urlSlice.reducer
    })(state, action);
}