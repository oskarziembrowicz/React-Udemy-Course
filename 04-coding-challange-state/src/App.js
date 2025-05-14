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

  function handleReset() {
    setStep(1);
    setCount(0);
    // date.setDate(date.getDate() + count);
  }

  return (
    <div>
      <div className="counter">
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <p>{step}</p>
      </div>
      <div className="counter">
        <button
          onClick={() => {
            setCount((c) => c - step);
          }}
        >
          -
        </button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
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
      {(count !== 0 || step !== 1) && (
        <button onClick={handleReset}>Reset</button>
      )}
    </div>
  );
}

export default App;
