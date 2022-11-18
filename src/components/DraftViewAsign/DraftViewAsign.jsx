import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { API_ENDPOINT } from "../../config/config";
import CircularProgress from "@mui/material/CircularProgress";
// Styles
import { Wrapper } from "./DraftViewAsign.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  // delTeamsRound,
  selectDraftConfig,
  setCountRender,
  setDraftPlayersAction,
  setStatus,
  setTradeValue,
} from "../../app/features/draftConfig/draftConfigSlice";
import { useMemo } from "react";


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
  const { teamSelectId, round,pauseId,timeSpeed,tradeValue,teamRemoveId } = useSelector(selectDraftConfig);
  const initialRef = useRef(true);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(tradeValue || []);
  // const [changeId, setChangeId] = useState(0);
  // const [thisId, setThisId] = useState(0);
  const roundArr = useRef([]);

  

  const teamRef = useRef(null);
  const combineTeamMemo = useMemo(
    () => (data, teamSelectId) => {
    const newDataResult = [];
    let i = 0
    debugger
    if(players.results.length) {
      for (const item of tradeValue.results) {
        let teamItem = structuredClone(item)
        if (teamSelectId.includes(teamItem.index)) {
          newDataResult.push(teamItem);
          i++;
          continue;
        }
        
        console.log("players.results[i]",players.results[i])
        if(!teamSelectId.includes(teamItem.index) && teamSelectId.length) {
          if((!teamItem.player && item.index < teamSelectId[0])) {
           
            teamItem["player"] = players.results[i];
            if(players.results[i]) {
            dispatch(setDraftPlayersAction(teamItem))
            
            
          }
        }
        }

        if(!teamItem.player && teamSelectId.length === 0) {
          teamItem["player"] = players.results[i];
          if(players.results[i]) {
          dispatch(setDraftPlayersAction(teamItem))
        }

        }
        if(!teamRemoveId.includes(teamItem.index) || teamRemoveId.length===0) {
          i++;
        }
        newDataResult.push(teamItem);
       
      }
      
      return {...data,results: newDataResult};
    }
  },
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [teamSelectId]
  );

  const combineTeam = (data, teamSelectId) => {
    const newDataResult = [];
    let i = 0
    if(players.results.length) {
      
      for (const item of data.results) {
        if (teamSelectId.includes(item.index)) {
          newDataResult.push(item);
          i++;
          continue;
        }
        if(!teamSelectId.includes(item.index) && item.index < teamSelectId[0]) {
          item.player = players.results[i];
          if(players.results[i]) {
            dispatch(setDraftPlayersAction(item))
            
          }
        }
        i++;
        newDataResult.push(item);
       
      }
      return {...data,results: newDataResult};
    }
    
  };
  const handleData = async () => {
    
    setLoading(true);
    const { data } = await axios(
      `${API_ENDPOINT}trade-value-history/?limit=${+round * 32}&offset=0`
      );
      
   
    const newData = combineTeam(data, teamSelectId);
    dispatch(setTradeValue(newData))
    setData(newData);
    setLoading(false);
  };

  useEffect(() => {
    if (initialRef.current && players.results) {
      //   initialRef.current = false;
      handleData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players?.results]);


  useEffect(() => {
    if (changeId) {
      console.log("asd")
      const newData = combineTeamMemo(data, teamSelectId);
      setData(newData);
    }

    return () => {
      setChangeId(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSelectId]);


  return (
    <Wrapper>
      {isLoading ? <CircularProgress /> : null}
      <ul ref={teamRef}>
        {data?.results?.map((team, idx) => {
          const {
            index: id,

            round_index: roundIndex,
            round: { logo },
          } = team;
          
          const isBelowThreshold = (currentValue) => currentValue > id;
          const checkTeam = teamSelectId.every(isBelowThreshold) ? id * (1000/timeSpeed/id) : 0;
          const time = thisId ? +(id - thisId) * (1000/timeSpeed) : checkTeam;
              // eslint-disable-next-line no-lone-blocks
              {/* const statusPause = status === 'pause' ? false : true */}
             
          if (id === 1) {
            roundArr.current = [];
          }
          const roundCheck = roundArr.current.includes(roundIndex)
            ? false
            : roundArr.current.push(roundIndex);
          return (
            <>
              {roundCheck ? <li className="round" >{roundIndex}</li> : null}
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