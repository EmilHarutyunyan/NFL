import React, { useCallback, useEffect, useState } from "react";
// Styles
import { Wrapper, Overflow } from "./LiveDraft.styles";
import LiveSettingChat from "../../components/LiveSettingChat/LiveSettingChat";
import LiveFooter from "../../components/LiveFooter/LiveFooter";
import LiveBody from "../../components/LiveBody/LiveBody";

import { createPortal } from "react-dom";
import FlipClock from "../../components/FlipClock";
import CountdownStart from "../../components/CountdownStart";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import {
  resetLiveDraft,
  selectLiveDraft,
} from "../../app/features/liveDraft/liveDraftSlice";
import { useDispatch } from "react-redux";
import { getLiveDraftInfo } from "../../app/features/liveDraft/liveDraftActions";
import { Navigate, useNavigate } from "react-router-dom";
import { LIVE_RESULT, SELECT_DRAFT } from "../../router/route-path";
import { setLiveResultBoard } from "../../app/features/liveResult/liveResultSlice";
import { memo } from "react";


const PickTime = memo(
  ({ firstStart }) => {
    return (
      <React.Fragment>
        {firstStart &&
          createPortal(<CountdownStart />, document.querySelector("body"))}
        {!firstStart &&
          createPortal(<FlipClock />, document.querySelector("body"))}
      </React.Fragment>
    );
  },
  (prevProps, nextProps) => {
    return nextProps.firstStart === prevProps.firstStart;
  }
);

const LiveDraft = () => {
  const [isOverflow, setIsOverflow] = useState(false);

  const {
    firstStart,
    eventPlayers,
    recentPicks,
    picksTeams,
    eventId,
    pickBoard,
    myPlayerTeam,
    myEventTeam,
    isFinishLiveDraft,
    roundPick,
  } = useSelector(selectLiveDraft);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOverflow = useCallback((isOverflow) => {
    setIsOverflow(isOverflow);
  }, []);

  useEffect(() => {
    
    if (eventId) {
      dispatch(getLiveDraftInfo(eventId));
    }
    return () => {
      document.title = "NFL DRAFT 2023";
      !isFinishLiveDraft && dispatch(resetLiveDraft());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, isFinishLiveDraft]);
  // useEffect(() => {
  //   if (eventPlayers.length && firstStart) {
  //     window.scrollTo(0, document.body.scrollHeight);
  //   }
  // }, [eventPlayers, firstStart]);

  const finishLiveDraft = useCallback(async () => {
    let resultBoard = pickBoard;
    let myBoard = myEventTeam ? { myEventTeam, myPlayerTeam } : null;
    await dispatch(
      setLiveResultBoard({ resultBoard, myBoard, round: roundPick })
    );
    navigate(LIVE_RESULT);
    // dispatch(resetLiveDraft());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickBoard, myEventTeam, roundPick]);
  useEffect(() => {
    if (isFinishLiveDraft) {
      finishLiveDraft();
      dispatch(resetLiveDraft());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinishLiveDraft]);
  if (eventId === null) {
    return <Navigate to={SELECT_DRAFT} />;
  }

  if (!eventPlayers.length || !recentPicks.length || !picksTeams.length) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      
        <LiveSettingChat />
        <LiveBody />
        <LiveFooter handleOverflow={handleOverflow} />
        {isOverflow ? <Overflow /> : null}
       <PickTime firstStart={firstStart} /> 
  
    </Wrapper>
  );
};

export default LiveDraft;
