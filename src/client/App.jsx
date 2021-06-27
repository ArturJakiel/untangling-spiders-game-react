import React, { useContext } from "react";

import GameScreen from "./screens/GameScreen";
import StartScreen from "./screens/StartScreen";

import { appRunningStatusContext } from "./provider/gameStatus";

const App = () => {
  const appRunningStatus = useContext(appRunningStatusContext);
  return (
    <div className="Game Game__background">
      {appRunningStatus.running ? <GameScreen /> : <StartScreen />}
    </div>
  );
};
export default App;
