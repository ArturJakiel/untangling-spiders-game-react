import React, { createContext, useState } from "react";

export const appRunningStatusContext = createContext();
export const appLevelTimeContext = createContext();

const AppStatusProvider = ({ children }) => {
  const [appStatus, _setAppStatus] = useState(false);
  const [levelTime, _setLevelTime] = useState("");

  const startGame = () => {
    _setAppStatus(!appStatus);
  };

  const setLevelTimeScore = (time) => {
    _setLevelTime(time);
  };

  return (
    <>
      <appRunningStatusContext.Provider value={{ running: appStatus, startGame }}>
        <appLevelTimeContext.Provider value={{ levelTime, setLevelTimeScore }}>
          {children}
        </appLevelTimeContext.Provider>
      </appRunningStatusContext.Provider>
    </>
  );
};

export default AppStatusProvider;
