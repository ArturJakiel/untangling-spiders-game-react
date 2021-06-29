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

const GamePlayArea = ({ TESTwinGame, forwardedRef, spiderDataArray }) => {
  const [connectionCoordinates, setConnectionCoordinates] = useState(
    initValue(spiderDataArray)
  );
  const [webLinesList, _setWebLinesList] = useState([]);
  const WebLinesRef = useRef(null);

  const UseUpdateConnectionCoordinates = useCallback(
    (updateCords) => {
      setConnectionCoordinates({ ...connectionCoordinates, ...updateCords });
    },
    [connectionCoordinates]
  );

  // check collision
  useEffect(() => {
    console.log(WebLinesRef.current);
    console.log(webLinesList);
    // Object.entries(connectionCoordinates).map((el) => {
    //   console.log(el);
    //   const lineId = el[0];
    //   const lineX = el[1][0];
    //   const lineY = el[1][1];
    //   console.log(lineId, lineX, lineY);
    //   // if (x1 == x2) {
    //   //   return !(x3 == x4 && x1 != x3);
    //   // } else if (x3 == x4) {
    //   //   return true;
    //   // } else {
    //   //   // Both lines are not parallel to the y-axis
    //   //   m1 = (y1 - y2) / (x1 - x2);
    //   //   m2 = (y3 - y4) / (x3 - x4);
    //   //   return m1 != m2;
    //   // }
    // });
  }, [connectionCoordinates]);

  // _setWebLinesList([
  //   ...webLinesList,
  //   {
  //     id: `${item.id}--${con}`,
  //     x1: connectionCoordinates[item.id][0] + 40,
  //     y1: connectionCoordinates[item.id][1] + 40,
  //     x2: connectionCoordinates[con][0] + 40,
  //     y2: connectionCoordinates[con][1] + 40,
  //   },
  // ]);

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
