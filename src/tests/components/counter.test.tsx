import "@testing-library/jest-dom"
import { fireEvent, render } from "@testing-library/react"
import React from "react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { Counter } from "~/components"
import { increment } from "~/store/counter-slice"

const mockStore = configureStore([])

describe("Counter component", () => {
  let store: any

  beforeEach(() => {
    store = mockStore({
      counter: {
        value: 0
      }
    })
  })

  it("should render with initial state", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Counter />
      </Provider>
    )

    expect(getByText("Counter value: 0")).toBeInTheDocument()
  })

  it("should dispatch increment action when increment button is clicked", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Counter />
      </Provider>
    )

    fireEvent.click(getByText("Increment"))

    const actions = store.getActions()
    expect(actions).toEqual([increment()])
  })
})
