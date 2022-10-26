import React, { useEffect, useRef } from "react";
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

const DraftPlayerChoose = ({draftStatus, setThisId, setChangeId,}) => {
  
  const groups = useSelector(selectGroup);
  const { positionPlayer, draftPlayers,teamSelectId} = useSelector(selectDraftConfig);
  const draftBtnDisable = draftStatus === 'pause' ? true : false
  const dispatch = useDispatch();
  const shouldLog = useRef(true);
  useEffect(() => {
    if (shouldLog.current && groups.positions.length === 1) {
      shouldLog.current = false;
       dispatch(getPositions())
    }
    // eslint-disable-next-line
  }, []);
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
      <Search />
      <NumWrapper>
        {groups?.positions &&
          groups.positions.map((item, idx) => {
            const id = idx + 1;

            return (
              <NumItem
                key={id}
                onClick={() => dispatch(setPositionPlayer(item.split(" ")[0]))}
                className={
                  positionPlayer.includes(item.split(" ")[0]) ? "active" : null
                }
              >
                <Nums num={item.split(" ")[0]} />
              </NumItem>
            );
          })}
      </NumWrapper>
      <DraftPlayerWrapper>
        <DraftPlayerItems>
          {draftPlayers &&
            draftPlayers.map((item, idx) => {
              return (
                <DraftPlayerItem key={idx}>
                  <div className="player-draft">
                    <div className="player-rank">
                      <p>Rank</p>
                      <span>{item.rank}</span>
                    </div>
                    <div className="player-adp">
                      <p>ADP</p>
                      <span>{item.adp}</span>
                    </div>
                    <img src={playerImg} alt="" />
                    <h4 className="player-name">{item.playerName}</h4>
                    <h4 className="player-position">{item.positionPlayer}</h4>
                    <img src={colleageImg} alt="" />
                    <h4 className="playyer-college">{item.collegeName}</h4>
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
        </DraftPlayerItems>
        {draftBtnDisable && (
          <div className="player-draft-btn-wrap">
          <button className="player-draft-btn" onClick={() =>{
            dispatch(setStatus('play'))
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
