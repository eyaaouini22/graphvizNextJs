import { createSlice } from "@reduxjs/toolkit"

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
}

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++
    }
  }
})

export const { increment } = counterSlice.actions

export default counterSlice.reducer
