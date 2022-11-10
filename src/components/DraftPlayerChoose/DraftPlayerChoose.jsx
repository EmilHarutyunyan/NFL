import React, { useEffect, useRef, useState } from "react";
import Search from "../Search/Search";
import TexasImg from "../../assets/img/texans.png";
import { useDispatch, useSelector } from "react-redux";
import { getPositions, selectGroup } from "../../app/features/group/groupSlice";
import Nums from "../SettingsDraft/Nums";
import {
  delPauseId,
  delTeamsRound,
  selectDraftConfig,
  setPositionPlayer,
  setStatus,
} from "../../app/features/draftConfig/draftConfigSlice";
import {
  getPlayers, pageNav, positionAction, searchPlayers, selectPlayers,
} from "../../app/features/players/playersSlice.js";
// Img
import playerImg from "../../assets/img/player.png";
import colleageImg from "../../assets/img/college.png";
import infoImg from "../../assets/img/Info.png";
import pauseImg from "../../assets/img/pause.png";
// Styles
import {
  Wrapper,
  SelectTeam,
  NumItem,
  NumWrapper,
  DraftPlayerWrapper,
  DraftPlayerItems,
  DraftPlayerItem,
} from "./DraftPlayerChoose.styles";

import Spinner from "../Spinner/Spinner";
import Pagination from "../Pagination/Pagination";


const DraftPlayerChoose = ({draftStatus, setThisId, setChangeId,}) => {
  
  const groups = useSelector(selectGroup);
  const players = useSelector(selectPlayers);
  const { positionPlayer, teamSelectId} = useSelector(selectDraftConfig);
  const draftBtnDisable = draftStatus === 'red' ? true : false
  const dispatch = useDispatch();
  const shouldLog = useRef(true);
  const initial = useRef(true);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    if (shouldLog.current && groups.positions.length === 1) {
      shouldLog.current = false;
       dispatch(getPositions())
       dispatch(getPlayers(6));
    }
    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = setTimeout(() => {
      dispatch(searchPlayers(searchValue));
    }, 500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [setSearchValue, searchValue]);
  return (
    <Wrapper>
      <SelectTeam>
        <div className="team">
          <img src={TexasImg} alt="" />
          <h2>Houston Texans</h2>
        </div>
        <div className="team-info">
          <p>Remaning piks</p>
          <p>2,34</p>
        </div>
      </SelectTeam>
      <Search 
        value={searchValue}
            
        handleChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <NumWrapper>
        {groups?.positions &&
          groups.positions.map((item, idx) => {
            const id = idx + 1;
            return (
              <NumItem
                key={id}
                onClick={() => {
                  if('All' !== item.split(" ")[0]) {
                    dispatch(positionAction(item))
                  } else {
                    dispatch(positionAction(""))
                  }
                  dispatch(setPositionPlayer(item.split(" ")[0]))
                  }
                }
                className={
                  positionPlayer === (item.split(" ")[0]) ? "active" : null
                }
              >
                <Nums num={item.split(" ")[0]} />
              </NumItem>
            );
          })}
      </NumWrapper>
      <DraftPlayerWrapper>
        <DraftPlayerItems>
        
            {players.loading ? (
        <Spinner />
              ) :(

        <>
        {players.results.length > 0 &&
            players.results.map((item, idx) => {

              return (
                <DraftPlayerItem key={idx}>
                  <div className="player-draft">
                    <div className="player-rank">
                      <p>Rank</p>
                      <span>{item.ranking}</span>
                    </div>
                    <div className="player-adp">
                      <p>ADP</p>
                      <span>{item?.adp}</span>
                    </div>
                    <img src={playerImg} alt="" />
                    <h4 className="player-name">{item.player}</h4>
                    <h4 className="player-position">{item.position}</h4>
                    <img src={colleageImg} alt="" />
                    <h4 className="playyer-college">{item.school}</h4>
                    <img src={infoImg} alt="" />
                    <button className="player-draft-btn" disabled={draftBtnDisable} onClick={() => {
                      setThisId(teamSelectId[0]);
                      dispatch(delTeamsRound(teamSelectId[0]))
                      setChangeId(teamSelectId[0]);
                      }}>Draft</button> 
                  </div>
                </DraftPlayerItem>
              );
            })}
          <Pagination
            totalCount={players.count}
            pageSize={players.limit}
            currentPage={players.currentPage}
            previous={players.previous}
            next={players.next}
            onPageChange={(page) => {
              dispatch(pageNav(page));
            }}
          />
        </>
      )}
        </DraftPlayerItems>
        {draftBtnDisable && (
          <div className="player-draft-btn-wrap">
          <button className="player-draft-btn" onClick={() =>{
            dispatch(setStatus('green'))
            dispatch(delPauseId())
          }}>
              <img src={pauseImg} alt="play_pause" />
              <span>Start Draft</span>
          </button>
        </div>
        )}
        
      </DraftPlayerWrapper>
    </Wrapper>
  );
};

export default DraftPlayerChoose;
