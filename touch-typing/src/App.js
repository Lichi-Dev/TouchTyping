import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { data } from "./Data/data";

const getCloud = () =>
  data.split(" ").sort(() => (Math.random() > 0.5 ? 1 : -1));

function Timer(props) {
  const { correctedWords, startCounting, totalWords } = props;
  const [timeElapsed, setTimeElapsed] = useState(300);
  useEffect(() => {
    if (startCounting) {
      setInterval(() => {
        setTimeElapsed((oldTime) => oldTime - 1);
      }, 1000);
    }
  }, [startCounting]);

  const minutes = (300 - timeElapsed) / 60;
  return (
    <div>
      <p>Time: {timeElapsed}secs</p>
      <p>Speed: {(correctedWords / minutes || 0).toFixed(2)} WPM</p>
      <p>Accuracy:{(correctedWords / totalWords) * 100 || 0}%</p>
    </div>
  );
}

function Word(props) {
  const { text, active, correct } = props;
  if (correct === true) {
    return <span className="correct">{text} </span>;
  }
  if (correct === false) {
    return <span className="incorrect">{text} </span>;
  }
  if (active) {
    return <span className="active">{text} </span>;
  }
  return <span>{text} </span>;
}

Word = React.memo(Word);

function App() {
  const [userInput, setUserInput] = useState("");
  const cloud = useRef(getCloud());
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [startCounting, setStartCounting] = useState(false);

  function processInput(value) {
    if (!startCounting) {
      setStartCounting(true);
    }

    if (value.endsWith(" ")) {
      // the user has finished this word
      setActiveWordIndex((index) => index + 1);
      setUserInput("");

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  }
  return (
    <div>
      <h1>Typing Test</h1>
      <Timer
        startCounting={startCounting}
        correctedWords={correctWordArray.filter(Boolean).length}
        totalWords={cloud.current.length}
      />
      <p>
        {cloud.current.map((word, index) => {
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
      />
    </div>
  );
}

export default App;
