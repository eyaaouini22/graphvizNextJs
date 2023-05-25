import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface NavbarState {
  selected: string | null
}

const initialState: NavbarState = {
  selected: "Home"
}

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<string>) => {
      state.selected = action.payload
    }
  }
})

export const { setSelected } = navbarSlice.actions

export default navbarSlice.reducer
