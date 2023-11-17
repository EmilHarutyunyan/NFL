import React, { useCallback, useState } from "react";
// Styles
import { Wrapper, Overflow } from "./LiveDraft.styles";
import LiveSettingChat from "../../components/LiveSettingChat/LiveSettingChat";
import LiveFooter from "../../components/LiveFooter/LiveFooter";
import LiveBody from "../../components/LiveBody/LiveBody";

import { createPortal } from "react-dom";
import FlipClock from "../../components/FlipClock";
import CountdownStart from "../../components/CountdownStart";
import { useSelector } from "react-redux";
import { selectDraftEvents } from "../../app/features/draftEvents/draftEventsSlice";

const LiveDraft = () => {
  const [isOverflow, setIsOverflow] = useState(false);
  const {  start } = useSelector(selectDraftEvents);
  const handleOverflow = useCallback((isOverflow) => {
    setIsOverflow(isOverflow);
  }, []);
  return (
    <Wrapper>
      <LiveSettingChat />
      <LiveBody />
      <LiveFooter handleOverflow={handleOverflow} />
      {isOverflow ? <Overflow /> : null}
      {start
        ? createPortal(<CountdownStart />, document.querySelector("body"))
        : createPortal(
            <FlipClock  />,
            document.querySelector("body")
          )}

      {/* {createPortal(<CountdownStart />, document.querySelector("body"))} */}
    </Wrapper>
  );
};

export default LiveDraft;
