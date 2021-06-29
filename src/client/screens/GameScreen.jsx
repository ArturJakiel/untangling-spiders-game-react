import React, { useContext, useState, useRef, useEffect } from "react";

import { appRunningStatusContext, appLevelTimeContext } from "../provider/gameStatus";

import GameTimer from "../components/Game/GameTimer";
import GamePlayArea from "../components/Game/GamePlayArea";

const generateSpiders = (level, gameArea) => {
  const spiderCount = level < 6 ? 5 : level;
  const ScreenSize = {
    clientHeight: gameArea.current.clientHeight,
    clientWidth: gameArea.current.clientWidth,
  };
  const spiderData = [];

  const gridX = ScreenSize.clientWidth - 100;
  const gridY = ScreenSize.clientHeight - 150;

  for (let i = 0; i < spiderCount; i++) {
    const currX = Math.floor(Math.random() * gridX) + 40;
    const currY = Math.floor(Math.random() * gridY) + 100;

    if (i < Math.floor(spiderCount / 3) + 1) {
      spiderData.push({
        id: `S${i}`,
        position: { x: currX, y: currY },
        connections: [`S${(i + 2) % spiderCount}`, `S${(i + 3) % spiderCount}`],
      });
    } else {
      spiderData.push({
        id: `S${i}`,
        position: { x: currX, y: currY },
        connections: [`S${(i + 1) % spiderCount}`],
      });
    }
  }

  return spiderData;
};

const GameScreen = () => {
  const StartGameButton = useContext(appRunningStatusContext);
  const levelTimeData = useContext(appLevelTimeContext);

  const [complete, _setComplete] = useState(false);
  const [level, _setLevel] = useState(1);
  const [spidersCount, _setSpidersCount] = useState(3); // TODO: no set yet
  const gameArea = useRef();
  const [spiderLevelData, _setSpiderLevelData] = useState([]);
  const [, _setRestart] = React.useState();
  const restart = React.useCallback(() => _setRestart({}), []);

  useEffect(() => {
    const spiderArrayData = generateSpiders(level, gameArea);
    _setSpiderLevelData(spiderArrayData);
    _setSpidersCount(spiderArrayData.length);
  }, [level, gameArea]);

  const winGame = () => {
    _setComplete(true);
    levelTimeData.setLevelTimeScore(window.levelTimer.textContent);
  };

  const setNextLevel = () => {
    _setLevel(level + 1);
  };

  const GoToNextLevel = () => {
    setNextLevel();
    _setSpiderLevelData(generateSpiders(level, gameArea));
    _setComplete(false);
  };

  const PlayScreen = () => {
    return (
      <>
        <section className="Game__GameScreen__upperHud">
          <GameTimer stopTimer={complete} />
          <p>Level: {level}</p>
          <p>Spiders: {spidersCount}</p>
        </section>
        <GamePlayArea
          forwardedRef={gameArea}
          TESTwinGame={winGame}
          spiderDataArray={spiderLevelData}
        />
        <section className="Game__GameScreen__lowerHud">
          <button onClick={StartGameButton.startGame} className="button button__icon ">
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M28.75 4.25L0 25.1875L28.75 45.75V33.25H50V16.75H28.75V4.25Z"
                fill="white"
              />
            </svg>
          </button>
          <button onClick={restart} className="button">
            Restart
          </button>
        </section>
      </>
    );
  };

  const WinScreen = () => {
    return (
      <section className="Game__GameScreen__WinScreen">
        <div>
          <h3>Congratulation</h3>
          <p>Your time: {levelTimeData.levelTime}</p>
        </div>
        <button onClick={GoToNextLevel} className="button">
          Next Level
        </button>
        <button onClick={StartGameButton.startGame} className="button">
          Return To main menu
        </button>
      </section>
    );
  };

  return (
    <div className="Game__container">
      <PlayScreen />
      {complete && <WinScreen />}
    </div>
  );
};

export default GameScreen;
