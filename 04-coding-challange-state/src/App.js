import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div>
      <div className="counter">
        <button
          onClick={() => {
            setStep((s) => s - 1);
          }}
        >
          -
        </button>
        <div>Step: {step}</div>
        <button
          onClick={() => {
            setStep((s) => s + 1);
          }}
        >
          +
        </button>
      </div>
      <div className="counter">
        <button
          onClick={() => {
            setCount((c) => c - step);
          }}
        >
          -
        </button>
        <div>Count: {count}</div>
        <button
          onClick={() => {
            setCount((c) => c + step);
          }}
        >
          +
        </button>
      </div>
      <p className="message">{`${
        count === 0
          ? "Today is"
          : count > 0
          ? `${count} days from today is`
          : `${-count} days ago was`
      } ${date.toDateString()}`}</p>
    </div>
  );
}

export default App;
