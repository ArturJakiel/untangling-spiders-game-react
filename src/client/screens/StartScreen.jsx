import React, { useContext } from "react";

import { appRunningStatusContext } from "../provider/gameStatus";

const StartScreen = () => {
  const StartGameButton = useContext(appRunningStatusContext);

  return (
    <div className="Game__container Game__startScreen">
      <h1 className="Game__startScreen__title">Untangling Spiders</h1>
      <button onClick={StartGameButton.startGame} className="button">
        start Game
      </button>
    </div>
  );
};

export default StartScreen;
