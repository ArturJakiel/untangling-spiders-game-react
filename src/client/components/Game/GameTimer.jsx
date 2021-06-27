import React, { useState, useEffect, useRef } from "react";

const GameTimer = ({ stopTimer }) => {
  const [timer, _setTimer] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    let interval;
    if (!stopTimer) {
      interval = setInterval(() => {
        _setTimer(() => timer + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerRef, timer, stopTimer]);

  return (
    <p
      ref={timerRef}
      id="levelTimer"
      className="Game__GameScreen_timer"
      style={{ width: "90px" }}
    >
      <span>{Math.floor((timer / 60000) % 60)}:</span>
      <span>{Math.floor((timer / 1000) % 60)}.</span>
      <span>{(timer / 10) % 100}</span>
    </p>
  );
};

export default GameTimer;
