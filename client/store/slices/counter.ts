import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Counter = number;

const initialState: Counter = 0;

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    up: (state) => state += 1,
    down: (state) => state -= 1,
    incrementBy: (state, action: PayloadAction<number>) => state + action.payload
  }
})

export const { up, down, incrementBy } = counterSlice.actions;