import { Modal } from "@mui/material";
import React, { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changetradesTeams,
  changeTradeTeam,
  changeTradeValue,
  selectDraftConfig,
  setChangeTrade,
  setTeamPickIndex,
} from "../../app/features/draftConfig/draftConfigSlice";
import {
  getMyTradesPlayer,
  getTradesPlayer,
  historyTradesAction,
  selectTrades,
  setChangeTrades,
  setHistoryTrades,
  setMyTradesPlayers,
  setTeamTradeValue,
  setTradePlayerYears,
  setTradesPlayers,
} from "../../app/features/trades/tradesSlice";
import SessionStorageService from "../../service/session.service";
// utils
import {
  getFilterTwoData,
  objectDeleteValue,
  objectSet,
  toggleArrObj,
} from "../../utils/utils";
// icons
import { CloseIcon } from "../Icons/Icons";
import MySelectPlayer from "../MySelect/MySelectPlayer";
import MySelectTeam from "../MySelect/MySelectTeam";
// styles
import {
  BtnWrap,
  ModalBody,
  ModalBodyItem,
  ModalBodyItems,
  ModalHeader,
  ModalStatus,
  ModalWrap,
  PickItem,
  PickItems,
  PlayerItem,
  TradeTeam,
  TradeTeamItem,
} from "./ModalTrades.styles";
import changeTeamPick from "./modalTradesFunc";

const SELECT_PLAYERS = "Select Player";

