import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from '@reduxjs/toolkit';

// slices
import { authSlice } from './auth';
import { postSlice } from './post';

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
        [postSlice.name]: postSlice.reducer,
    })(state, action);
}