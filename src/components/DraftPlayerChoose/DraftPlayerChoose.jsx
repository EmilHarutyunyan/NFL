import React, { useEffect, useMemo, useRef, useState } from "react";
import Search from "../Search/Search";

import { useDispatch, useSelector } from "react-redux";
import { selectGroup } from "../../app/features/group/groupSlice";
import Nums from "../SettingsDraft/Nums";
import {
  delPauseId,
  delTeamsRound,
  selectDraftConfig,
  setDraftPlayersAction,
  setStatus,
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
import {
  delPlayersDraft,
  selectPlayersDraft,
  setCurrentPage,
  setPlayerItems,
  setPositionPlayersDraft,
  setSearchPlayers,
} from "../../app/features/playersDraft/playersDraftSlice";
import { pricentPick, upUsersCals } from "../../utils/utils";

const PageSize = 6;
const DraftPlayerChoose = ({
  playersDraft,
  draftStatus,
  setThisId,
  setChangeId,
}) => {
  const groups = useSelector(selectGroup);
  const { draftPlayers, tradeValue, countRender, round, status,teams,teamSelectId } =
    useSelector(selectDraftConfig);
  const dispatch = useDispatch();

  const { position, playerItems } = useSelector(selectPlayersDraft);

  const draftBtnDisable = draftStatus === "red" ? true : false;
  const initial = useRef(true);
  const [searchValue, setSearchValue] = useState("");


  const currentTableData = useMemo(() => {
    const firstPageIndex = (playersDraft.currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (draftPlayers.length > 0) {
      let playersData = playersDraft.results;

      if (playersDraft.search) {
        playersData = playersDraft.results.filter((player) => {
          const name = player.player.toLowerCase();
          return name.includes(playersDraft.search);
        });
      }
      if (playersDraft.position && playersDraft.position !== "All") {
        playersData = playersDraft.results.filter((player) => {
          const position = player.position;
          return position.includes(playersDraft.position);
        });
      }

      const playersDataSlice = playersData.slice(firstPageIndex, lastPageIndex);
      return { playersData, playersDataSlice };
    } else {
      const playersDataSlice = playersDraft.results.slice(
        firstPageIndex,
        lastPageIndex
      );
      const playersData = playersDraft.results;
      return { playersData, playersDataSlice };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playersDraft.currentPage, playersDraft.search, playersDraft.position]);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      dispatch(setSearchPlayers(searchValue));
    }, 500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [setSearchValue, searchValue]);

  useEffect(() => {
    dispatch(setPlayerItems(currentTableData.playersData));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTableData]);

  const playerConcat = (playerItem, teamId,upPlayers={}) => {
    const teamItem = structuredClone(tradeValue.results[teamId - 1]);
    teamItem["player"] = playerItem;

    const newTradeValue = tradeValue.results.map((item) => {
      if (item.index === teamItem.index) {
        return teamItem;
      }
      return item;
    });
    let playersData = playersDraft.results.filter(
      (player) => playerItem.id !== player.id
    );
    dispatch(setPlayerItems(playersData));
    dispatch(delPlayersDraft([playerItem]));
    dispatch(setTradeValue({ ...tradeValue, results: newTradeValue }));
    dispatch(setDraftPlayersAction({...teamItem,upPlayers}));
  };
  
  const playerChoose = (item,idx) => {
    let team = (teamSelectId[0] - (+round - 1) * 32)
    let playerItem = {...item}
    let pricentPlayers = []
    
    if(+round > 1) {
      for(let i = 0; i < +round; ++i) {
        if(teamSelectId[0] - 32*i <= 32 && teamSelectId[0] - 32*i >= 1) {
          team = teamSelectId[0] - 32*i
          break;
        } 
      }
    }
    const teamName = teams[team - 1].name
    if(teams[team - 1].adp  >= item[teamName]) {
      const pricentValue = pricentPick(teams[team - 1].adp,item[teamName])
      
      pricentPlayers = upUsersCals(playerItems.slice(0,idx+1),pricentValue,teamName)
      playerItem = {...item,[teamName]:item.value + pricentValue}
    }

    
    dispatch(setCurrentPage(1));
    dispatch(setPositionPlayersDraft("All"));
    playerConcat(playerItem, teamSelectId[0], pricentPlayers,);
    dispatch(delTeamsRound(teamSelectId[0]));
    setThisId(teamSelectId[0]);
    setChangeId(true);
    
    
  }
  return (
    <>
      {playersDraft.loading ? (
        <Spinner />
      ) : (
        <Wrapper>
          <SelectTeam>
            <div className="team">
              {tradeValue?.results && (
                <>
                  <img
                    src={
                      status === "red"
                        ? tradeValue?.results[countRender - 1].round.logo
                        : tradeValue?.results[countRender].round.logo
                    }
                    alt=""
                    width={60}
                  />
                  <h2>
                    {status === "red"
                      ? tradeValue?.results[countRender - 1].round.name
                      : tradeValue?.results[countRender].round.name}
                  </h2>
                </>
              )}
            </div>
            <div className="team-info">
              <p>Remaning piks</p>
              <p>{round}</p>
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
                      dispatch(setCurrentPage(1));
                      dispatch(setPositionPlayersDraft(item.split(" ")[0]));
                    }}
                    className={
                      position === item.split(" ")[0] ? "active" : null
                    }
                  >
                    <Nums num={item.split(" ")[0]} />
                  </NumItem>
                );
              })}
          </NumWrapper>
          <DraftPlayerWrapper>
            <DraftPlayerItems>
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
                          <h4 className="player-td player-name">
                            {item.player}
                          </h4>
                          <h4 className="player-td player-position">
                            {item.position}
                          </h4>
                          {/* <img src={colleageImg} alt="" /> */}
                          <h4 className="player-td playyer-college">
                            {item.school}
                          </h4>
                          <img src={infoImg} alt="" />
                          <button
                            className="player-td player-draft-btn"
                            disabled={draftBtnDisable}
                            onClick={()=>playerChoose(item,idx)}
                          >
                            Draft
                          </button>
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
            </DraftPlayerItems>
            {draftBtnDisable && (
              <div className="player-draft-btn-wrap">
                <button
                  className="player-draft-btn"
                  onClick={() => {
                    dispatch(setStatus("green"));
                    dispatch(delPauseId());
                  }}
                >
                  <img src={pauseImg} alt="play_pause" />
                  <span>Start Draft</span>
                </button>
              </div>
            )}
          </DraftPlayerWrapper>
        </Wrapper>
      )}
    </>
  );
};

export default DraftPlayerChoose;
