import React, { useEffect, useState, useRef, useCallback } from "react";

import spiderIcon from "./spider_icon.svg";

const Spider = ({ position, id, parentRef, updateConnectionCords }) => {
  const [x, setX] = useState(position.x);
  const [y, setY] = useState(position.y);
  // const [spiderPressed, _setSpiderPressed] = useState(false);
  const spiderRef = useRef();

  // const moveSpider = (clientX, clientY) => {
  //   const shiftX = clientX - spiderRef.current.getBoundingClientRect().left;
  //   const shiftY = clientY - spiderRef.current.getBoundingClientRect().top;

  //   setX(`${clientX - shiftX}px`);
  //   setY(`${clientY - shiftY}px`);
  //   console.log("xd");
  // };

  // const onSpiderMouseDown = () => {
  //   _setSpiderPressed(true);
  // };

  // const onSpiderMouseUP = () => {
  //   _setSpiderPressed(false);
  // };

  const simpleMoveSpider = (event) => {
    const { target, pageX, pageY } = event;

    const shiftX = pageX + 10 - target.getBoundingClientRect().left;
    const shiftY = pageY + 40 - target.getBoundingClientRect().top;

    function moveAt(areaX, areaY) {
      setX(areaX - shiftX);
      setY(areaY - shiftY);
      // updateConnectionCords({ [id]: [x, y] });
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    parentRef.current.addEventListener("mousemove", onMouseMove);

    target.onmouseup = function () {
      parentRef.current.removeEventListener("mousemove", onMouseMove);
      target.onmouseup = null;
    };
  };

  useEffect(() => {
    updateConnectionCords({ [id]: [x, y] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y]);

  return (
    <img
      ref={spiderRef}
      id={id}
      style={{ left: `${x}px`, top: `${y}px` }}
      className="spider__icon"
      src={spiderIcon}
      alt="spider"
      onMouseDown={(e) => simpleMoveSpider(e)}
      // onMouseDown={(e) => onSpiderMouseDown(e)}
      // onMouseUp={(e) => onSpiderMouseUP(e)}
      onDragStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    />
  );
};

export default Spider;
