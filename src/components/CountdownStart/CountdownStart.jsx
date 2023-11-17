import React, { useEffect, useState } from "react";
// Styles
import {  Wrapper } from "./CountdownStart.styles";
import { useSelector } from "react-redux";
import { selectDraftEvents, setEventStart, setEventTime } from "../../app/features/draftEvents/draftEventsSlice";
import { useDispatch } from "react-redux";
const CountdownStart = () => {
  const [count, setCount] = useState(true);
  const {millisecond} = useSelector(selectDraftEvents)
  const dispatch =useDispatch()
  useEffect(() => {
    if (count) {
      document.body.style.overflow="hidden"
      setTimeout(() => {
        setCount(false);
        document.body.style.overflow = null;
        dispatch(setEventStart(false));
        dispatch(setEventTime(2 * millisecond));
      }, [4000]);
    }
  }, [count]);
  return (
    <>
      {count && (
        <Wrapper>
          <div className="count"></div>
        </Wrapper>
      )}
    </>
  );
};

export default CountdownStart;
