// src/components/Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, selectCount } from './counterSlice';

import './Counter.css';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className="counter-container">
      <h1>React-Redux Counter App</h1>
      <div className="count-display">
        <h2>Count: {count}</h2>
      </div>
      <div className="buttons">
        <button
          className="button"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="button"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="button"
          onClick={() => dispatch(reset())} // Reset button
        >
          Reset
        </button>
      </div>
    </div>
  );
}
