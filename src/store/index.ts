import counterSlice, { CounterState } from "./counter-slice"
import navbarSlice, { NavbarState } from "./navbar-slice"
import { configureStore } from "@reduxjs/toolkit"

export interface RootState {
  navbar: NavbarState
  counter: CounterState
}
const store = configureStore({
  reducer: {
    navbar: navbarSlice,
    counter: counterSlice
  }
})

export default store
