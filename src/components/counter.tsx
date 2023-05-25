import Button from "./button"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "~/store"
import { increment } from "~/store/counter-slice"

const Counter: React.FC = () => {
  const dispatch = useDispatch()
  const counterValue = useSelector((state: RootState) => state.counter.value)

  return (
    <div>
      <p>Counter value: {counterValue}</p>
      <Button onClick={() => dispatch(increment())} text="Increment" />
    </div>
  )
}

export default Counter
