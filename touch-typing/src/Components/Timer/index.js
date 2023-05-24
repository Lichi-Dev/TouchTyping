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
    } else if (reset == true && !startCounting) {
      setTimeElapsed(totalTime);
    }
    return () => {
      clearInterval(id);
    };
  }, [startCounting]);

  const minutes = (300 - timeElapsed) / 60;
  return (
    <div className="timer-container">
      <p className="time">{timeElapsed}</p>
      <p className="speed">{(correctedWords / minutes || 0).toFixed(2)} WPM</p>

      <p className="accuracy">
        Accuracy:{((correctedWords / totalWords) * 100).toFixed(2) || 0}%
      </p>
    </div>
  );
}

export default Timer;
