/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from "react";

import Spider from "../spider/Spider";

const initValue = (arr) => {
  const myConnectionCoordinates = {};
  arr.forEach((el) => {
    myConnectionCoordinates[el.id] = [el.position.x, el.position.y];
  });
  return myConnectionCoordinates;
};

const lineList = (arr, cc) => {
  const list = [];
  arr.map((item) =>
    item.connections.map((con) => {
      return list.push({
        id: `${item.id}--${con}`,
        x1: cc[item.id][0] + 40,
        y1: cc[item.id][1] + 40,
        x2: cc[con][0] + 40,
        y2: cc[con][1] + 40,
      });
    })
  );
  return list;
};

const collisionDetection = (line1, line2) => {
  const det =
    (line1.x2 - line1.x1) * (line2.y2 - line2.y1) -
    (line2.x2 - line2.x1) * (line1.y2 - line1.y1);
  if (det === 0) {
    return false;
  }
  const lambda =
    ((line2.y2 - line2.y1) * (line2.x2 - line1.x1) +
      (line2.x1 - line2.x2) * (line2.y2 - line1.y1)) /
    det;
  const gamma =
    ((line1.y1 - line1.y2) * (line2.x2 - line1.x1) +
      (line1.x2 - line1.x1) * (line2.y2 - line1.y1)) /
    det;
  return lambda > 0 && lambda < 1 && gamma > 0 && gamma < 1;
};

const GamePlayArea = ({ TESTwinGame, forwardedRef, spiderDataArray }) => {
  const [connectionCoordinates, setConnectionCoordinates] = useState(
    initValue(spiderDataArray)
  );
  const [webLinesList, _setWebLinesList] = useState(
    lineList(spiderDataArray, connectionCoordinates)
  );
  const WebLinesRef = useRef(null);

  const UseUpdateConnectionCoordinates = useCallback(
    (updateCords) => {
      setConnectionCoordinates({ ...connectionCoordinates, ...updateCords });
    },
    [connectionCoordinates]
  );

  // check collision
  useEffect(() => {
    for (let i = 0; i < webLinesList.length; i++) {
      for (let j = 0; j < webLinesList.length; j++) {
        if (i !== j) {
          const intersect = collisionDetection(webLinesList[i], webLinesList[j]);
          if (intersect) {
            WebLinesRef.current
              .querySelector(`#${webLinesList[i].id}`)
              .classList.add("spider__web__intersect");
            WebLinesRef.current
              .querySelector(`#${webLinesList[j].id}`)
              .classList.add("spider__web__intersect");
          }
        }
      }
    }
  }, [connectionCoordinates, webLinesList]);

  useEffect(() => {
    _setWebLinesList(lineList(spiderDataArray, connectionCoordinates));
  }, [connectionCoordinates]);

  const WebLines = () => {
    return (
      <>
        {spiderDataArray.map((item) =>
          item.connections.map((con) => (
            <svg
              id={`${item.id}--${con}`}
              className="spider__web"
              key={`${item.id}_${con}`}
            >
              <line
                x1={connectionCoordinates[item.id][0] + 40}
                y1={connectionCoordinates[item.id][1] + 40}
                x2={connectionCoordinates[con][0] + 40}
                y2={connectionCoordinates[con][1] + 40}
              />
            </svg>
          ))
        )}
      </>
    );
  };

  return (
    <section className="Game__GameScreen__Game" ref={forwardedRef}>
      <button onClick={TESTwinGame} style={{ position: "absolute", zIndex: "12" }}>
        DEBUG: FORCE NEW LEVEL
      </button>
      <div
        ref={WebLinesRef}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <WebLines />
      </div>
      {spiderDataArray.map((spidersEl) => (
        <Spider
          parentRef={forwardedRef}
          key={spidersEl.id}
          id={spidersEl.id}
          position={{ x: spidersEl.position.x, y: spidersEl.position.y }}
          connection={spidersEl.connection}
          updateConnectionCords={UseUpdateConnectionCoordinates}
        />
      ))}
    </section>
  );
};

export default GamePlayArea;
