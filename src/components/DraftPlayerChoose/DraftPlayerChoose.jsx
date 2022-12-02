import React, { useEffect, useMemo, useRef, useState } from "react";
import Search from "../Search/Search";

import { useDispatch, useSelector } from "react-redux";
import { getPositions, selectGroup, setResetGroup } from "../../app/features/group/groupSlice";
import Nums from "../SettingsDraft/Nums";
import {
  delPauseId,
  delTeamsRound,
  selectDraftConfig,
  setDraftPlayersAction,
  setStatus,
  setTeamRemoveId,
  setTradeValue,
} from "../../app/features/draftConfig/draftConfigSlice";
// Img

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
import { delPlayersDraft, selectPlayersDraft, setCurrentPage, setPlayerItems, setPositionPlayersDraft, setSearchPlayers } from "../../app/features/playersDraft/playersDraftSlice";

const PageSize = 6;
const DraftPlayerChoose = ({playersDraft,draftStatus, setThisId, setChangeId,}) => {

  
  const groups = useSelector(selectGroup);
  const {draftPlayers,tradeValue,countRender} = useSelector(selectDraftConfig);
  console.log('tradeValue :', tradeValue.results[countRender].round  );
  const dispatch = useDispatch()
  const { teamSelectId} = useSelector(selectDraftConfig);
  const { position} = useSelector(selectPlayersDraft);
  const draftBtnDisable = draftStatus === 'red' ? true : false
  const shouldLog = useRef(true);
  const initial = useRef(true);
  const [searchValue, setSearchValue] = useState("");

  const currentTableData = useMemo(() => {
  
    const firstPageIndex = (playersDraft.currentPage - 1) * PageSize;
  
    const lastPageIndex = firstPageIndex + PageSize;
    
    if(draftPlayers.length > 0) {
      let playersData = playersDraft.results
      if(playersDraft.search) {
        playersData = playersDraft.results.filter(player => {
          const name = player.player.toLowerCase()
          return name.includes(playersDraft.search)
        })
      }
      if(playersDraft.position && playersDraft.position !== "All") {
        playersData = playersDraft.results.filter(player => {
          const position = player.position
           return position.includes(playersDraft.position)
      })
      }

      const playersDataSlice = playersData.slice(firstPageIndex, lastPageIndex)
      return {playersData, playersDataSlice};
    } else {
      const playersDataSlice = playersDraft.results.slice(firstPageIndex, lastPageIndex)
      const playersData= playersDraft.results
      return {playersData, playersDataSlice}
    }
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playersDraft.currentPage,playersDraft.search,playersDraft.position]);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    
    const timer = setTimeout(() => {

      dispatch(setSearchPlayers(searchValue))
    }, 500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [setSearchValue, searchValue]);

  useEffect(()=> {
    
    dispatch(setPlayerItems(currentTableData.playersData))
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentTableData])

  useEffect(() => {
    if (shouldLog.current && groups.positions.length === 1) {
      shouldLog.current = false;
       dispatch(getPositions())
    }
    return () =>  dispatch(setResetGroup())
    // eslint-disable-next-line
  }, []);
  


  const playerConcat = (playerItem,teamId) => {
    
    const teamItem = structuredClone(tradeValue.results[teamId - 1])
    teamItem["player"] = playerItem

    const newTradeValue = tradeValue.results.map((item) => {
      if(item.index === teamItem.index) {
        return teamItem
      }
      return item
    })
    let playersData = playersDraft.results.filter(player => playerItem.id !== player.id)
    dispatch(setPlayerItems(playersData))
    dispatch(delPlayersDraft([playerItem]))
    dispatch(setTradeValue({...tradeValue,results:newTradeValue}))
    dispatch(setDraftPlayersAction(teamItem))

 
  }
  return (
    <Wrapper>
      <SelectTeam>
        <div className="team">
          <img src={tradeValue?.results[countRender].round.logo} alt="" width={60}/>
          <h2>{tradeValue?.results[countRender].round.name}</h2>
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
          console.log('item :', item);
            const id = idx + 1;
            return (
              <NumItem
                key={id}
                onClick={() => {
                  
                  dispatch(setPositionPlayersDraft(item.split(" ")[0]))
                  }
                }
                className={
                  position === (item.split(" ")[0]) ? "active" : null
                }
              >
                <Nums num={item.split(" ")[0]} />
              </NumItem>
            );
          })}
      </NumWrapper>
      <DraftPlayerWrapper>
        <DraftPlayerItems>
        
    {playersDraft.loading ? (<Spinner />):(
        <>
        {playersDraft.results.length > 0 &&
          
          currentTableData.playersDataSlice.map((item, idx) => {
            return (
              <DraftPlayerItem key={idx}>
                <div className="player-draft">
                  <div className="player-td player-rank">
                    <p>Rank</p>
                    <span>{item.ranking}</span>
                  </div>
                  <div className="player-td player-adp">
                    <p>ADP</p>
                    <span>{item?.adp}</span>
                  </div>
                  {/* <img src={playerImg} alt="" /> */}
                  <h4 className="player-td player-name">{item.player}</h4>
                  <h4 className="player-td player-position">{item.position}</h4>
                  {/* <img src={colleageImg} alt="" /> */}
                  <h4 className="player-td playyer-college">{item.school}</h4>
                  <img src={infoImg} alt="" />
                  <button className="player-td player-draft-btn" disabled={draftBtnDisable} onClick={() => {
                    const playerItem = item
                    const teamId = teamSelectId[0]
                    playerConcat(playerItem,teamId)
                    dispatch(delTeamsRound(teamId))
                    dispatch(setTeamRemoveId(teamSelectId[0]))
                    setThisId(teamSelectId[0]);
                    setChangeId(teamSelectId[0]);
                    
                    }}>Draft</button> 
                </div>
              </DraftPlayerItem>
            );
          })}
       
        <Pagination
            totalCount={currentTableData.playersData.length}
            pageSize={PageSize}
            currentPage={playersDraft.currentPage}
            previous={playersDraft.previous}
            next={playersDraft.next}
            onPageChange={(page) => {
              dispatch(setCurrentPage(page));
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
