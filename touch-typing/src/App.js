import React, { useState } from "react";
import "./App.css";
import { data } from "./Data/data";
import Word from "./Components/Word";
import Timer from "./Components/Timer";

function getCloud() {
  return data.split(" ").sort(() => (Math.random() > 0.5 ? 1 : -1));
}

function App() {
  const [userInput, setUserInput] = useState("");
  const [cloud, setCloud] = useState(getCloud());
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [startCounting, setStartCounting] = useState(false);
  const [totalTime, setTotalTime] = useState(300);
  const [reset, setReset] = useState(false);

  function onClickReset() {
    setReset(true);
    setTotalTime(300);
    setUserInput("");
    setActiveWordIndex(0);
    setCorrectWordArray([]);
    setStartCounting(false);
    setCloud(getCloud());
    setReset(true);
  }

  function processInput(value) {
    if (activeWordIndex === cloud.length) {
      //stop
      return;
    }
    if (!startCounting) {
      setStartCounting(true);
    }
    if (value.endsWith(" ")) {
      // the user has finished this word

      if (activeWordIndex === cloud.length - 1) {
        setStartCounting(false);
        setUserInput("Completed");
      } else {
        setUserInput("");
      }
      setActiveWordIndex((index) => index + 1);

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud[activeWordIndex];
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  }
  return (
    <div className="bg-container">
      <h1 className="header">
        Typing <span className="sub-header">Test</span>
      </h1>

      <p className="word-container">
        {cloud.map((word, index) => {
          return (
            <Word
              text={word}
              active={index === activeWordIndex}
              correct={correctWordArray[index]}
            />
          );
        })}
      </p>
      <input
        type="text"
        value={userInput}
        onChange={(e) => processInput(e.target.value)}
        className="input-box"
        placeholder="Type here..."
      />
      <Timer
        startCounting={startCounting}
        correctedWords={correctWordArray.filter(Boolean).length}
        totalWords={cloud.length}
        totalTime={totalTime}
        reset={reset}
        setReset={setReset}
      />
      <button onClick={onClickReset}>Reset</button>
    </div>
  );
}

export default App;
