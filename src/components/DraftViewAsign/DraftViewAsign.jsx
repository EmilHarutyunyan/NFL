import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { API_ENDPOINT } from "../../config/config";
import CircularProgress from "@mui/material/CircularProgress";
// Styles
import { Wrapper } from "./DraftViewAsign.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  delTeamsRound,
  selectDraftConfig,
  setCountRender,
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
        }
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

const DraftViewAsign = ({thisId, setChangeId, changeId}) => {
  const initialRef = useRef(true);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { draftPlayers, teamSelectId, round,pauseId } = useSelector(selectDraftConfig);
  const dispatch = useDispatch();
  // const [changeId, setChangeId] = useState(0);
  // const [thisId, setThisId] = useState(0);
  const roundArr = useRef([]);

  
  const teamRef = useRef(null);
  const combineTeamMemo = useMemo(
    () => (data, teamSelectId) => {
      const player = draftPlayers[0];
      const newDataResult = [];

      for (const item of data.results) {
        if (teamSelectId.includes(item.id)) {
          newDataResult.push(item);
          continue;
        }
        item.player = player;
        newDataResult.push(item);
      }
      data.results = newDataResult;
      return data;

    },
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [teamSelectId]
  );

  const combineTeam = (data, teamSelectId) => {
    const player = draftPlayers[0];
    const newDataResult = [];

    for (const item of data.results) {
      if (teamSelectId.includes(item.id)) {
        newDataResult.push(item);
        continue;
      }
      item.player = player;
      newDataResult.push(item);
    }
    data.results = newDataResult;
    return data;
  };
  const handleData = async () => {
    setLoading(true);
    const { data } = await axios(
      `${API_ENDPOINT}trade-value-history/?limit=${+round * 32}&offset=0`
    );

    const newData = combineTeam(data, teamSelectId);
    setData(newData);
    setLoading(false);
  };
  useEffect(() => {
    if (initialRef.current) {
      //   initialRef.current = false;
      handleData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (changeId) {
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
            id,

            round_index: roundIndex,
            round: { logo, id: idTeam },
          } = team;
          const isBelowThreshold = (currentValue) => currentValue > id;
          const checkTeam = teamSelectId.every(isBelowThreshold) ? id * 500 : 0;
          const time = thisId ? +(id - thisId) * 1000 : checkTeam;
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
              {roundCheck ? <li className="round">{roundIndex}</li> : null}
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
                  <p>{idTeam}</p>
                </div>

                <div className="player-team-info">
                  <img src={logo} alt="" />
                  {!!checkTeam && team?.player ? null : (
                    <>
                      {teamSelectId.includes(id) && pauseId[0] !== id ? (
                        <>
                          <div className="player-click">One the Clock</div>

                          {/* <button
                            onClick={() => {
                              setThisId(id);
                              dispatch(delTeamsRound(id));
                              setChangeId(id);
                            }}
                          >
                            draft
                          </button> */}
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
                      <p className="player-name">{team.player.playerName}</p>
                      <p className="player-pos">{team.player.positionPlayer}</p>
                      <p className="player-colleg">{team.player.collegeName}</p>
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
