import { useEffect, useState } from "react";
import "./index.css";

function Timer(props) {
  const { correctedWords, startCounting, totalWords, totalTime, reset } = props;
  const [timeElapsed, setTimeElapsed] = useState(totalTime);
  useEffect(() => {
    let id;
    if (startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime - 1);
      }, 1000);
    } else if (reset && !startCounting) {
      setTimeElapsed(totalTime);
      clearInterval(id);
    }
    return () => {
      clearInterval(id);
    };
  }, [startCounting, reset]);

  const minutes = (300 - timeElapsed) / 60;
  console.log(correctedWords);
  return (
    <div className="timer-container">
      <p className="time">{timeElapsed}</p>
      <p className="accuracy">
        Accuracy:{((correctedWords / totalWords) * 100).toFixed(0) || 0}%
      </p>
      <p className="speed">{(correctedWords / minutes || 0).toFixed(0)} WPM</p>
    </div>
  );
}

export default Timer;
