import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from '@reduxjs/toolkit';

// slices
import { authSlice } from './auth';
import { userSlice } from './user';
import { editorSlice } from './editor';

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
        [authSlice.name]: authSlice.reducer,
        [userSlice.name]: userSlice.reducer,
        [editorSlice.name]: editorSlice.reducer,
    })(state, action);
}