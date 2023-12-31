import React, { useCallback, useEffect, useRef, useState } from "react";
// Styles

import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { Wrapper } from "./FlipClock.styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  livePicksChoose,
  selectLiveDraft,
  setEventStart,
  setEventTime,
  setFirstStart,
} from "../../app/features/liveDraft/liveDraftSlice";
import FlipClockZero from "./FlipClockZero";
import useAudio from "../../hooks/useAudio";
import { useSocket } from "../../hook/SocketContext";

const FlipClockItem = React.memo(({ eventTime,handleStart, }) => {
  

  const handleBodyTitle = useCallback(({ timeDelta, completed }) => {
    if (completed) {
      document.title = "NFL DRAFT 2023";
    } else {
      document.title = `${timeDelta.minutes}:${timeDelta.seconds}`;
    }
  }, []);
  return (
    <FlipClockCountdown
      to={new Date().getTime() + eventTime}
      renderMap={[false, false, true, true]}
      labels={["MINUTES", "SECONDS"]}
      onComplete={() => {
        handleStart();
      }}
      onTick={handleBodyTitle}
      labelStyle={{
        fontSize: 12,
        fontWeight: 500,
        textTransform: "uppercase",
        color: "#004EA3",
        animation: "animateOpacityImage 1s",
      }}
      digitBlockStyle={{
        width: 30,
        height: 40,
        fontSize: 30,
        backgroundColor: "#004ea3",
        animation: "animateOpacityImage 1s",
      }}
      dividerStyle={{ color: "#9e9e9e", height: 1 }}
      separatorStyle={{ color: "#022142", size: "6px" }}
      duration={0.5}
    >
      <FlipClockZero />
    </FlipClockCountdown>
  );
});

const FlipClock = () => {
  const [position, setPosition] = useState({ x: 800, y: 800 });
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const socket = useSocket()
  const {
    eventTime,
    millisecondToSecond,
    nextMyEvent,
    eventPlayers,
    start,
    firstStart,
    manualChoose,
    eventId,
    addTime,
  } = useSelector(selectLiveDraft);
  const { isPlaying, play, stop } = useAudio();
  
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
  const handleStart = useCallback(async () => {
    if (!firstStart && !start) {
      dispatch(setFirstStart(true));
      dispatch(setEventStart(true));
      return;
    }
    if (!manualChoose && socket) {
      console.log("manualChoose :", manualChoose);

      // await dispatch(setEventTime({ time: 20000, manualChoose: false }));
      await socket.emit(
        "player",
        JSON.stringify({ ...eventPlayers[0], eventId })
      );
      !isPlaying ? play() : stop();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    firstStart,
    eventTime,
    start,
    nextMyEvent,
    manualChoose,
    socket,
    eventPlayers,
    eventId,
  ]);

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
      <FlipClockItem
        handleStart={handleStart}
        eventTime={eventTime}
        
      />
    </Wrapper>
  );
};

export default FlipClock;
