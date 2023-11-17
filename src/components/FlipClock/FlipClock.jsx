import React, { useCallback, useEffect, useRef, useState } from "react";
// Styles
import FlipNumbers from "react-flip-numbers";

import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { Wrapper } from "./FlipClock.styles";
import { useDispatch } from "react-redux";
import { selectDraftEvents, setEventStart } from "../../app/features/draftEvents/draftEventsSlice";
import { useSelector } from "react-redux";

const FlipClockItem = React.memo(({ handleStart }) => {
  const { eventTime } = useSelector(selectDraftEvents);
  return (
    <FlipClockCountdown
      to={new Date().getTime() + eventTime}
      renderMap={[false, false, true, true]}
      labels={["MINUTES", "SECONDS"]}
      onComplete={handleStart}
      labelStyle={{
        fontSize: 12,
        fontWeight: 500,
        textTransform: "uppercase",
        color: "#004EA3",
      }}
      digitBlockStyle={{
        width: 30,
        height: 40,
        fontSize: 30,
        backgroundColor: "#004ea3",
      }}
      dividerStyle={{ color: "#9e9e9e", height: 1 }}
      separatorStyle={{ color: "#022142", size: "6px" }}
      duration={0.5}
    >
      00:00
    </FlipClockCountdown>
  );
});

const FlipClock = (() => {
  const [position, setPosition] = useState({ x: 800, y: 800 });
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  const handleMouseDown = (e) => {
    setDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };
  useEffect(() => {
    setPosition({
      x: document.querySelector("body").offsetWidth - 300,
      y: document.querySelector("body").offsetHeight - 300,
    });
  }, []);
  const handleStart = useCallback(() => {
    dispatch(setEventStart(true));
  }, []);
  return (
    <Wrapper
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,

        cursor: "move",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <FlipClockItem handleStart={handleStart} />
    </Wrapper>
  );
});

export default FlipClock;
