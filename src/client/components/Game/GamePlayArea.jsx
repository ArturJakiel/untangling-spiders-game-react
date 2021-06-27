/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";

import Spider from "../spider/Spider";

const GamePlayArea = ({ TESTwinGame, forwardedRef, spiderDataArray }) => {
  const [mousePosition, _setMousePosition] = useState({ x: 0, y: 0 });
  const [connectionCoordinates, _setConnectionCoordinates] = useState([]);

  useEffect(() => {
    const data = {};
    spiderDataArray.forEach((el) => {
      data[el.id] = [el.position.x, el.position.y];
    });
    _setConnectionCoordinates(data);
  }, [spiderDataArray]);

  console.log(spiderDataArray);
  console.log(connectionCoordinates, "asdasd");

  return (
    <section className="Game__GameScreen__Game" ref={forwardedRef}>
      <button onClick={TESTwinGame} style={{ position: "absolute" }}>
        GAME SCREEN
      </button>
      <p style={{ position: "absolute" }}>
        {mousePosition.x}
        {mousePosition.y}
      </p>
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {spiderDataArray.map((item) => (
          <>
            {console.log(item)}
            {console.log(connectionCoordinates[item?.connections[0]])}
            <svg className="spider__web" key={`${item.id}_1`}>
              <line
                x1={item.position.x + 40}
                y1={item.position.y + 40}
                x2="000"
                y2="000"
              />
            </svg>
            {/* <svg
              className="spider__web"
              key={`${item.id}_2`}
              connection={item.connection}
            >
              <line x1={item.position.x} y1={item.position.y} x2="100" y2="100" />
            </svg> */}
          </>
        ))}
      </div>
      {spiderDataArray.map((spidersEl) => (
        <Spider
          key={spidersEl.id}
          id={spidersEl.id}
          position={{ x: spidersEl.position.x, y: spidersEl.position.y }}
          connection={spidersEl.connection}
        />
      ))}
    </section>
  );
};

export default GamePlayArea;

/**
<svg style="position:absolute;width:100%;height:100%">
  <line x1="75" y1="75" x2="325" y2="147" style="stroke:black;stroke-width:2" />
</svg>
 */
