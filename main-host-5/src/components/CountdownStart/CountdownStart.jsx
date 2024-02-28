import React, { useEffect, useState } from "react";
// Styles
import {  Wrapper } from "./CountdownStart.styles";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { selectLiveDraft, setEventStart, setEventTime, setFirstStart } from "../../app/features/liveDraft/liveDraftSlice";
import { TIME_CONFIG } from "../../config/config";
const CountdownStart = () => {
  const [count, setCount] = useState(true);
  const {millisecondToSecond,addTime} = useSelector(selectLiveDraft)
  const dispatch =useDispatch()
  useEffect(() => {
    if (count) {
      document.body.style.overflow="hidden"
      setTimeout(() => {
        setCount(false);
        document.body.style.overflow = null;
        dispatch(setFirstStart(false))
        dispatch(setEventStart(true))
        dispatch(setEventTime({ time: 120000, manualChoose: false }));
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