const ModalTrades = ({ tradesTeams, teamSelect }) => {

  const { teamPickIndex } = useSelector(selectDraftConfig);
  const { tradeValue, tradesPlayers, myTradesPlayers, tradePlayerYears } =
    useSelector(selectTrades);
  const myTeamSelect = useMemo(() => {
    const teamSelectName = teamSelect.map((item) => item.name);
    const mySelectArr = getFilterTwoData(
      tradesTeams,
      teamSelectName,
      "name",
      "",
      "AND"
    );
    const setObject = objectSet(mySelectArr, "name");
    return { mySelectArr, mySelect: setObject };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSelect]);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(setChangeTrades(true));
    SessionStorageService.removeItem("trade");
  };

  const [teamPlayer, setTeamPlayer] = useState(SELECT_PLAYERS);
  const [teamMyPlayer, setTeamMyPlayer] = useState(SELECT_PLAYERS);
  const [changeTeamPlayer, setChangeTeamPlayer] = useState();
  const [changeMyTeamPlayer, setChangeMyTeamPlayer] = useState();
  const [teamMain, setTeamMain] = useState(tradesTeams[0].name);
  const [teamMainData, setTeamMainData] = useState({});
  const [myTeam, setMyTeam] = useState(myTeamSelect.mySelect[0].name);
  const [myTeamData, setMyTeamData] = useState({});
  const [myTeamPick, setMyTeamPick] = useState([]);
  const [teamPick, setTeamPick] = useState([]);
  const [myPickNextYear,setMyPickNextYear] = useState([])
  const [mainPickNextYear,setMainPickNextYear] = useState([])
  const [myTeamPickYear, setMyTeamPickYear] = useState([]);
  const [teamPickYear, setTeamPickYear] = useState([]);
  const [teamTrade, setTeamTrade] = useState(null);
  const [yourTeamTrade, setYourTeamTrade] = useState(null);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [notAccept, setNotAccept] = useState(false);
  const [acceptCount, setAcceptCount] = useState(10);

  
  const handlePickIndex = (pickArr, value, setPick) => {
    const newMyPickIndex = toggleArrObj(pickArr, value, (value) => value);
    setPick(newMyPickIndex);
  };
  const handlePickNextYearIndex = (pickArr, id, setPick) => {
    const newMyPickIndex = toggleArrObj(pickArr, id, (id) => id);
    setPick(newMyPickIndex);
  };
  useEffect(() => {
    return () => {
      dispatch(setTradesPlayers([]));
      dispatch(setMyTradesPlayers([]));
      SessionStorageService.removeItem("trade");
    };
  }, []);

  const teamMainFunc = () => {
    debugger
const teamFind = tradesTeams.find((item) => teamMain === item.name);
const pick2024 = [];
tradeValue.forEach((item) => {
  if (item.round.name === teamFind.name) {
    pick2024.push({
      round: `R${item.round_index_number}`,
      id: item.id,
      value: item.value,
    });
  }
});
let teamMainData = {};
let teamMainFind = tradeValue.find((item) => item.round.name === teamMain);
if (teamMainFind) {
  teamMainData = objectDeleteValue({
    objectData: teamMainFind,
    deleteKey: ["value", "round_index_number", "round_index", "index", "pick"],
  });

  setTeamMainData(teamMainData);

  // const tradePlayers = SessionStorageService.getItem("trade");
  if (tradePlayerYears) {
    const tradePlayersName = tradePlayerYears.map((item) => item.name);
    if (tradePlayersName.includes(teamMain)) {
      const myTradePlayersArr = tradePlayerYears.filter(
        (item) => item.name === teamMain
      );
      dispatch(setTradesPlayers(myTradePlayersArr[0].players));
      setMainPickNextYear(myTradePlayersArr[0].years);
    } else {
      dispatch(getTradesPlayer({ id: teamFind.id }));
      setMainPickNextYear(pick2024);
    }
  } else {
    dispatch(getTradesPlayer({ id: teamFind.id }));
    setMainPickNextYear(pick2024);
  }
}
  }
  // Player, Next Year Pick Team Main
  useEffect(() => {
    
    teamMainFunc()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamMain,myTeam, tradeValue]);

  const myTeamFunc = () => {
 const teamFind = tradesTeams.find((item) => myTeam === item.name);
 let myTeamMainFind = tradeValue.find((item) => item.round.name === myTeam);
 const pick2024 = [];
 tradeValue.forEach((item) => {
   if (item.round.name === teamFind.name) {
     pick2024.push({
       round: `R${item.round_index_number}`,
       id: item.id,
       value: item.value,
     });
   }
 });
 let myTeamMainData = {};
 if (myTeamMainFind) {
   myTeamMainData = objectDeleteValue({
     objectData: myTeamMainFind,
     deleteKey: ["value", "round_index_number", "round_index", "index", "pick"],
   });

   setMyTeamData(myTeamMainData);

   // const myTradePlayers = SessionStorageService.getItem("trade");

   if (tradePlayerYears) {
     const myTradePlayersName = tradePlayerYears?.map((item) => item.name);
     if (myTradePlayersName.includes(myTeam)) {
       const tradePlayersArr = tradePlayerYears.filter(
         (item) => item.name === myTeam
       );
       dispatch(setMyTradesPlayers(tradePlayersArr[0].players));
       setMyPickNextYear(tradePlayersArr[0].years);
     } else {
       dispatch(getMyTradesPlayer({ id: teamFind.id }));
       setMyPickNextYear(pick2024);
     }
   } else {
     dispatch(getMyTradesPlayer({ id: teamFind.id }));
     setMyPickNextYear(pick2024);
   }
 }
  }
  // Player, Next Year Pick MyTeam
  useEffect(() => {
    myTeamFunc()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myTeam,teamMain, tradeValue]);

  const changeAccept = useMemo(
    () =>
      ({
        teamPick,
        myTeamPick,
        teamPlayer,
        teamMyPlayer,
        tradeValue,
        tradesPlayers,
        myTradesPlayers,
      }) => {
        const teamPickValue = tradeValue.reduce((acc, item) => {
          if (teamPick.includes(item.index)) {
            return acc + parseInt(item.value);
          } else return acc + 0;
        }, 0);
        const teamPickYearValue = mainPickNextYear.reduce((acc, item) => {
          if (teamPickYear.includes(item.id)) {
            return acc + parseInt(item.value);
          } else return acc + 0;
        }, 0);
        const teamPlayerValue = tradesPlayers.reduce((acc, item) => {
          if (teamPlayer === item.player) {
            return acc + parseInt(item.value);
          } else return acc + 0;
        }, 0);
        const myTeamPickValue = tradeValue.reduce((acc, item) => {
          if (myTeamPick.includes(item.index)) {
            return acc + parseInt(item.value);
          } else return acc + 0;
        }, 0);
        const myTeamPickYearValue = myPickNextYear.reduce((acc, item) => {
          if (myTeamPickYear.includes(item.id)) {
            return acc + parseInt(item.value);
          } else return acc + 0;
        }, 0);
        const teamMyPlayerValue = myTradesPlayers.reduce((acc, item) => {
          if (teamMyPlayer === item.player) {
            return acc + parseInt(item.value);
          } else return acc + 0;
        }, 0);
        const value =
          teamPickValue +
          teamPlayerValue +
          teamPickYearValue -
          (myTeamPickValue + teamMyPlayerValue + myTeamPickYearValue);
        return value <= 50;

        // eslint-disable-next-line react-hooks/exhaustive-deps
      },
    []
  );
  const changeTeam = ({
    teamPick,
    myTeamPick,
    tradeValue,
    teamPlayer,
    teamMyPlayer,
  }) => {
    const teamTradeFind = tradeValue.find(
      (item) => item.round.name === teamMain
    );
    
    const myTradeFind = tradeValue.find((item) => item.round.name === myTeam);
    const acceptFlag = changeAccept({
      teamPick,
      teamPickYear,
      myTeamPick,
      myTeamPickYear,
      teamPlayer,
      teamMyPlayer,
      tradeValue,
      tradesPlayers,
      myTradesPlayers,
    });
    if (acceptFlag) {
      const newTradesValue = changeTeamPick({
        teamPick,
        myTeamPick,
        tradeValue,
        acceptFlag,
        teamMainData,
        myTeamData,
      });
      debugger
      let newTradePickIndex = [
        ...newTradesValue.teamPickIndex,
        ...teamPickIndex.filter(
          (item) => !newTradesValue.myTeamPickIndex.includes(item)
        ),
      ];

      dispatch(setTeamTradeValue(newTradesValue.tradeValue));
      dispatch(changeTradeTeam(newTradesValue.tradeValue));
      dispatch(setTeamPickIndex(newTradePickIndex));

      setTeamTrade(teamTradeFind);
      setYourTeamTrade(myTradeFind);
      const myTeamName = myTradeFind.round.name;
      const teamName = teamTradeFind.round.name;
      const playerMyTrades = tradesPlayers.find(
        (item) => item.player === teamPlayer
      );
      const playerMainTrades = myTradesPlayers.find(
        (item) => item.player === teamMyPlayer
      );
      const mainYearNextPick = mainPickNextYear.filter(item => teamPickYear.includes(item.id))
      const myYearNextPick = myPickNextYear.filter((item) =>
        myTeamPickYear.includes(item.id)
      );
      const mainYearNextYear = mainPickNextYear.filter(item => !teamPickYear.includes(item.id))
      if(myYearNextPick) {
        mainYearNextYear.unshift(...myYearNextPick);

      }

      const myYearNextYear = myPickNextYear.filter(
        (item) => !myTeamPickYear.includes(item.id)
      );
      if (mainYearNextPick) {
        myYearNextYear.unshift(...mainYearNextPick);
      }
      // const sessionData = SessionStorageService.getItem("trade");
      const tradesPlayerNew = tradesPlayers.filter(
        (item) => item.player !== teamPlayer
      );
      if (playerMainTrades) {
        tradesPlayerNew.unshift(playerMainTrades);
      }


      const myTradesPlayerNew = myTradesPlayers.filter(
        (item) => item.player !== teamMyPlayer
      );
      if (playerMyTrades) {
        myTradesPlayerNew.unshift(playerMyTrades);
      }

      
      // const myTradesNextYear = 
      const newTradePlayers = [
        {
          name: myTeamName,
          players: myTradesPlayerNew,
          years: myYearNextYear,
         
        },
        {
          name: teamMain,
          players: tradesPlayerNew,
          years: mainYearNextYear,
         
        },
      ];
      if (!tradePlayerYears.length ) {
        dispatch(setTradePlayerYears([...newTradePlayers]));
      }
      if (tradePlayerYears.length > 0) {
        
        const xoski = tradePlayerYears.filter(item => {
          if(item.name !== myTeamName && item.name !== teamMain ) {
            return item
          }
        })
         xoski.push(...newTradePlayers);
        const newSessionData = xoski.map((item) => {
          if (item.name === myTeamName) {
            return {
              ...item,
              players: myTradesPlayerNew,
              years: myPickNextYear,
            };
          }
          if (item.name === teamName) {
            return {
              ...item,
              players: tradesPlayerNew,
              years: mainYearNextYear,
            };
          }
          return item;
        });
        dispatch(setTradePlayerYears([...newSessionData]));
        
      }
      const historyData = {
        myTeam: myTeamName,
        player: playerMyTrades,
        pick: teamPick,
        nextYears: mainYearNextPick,
        round: myTradeFind,
        tradeTeam: teamName,
        playerMain: playerMainTrades,
        pickMain: myTeamPick,
        roundMain: teamTradeFind,
        mainNextYears: mainYearNextPick,
      };

      setAcceptTrade(acceptFlag);
      setChangeMyTeamPlayer(playerMyTrades);
      setChangeTeamPlayer(playerMainTrades);
      //  setMainPickNextYear(mainYearNextYear);
      //  setMyPickNextYear(myYearNextYear);
      dispatch(historyTradesAction(historyData));
      dispatch(setTradesPlayers(newTradePlayers[1].players));
      dispatch(setMyTradesPlayers(newTradePlayers[0].players));
    } else {
      acceptCount !== 0 && setAcceptCount((prev) => --prev);
      setNotAccept(!acceptFlag);
    }
  };

  const handleTryAgain = () => {
    setMyTeamPick([]);
    setTeamPick([]);
    setAcceptTrade(false);
    setNotAccept(false);
    setAcceptCount(10);
    setTeamPlayer(SELECT_PLAYERS);
    setTeamMyPlayer(SELECT_PLAYERS);
    setMyPickNextYear([]);
    setMainPickNextYear([]);
    setMyTeamPickYear([])
    setTeamPickYear([]);
    myTeamFunc();
    teamMainFunc()
  };
  const handleChangeTeam = (value, setTeam) => {
    setTeam(value);
    setTeamPlayer(SELECT_PLAYERS);
    setTeamMyPlayer(SELECT_PLAYERS);
    setMyTeamPick([]);
    setTeamPick([]);
    setAcceptTrade(false);
    setNotAccept(false);
    setAcceptCount(10);
    dispatch(setTradesPlayers([]));
    dispatch(setMyTradesPlayers([]));
  };

  console.log("myPickNextYear",myPickNextYear);
  console.log("teamPickYear", teamPickYear);
  return (
    <Modal open={open}>
      <ModalWrap>
        <ModalHeader>
          <h2>Offer Trades</h2>
          <button onClick={handleClose}>
            <CloseIcon />
          </button>
        </ModalHeader>
        {!acceptTrade && (
          <ModalBody>
            {notAccept && (
              <ModalStatus status={!notAccept}>
                <p>
                  Trade Not Accepted! ( <span>{acceptCount}</span> attempts
                  remaining)
                </p>
              </ModalStatus>
            )}
            <ModalBodyItems>
              <ModalBodyItem>
                <h3>Select a team to trade with</h3>
                <MySelectTeam
                  name={teamMain}
                  dataValue={tradesTeams}
                  disabled={myTeam}
                  handleChange={(item) =>
                    handleChangeTeam(item.value, setTeamMain)
                  }
                />
                <PickItems>
                  <PickItem>
                    <div className="year">2023</div>
                    <div className="pick-index-wrap">
                      {tradeValue.map((item, idx) => {
                        if (item.round.name === teamMain) {
                          return (
                            <div
                              key={idx}
                              className={
                                teamPick.includes(item.index)
                                  ? "pick-index active"
                                  : "pick-index"
                              }
                              onClick={() => {
                                handlePickIndex(
                                  teamPick,
                                  item.index,
                                  setTeamPick
                                );
                              }}
                            >
                              {item.index}
                            </div>
                          );
                        } else return null;
                      })}
                    </div>
                  </PickItem>
                  <PickItem>
                    <div className="year">2024</div>
                    <div className="pick-index-wrap">
                      {mainPickNextYear.map((item, idx) => {
                        // if (item.round.name === teamMain) {
                        return (
                          <div
                            key={idx}
                            className={
                              teamPickYear.includes(item.id)
                                ? "pick-index active"
                                : "pick-index"
                            }
                            onClick={() => {
                              handlePickNextYearIndex(
                                teamPickYear,
                                item.id,
                                setTeamPickYear
                              );
                            }}
                          >
                            {item.round}
                          </div>
                        );
                        // } else return null;
                      })}
                    </div>
                  </PickItem>
                </PickItems>
                {tradesPlayers.length > 1 && (
                  <MySelectPlayer
                    name={teamPlayer}
                    dataValue={[
                      { player: SELECT_PLAYERS, position: "" },
                      ...tradesPlayers,
                    ]}
                    handleChange={(item) => {
                      setTeamPlayer(item.value);
                    }}
                  />
                )}
              </ModalBodyItem>
              <ModalBodyItem>
                <div className="line" />
              </ModalBodyItem>
              <ModalBodyItem>
                <h3>Select one of your teams</h3>
                <MySelectTeam
                  name={myTeam}
                  dataValue={myTeamSelect.mySelect}
                  handleChange={(item) =>
                    handleChangeTeam(item.value, setMyTeam)
                  }
                />
                <PickItems>
                  <PickItem>
                    <div className="year">2023</div>
                    <div className="pick-index-wrap">
                      {tradeValue.map((item) => {
                        if (item.round.name === myTeam) {
                          return (
                            <div
                              className={
                                myTeamPick.includes(item.index)
                                  ? "pick-index active"
                                  : "pick-index"
                              }
                              onClick={() =>
                                handlePickIndex(
                                  myTeamPick,
                                  item.index,
                                  setMyTeamPick
                                )
                              }
                            >
                              {item.index}
                            </div>
                          );
                        } else return null;
                      })}
                    </div>
                  </PickItem>
                  <PickItem>
                    <div className="year">2024</div>
                    <div className="pick-index-wrap">
                      {myPickNextYear.map((item) => {
                        // if (item.round.name === myTeam) {
                        return (
                          <div
                            className={
                              myTeamPickYear.includes(item.id)
                                ? "pick-index active"
                                : "pick-index"
                            }
                            onClick={() =>
                              handlePickNextYearIndex(
                                myTeamPickYear,
                                item.id,
                                setMyTeamPickYear
                              )
                            }
                          >
                            {item.round}
                          </div>
                        );
                        // } else return null;
                      })}
                    </div>
                  </PickItem>
                </PickItems>
                <MySelectPlayer
                  name={teamMyPlayer}
                  dataValue={[
                    { player: SELECT_PLAYERS, position: "" },
                    ...myTradesPlayers,
                  ]}
                  handleChange={(item) => setTeamMyPlayer(item.value)}
                />
              </ModalBodyItem>
            </ModalBodyItems>

            <BtnWrap>
              {acceptCount !== 0 ? (
                <button
                  onClick={() =>
                    changeTeam({
                      teamPick,
                      myTeamPick,
                      tradesTeams,
                      tradeValue,
                      teamPlayer,
                      teamMyPlayer,
                    })
                  }
                >
                  Offer Trade
                </button>
              ) : null}

              <button onClick={handleClose}>Start Draft</button>
            </BtnWrap>
          </ModalBody>
        )}
        {acceptTrade && (
          <ModalBody>
            <ModalStatus status={acceptTrade}>
              <p>Trade Accepted!</p>
            </ModalStatus>
            <ModalBodyItems>
              <TradeTeamItem>
                <h3>Team to trade with </h3>
                <TradeTeam>
                  <img src={teamTrade.round.logo} alt={teamTrade.tm} />
                  <p>{teamTrade.tm}</p>
                </TradeTeam>
                <PickItem>
                  <div className="year">2023</div>
                  {teamPick.map((item) => {
                    return <div className="pick-change">{item}</div>;
                  })}
                </PickItem>
                <PickItem>
                  <div className="year">2024</div>
                  {mainPickNextYear.map((item) => {
                    if (myTeamPickYear.includes(item.id)) {
                      return <div className="pick-change">{item.round}</div>;
                    } else {
                      return null;
                    }
                  })}
                </PickItem>
                <PlayerItem>
                  <div className="player">Player</div>
                  <p className="player-name">
                    <span>{changeTeamPlayer?.position} </span>
                    {changeTeamPlayer?.player}
                  </p>
                </PlayerItem>
              </TradeTeamItem>
              <ModalBodyItem>
                <div className="line" />
              </ModalBodyItem>
              <TradeTeamItem>
                <h3>Your team</h3>
                <TradeTeam>
                  <img src={yourTeamTrade.round.logo} alt={yourTeamTrade.tm} />
                  <p>{yourTeamTrade.tm}</p>
                </TradeTeam>
                <PickItem>
                  <div className="year">2023</div>
                  {myTeamPick.map((item) => {
                    return <div className="pick-change">{item}</div>;
                  })}
                </PickItem>
                <PickItem>
                  <div className="year">2024</div>
                  
                  
                  {myPickNextYear.map((item) => {
                    debugger
                    if (teamPickYear.includes(item.id)) {
                      return <div className="pick-change">{item.round}</div>;
                    } else {
                      return null;
                    }
                  })}
                </PickItem>
                <PlayerItem>
                  <div className="player">Player</div>
                  <p className="player-name">
                    <span>{changeMyTeamPlayer?.position} </span>
                    {changeMyTeamPlayer?.player}
                  </p>
                </PlayerItem>
              </TradeTeamItem>
            </ModalBodyItems>
            <BtnWrap>
              <button onClick={() => handleTryAgain()}>Trade Again</button>
              <button onClick={handleClose}>Start Draft</button>
            </BtnWrap>
          </ModalBody>
        )}
      </ModalWrap>
    </Modal>
  );
};

export default ModalTrades;
