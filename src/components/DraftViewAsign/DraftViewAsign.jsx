import React, { useEffect, useRef } from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
// Styles
import { Wrapper } from "./DraftViewAsign.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getTradeValue,
  selectDraftConfig,
  setCountRender,
  setDraftPlayersAction,
  setStatus,
  setTradeValue,
} from "../../app/features/draftConfig/draftConfigSlice";
import { useMemo } from "react";
import { delPlayersDraft } from "../../app/features/playersDraft/playersDraftSlice";


const Delayed = ({ children, waitBefore = 500, scroll = null }) => {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const { countRender } = useSelector(selectDraftConfig);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(true);
      if (scroll?.id) {
        if (countRender <= scroll.id) {
          scroll.teamRef?.current?.scrollTo(0, (scroll.id - 1) * 75);
          
          dispatch(setCountRender(scroll.id));
          dispatch(setStatus('green'));
        } else {
          console.log('scroll.id orange:', scroll.id);
         
        } 
      } else {
        console.log('scroll.id orange:', scroll.id);
      }

    }, waitBefore);
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitBefore]);

  function ScrollSpasi() {
    if (
      scroll !== null &&
      scroll?.id >= scroll?.thisId &&
      scroll?.thisId !== 0
    ) {
      // scroll.teamRef?.current?.scrollBy(0, 75);
    }
    // roundSet.clear()
    return children;
  }
  function Animation() {
    return <CircularProgress style={{ position: "absolute", right: "10%" }} />;
  }

  return isShow ? ScrollSpasi() : Animation();
};

const DraftViewAsign = ({players,thisId, setChangeId, changeId}) => {
  const dispatch = useDispatch()
  const { teamSelectId, pauseId,timeSpeed,tradeValue,loading } = useSelector(selectDraftConfig);
  const divRef = useRef(null)
  const roundArr = useRef([]);

  const teamRef = useRef(null);

  const combineTeam = useMemo( () => (data, teamSelectId,players) => {
    
    let playersItems = players.results
    const newDataResult = [];
    const playersData = []
    let i = 0
    if(players.results.length && teamSelectId.length > 0) {
      for (const item of data.results) {
        let teamItem = structuredClone(item)
        if (teamSelectId.includes(teamItem.index)) {
          newDataResult.push(teamItem);
          continue;
        }
        if(!teamItem.player && !teamSelectId.includes(teamItem.index)   ) {
          if(teamItem.index < teamSelectId[0]) {
            teamItem["player"] = playersItems[i];
            playersData.push(playersItems[i])
            dispatch(setDraftPlayersAction(teamItem))
            i++;

          } 
    
        }
        newDataResult.push(teamItem);
      }
    } 
    else if(teamSelectId.length === 0) {
      for (const item of data.results) {
        let teamItem = structuredClone(item)
        if(!teamItem.player) {
            teamItem["player"] = playersItems[i];
            playersData.push(playersItems[i])
            dispatch(setDraftPlayersAction(teamItem))
            i++;
  
        }
        newDataResult.push(teamItem); 
      }
    }
    const tradeValue = {...data,results: newDataResult}
    return {tradeValue,playersData};
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [teamSelectId]
  );

  
  useEffect(() => {
    if (players.status && players.results && players.results.length) {
      dispatch(getTradeValue());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players.status]);


  useEffect(()=> {
    if(tradeValue?.mounting) {
      const newData = combineTeam(tradeValue, teamSelectId,players);
      dispatch(setTradeValue(newData.tradeValue))
      dispatch(delPlayersDraft(newData.playersData))
      divRef.current?.scrollIntoView({ behavior: "smooth" });
      // setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tradeValue.mounting])



  useEffect(() => {
    if (changeId) {
      if(pauseId.length === 0) {
        const newData = combineTeam(tradeValue, teamSelectId,players);
        dispatch(setTradeValue(newData.tradeValue))
        dispatch(delPlayersDraft(newData.playersData))
      }
    }

    return () => {
      setChangeId(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSelectId]);


  return (
    <Wrapper ref={divRef}>
      { players.length > 0 && loading ? <CircularProgress /> : null}
      <ul ref={teamRef}>
        {tradeValue?.results?.map((team, idx) => {
          const {
            index: id,

            round_index: roundIndex,
            round: { logo },
          } = team;
          
          const isBelowThreshold = (currentValue) => currentValue > id;
          const checkTeam = teamSelectId.every(isBelowThreshold) ? id * (1000/timeSpeed/id) : 0;
          const time = thisId ? + (id - thisId) * (1000/timeSpeed) : checkTeam;
          
          if (id === 1) {
            roundArr.current = [];
          }
          const roundCheck = roundArr.current.includes(roundIndex)
            ? false
            : roundArr.current.push(roundIndex);
          return (
            <>
              {roundCheck ? <li className="round" key={Math.random()} >{roundIndex}</li> : null}
              <li
                key={id}
                className={`${
                  teamSelectId.includes(id)
                    ? "player-team active"
                    : "player-team"
                }`}
              >
                <div className="pick">
                  <p>Pick</p>
                  <p>{id}</p>
                </div>

                <div className="player-team-info">
                  <img src={logo} alt="" />
                  
                  {!!checkTeam && team?.player ? null : (
                    <>
                      {teamSelectId.includes(id) && pauseId[0] !== id ? (
                        <>
                          <div className="player-click">One the Clock</div>
                        </>
                      ) : (
                        <>
                          <div className="player-dashed">- - -</div>
                        </>
                      )}
                    </>
                  )}
                  {!!checkTeam && team?.player && (
                    <Delayed
                      waitBefore={time}
                      scroll={{
                        teamRef,
                        id,
                        thisId,
                      }}
                    >
                      <p className="player-name">{team.player.player}</p>
                      <p className="player-pos">{team.player.position}</p>
                      <p className="player-colleg">{team.player.school}</p>
                    </Delayed>
                  )}
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </Wrapper>
  );
       
       
};

export default DraftViewAsign;