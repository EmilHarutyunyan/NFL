import React, { useCallback, useState } from "react";
// Styles
import { Wrapper, Overflow } from "./LiveDraft.styles";
import LiveSettingChat from "../../components/LiveSettingChat/LiveSettingChat";
import LiveFooter from "../../components/LiveFooter/LiveFooter";
const LiveDraft = () => {
  const [isOverflow, setIsOverflow] = useState(false);
  console.log("isOverflow :", isOverflow);
  const handleOverflow = useCallback((isOverflow) => {
    setIsOverflow(isOverflow);
  }, []);
  return (
    <Wrapper>
      <div>
        <LiveSettingChat />
      </div>
      <LiveFooter handleOverflow={handleOverflow} />
      {isOverflow ? <Overflow /> : null}
    </Wrapper>
  );
};

export default LiveDraft;
