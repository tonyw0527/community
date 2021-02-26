import { createSlice } from '@reduxjs/toolkit'

export interface Counter {
  value: number;
}

const initialState: Counter = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    up: (state) => {
      state.value += 1;
    },
    down: (state) => {
      state.value -= 1;
    }
  }
})

export const { up, down } = counterSlice.actions;