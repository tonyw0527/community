import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from '@reduxjs/toolkit';

// slices
import { counterSlice } from './counter';

// root reducer
export const rootReducer = (state: any = {}, action: any) => {
    if (action.type === HYDRATE) {
        console.log("HYDRATE", action);
        return {
            ...state,
            ...action.payload
        };
    }
    return combineReducers({
        [counterSlice.name]: counterSlice.reducer,
     // [anotherSlice.name]: anotherSlice.reducer
    })(state, action);
}