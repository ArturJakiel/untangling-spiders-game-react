import React, { useEffect, useState } from "react";

import spiderIcon from "./spider_icon.svg";

const Spider = ({ position }) => {
  const [x, setX] = useState(position.x);
  const [y, setY] = useState(position.y);

  const DragSpider = (e) => {
    console.log(e.clientX, e.clientY);
    // useEffect(() => {
    //   return () => {
    //     //
    //   };
    // }, [e]);
  };

  return (
    <img
      id="testID"
      style={{ left: `${x}px`, top: `${y}px` }}
      className="spider__icon"
      src={spiderIcon}
      alt="spider"
      onMouseDown={(e) => DragSpider(e)}
    />
  );
};

export default Spider;
