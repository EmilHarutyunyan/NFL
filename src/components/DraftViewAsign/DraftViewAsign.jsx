import React, { useEffect, useRef } from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
// Styles
import { PlayerName, PlayerPos, Wrapper } from "./DraftViewAsign.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  delRoundBPA,
  selectDraftConfig,
  setCountRender,
  setDraftPlayersAction,
  setSelectCardDepth,
  setTradeValue,
} from "../../app/features/draftConfig/draftConfigSlice";
import { delPlayersDraft } from "../../app/features/playersDraft/playersDraftSlice";
import { POSITIONS_COLOR } from "../../utils/constants";
import draftAutoSettings from "./DraftAutoSettings";

const Delayed = ({ children, waitBefore = 500, scroll = null, player }) => {
  const [isShow, setIsShow] = useState(false);
  const { countRender } = useSelector(selectDraftConfig);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(true);

      if (countRender <= scroll.id && player) {
        scroll.teamRef?.current?.scrollTo(0, (scroll.id - 1) * 75);
      }
    }, waitBefore);
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitBefore]);

  function Animation() {
    return <CircularProgress style={{ position: "absolute", right: "10%" }} />;
  }

  return isShow ? children : Animation();
};

const DraftViewAsign = ({ players, thisId }) => {
  const dispatch = useDispatch();
  const {
    pauseId,
    timeSpeed,
    tradeValue,
    loading,
    teamPickIndex,
    countRender,
    draftCardDepth,
    draftRandomnessTeam,
    roundBPA,
    roundDepth,
    round,
    selectCardDepth,
  } = useSelector(selectDraftConfig);
  const divRef = useRef(null);
  const roundArr = useRef([]);

  const teamRef = useRef(null);

  useEffect(() => {
    if (
      tradeValue?.mouthing &&
      !players.loading &&
      players.status &&
      (countRender + 1 < teamPickIndex[0] || !teamPickIndex.length)
    ) {
      if (!pauseId.length) {
        let newTradeValue = {};
        let tradeValueTeam = structuredClone(tradeValue.results[countRender]);
        let teamDepth = []
        const playersAll = players.results;
        let player = {};
        let roundIndexBool = false;
        if (countRender > 0 && roundBPA.length !== 0) {
          let teamSlice = tradeValue.results.slice(0, countRender + 1);
          teamSlice.forEach((team) => {
            if (team.city === tradeValueTeam.city) {
              teamDepth = team;
            }
          });
        }
         
        if(roundBPA.length && !(roundBPA.includes(+tradeValueTeam.round_index_number))) {
          roundIndexBool= true;
          dispatch(delRoundBPA(tradeValueTeam.round_index_number));
        }
        
        
        player = draftAutoSettings(
          draftCardDepth,
          draftRandomnessTeam,
          roundBPA,
          roundDepth,
          round,
          playersAll,
          teamDepth,
          tradeValueTeam,
          selectCardDepth,
          roundIndexBool
        );

        
        const {player:playerItem, playerDepth} = player
        tradeValueTeam["player"] = playerItem;
        tradeValueTeam["playerDepth"] = playerDepth;
        let newTradeValueResults = tradeValue.results.map((team) =>
          team.index === tradeValueTeam.index ? tradeValueTeam : team
        );
          
        newTradeValue = {
          ...tradeValue,
          results: newTradeValueResults,
        };
        
        !selectCardDepth.includes(playerDepth) &&
          dispatch(setSelectCardDepth(playerDepth));
      
        
        dispatch(setTradeValue(newTradeValue));
        dispatch(setDraftPlayersAction(tradeValueTeam));
        dispatch(delPlayersDraft([playerItem]));
        dispatch(setCountRender());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tradeValue.mouthing, players.loading, pauseId]);

  return (
    <Wrapper ref={divRef}>
      {players.length > 0 && loading ? <CircularProgress /> : null}
      <ul ref={teamRef}>
        {tradeValue?.results?.map((team, idx) => {
          const {
            index: id,

            round_index: roundIndex,
            round: { logo },
          } = team;

          const isBelowThreshold = (currentValue) => currentValue > id;
          const checkTeam = teamPickIndex.every(isBelowThreshold)
            ? id * (1000 / timeSpeed / id)
            : 0;
          const time = thisId ? +(id - thisId) * (1000 / timeSpeed) : checkTeam;

          if (id === 1) {
            roundArr.current = [];
          }
          const roundCheck = roundArr.current.includes(roundIndex)
            ? false
            : roundArr.current.push(roundIndex);

          return (
            <React.Fragment key={id}>
              {roundCheck ? (
                <li className="round" key={Math.random()}>
                  {roundIndex}
                </li>
              ) : null}
              <li
                key={id}
                className={`${
                  teamPickIndex.includes(id)
                    ? "player-team active"
                    : "player-team"
                }`}
              >
                <div className="pick">
                  <p>Pick</p>
                  <p>{id}</p>
                </div>

                <div className="player-team-info">
                  <img src={logo ? logo : ""} alt="" />

                  {!!checkTeam && team?.player ? null : (
                    <>
                      {teamPickIndex.includes(id) && pauseId[0] !== id ? (
                        <>
                          <div className="player-click">One The Pik</div>
                        </>
                      ) : (
                        <>
                          <div className="player-dashed">- - -</div>
                        </>
                      )}
                    </>
                  )}
                  {!!checkTeam && (
                    <Delayed
                      waitBefore={time}
                      scroll={{
                        teamRef,
                        id,
                        thisId,
                        player: team.player ? true : false,
                      }}
                    >
                      {team?.player ? (
                        <>
                          <PlayerName>{team?.player?.player}</PlayerName>
                          <PlayerPos
                            backColor={POSITIONS_COLOR[team?.player?.position]}
                          >
                            {team.player.position}
                          </PlayerPos>
                          <p className="player-colleg">
                            {team?.player?.school}
                          </p>
                        </>
                      ) : (
                        <CircularProgress
                          style={{ position: "absolute", right: "10%" }}
                        />
                      )}
                    </Delayed>
                  )}
                </div>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default DraftViewAsign;
