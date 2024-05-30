import React from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './redux/counter/counterSlice'

import Signup from './components/SignUp/Signup'
import Navbar from './components/Navbar/Navbar'

function App() {
  
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      {/* <Navbar/>  */}
      <Signup/>
      {/* <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div> */}
    </>
  )
}

export default App
