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
  setTeamTradeValue,
} from "../../app/features/trades/tradesSlice";
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
  TradeTeam,
  TradeTeamItem,
} from "./ModalTrades.styles";
import changeTeamPick from "./modalTradesFunc";

const SELECT_PLAYERS = "Select Player";

const ModalTrades = ({ tradesTeams, teamSelect }) => {
  const { teamPickIndex } = useSelector(selectDraftConfig);
  const { tradeValue, tradesPlayers, myTradesPlayers } =
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
  };

  const [teamPlayer, setTeamPlayer] = useState(SELECT_PLAYERS);
  const [teamMyPlayer, setTeamMyPlayer] = useState(SELECT_PLAYERS);
  const [teamMain, setTeamMain] = useState(tradesTeams[0].name);
  const [teamMainData, setTeamMainData] = useState({});
  const [myTeam, setMyTeam] = useState(myTeamSelect.mySelect[0].name);
  const [myTeamData, setMyTeamData] = useState({});
  const [myTeamPick, setMyTeamPick] = useState([]);
  const [teamPick, setTeamPick] = useState([]);
  const [teamTrade, setTeamTrade] = useState(null);
  const [yourTeamTrade, setYourTeamTrade] = useState(null);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [notAccept, setNotAccept] = useState(false);
  const [acceptCount, setAcceptCount] = useState(10);

  const handlePickIndex = (pickArr, value, setPick) => {
    const newMyPickIndex = toggleArrObj(pickArr, value, (value) => value);
    setPick(newMyPickIndex);
  };

  useEffect(() => {
    const teamFind = tradesTeams.find((item) => teamMain === item.name);
    let teamMainData = {};
    let teamMainFind = tradeValue.find((item) => item.round.name === teamMain);
    if (teamMainFind) {
      teamMainData = objectDeleteValue({
        objectData: teamMainFind,
        deleteKey: [
          "value",
          "round_index_number",
          "round_index",
          "index",
          "pick",
        ],
      });

      setTeamMainData(teamMainData);
      dispatch(getTradesPlayer({ id: teamFind.id }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamMain, tradeValue]);

  useEffect(() => {
    const teamFind = tradesTeams.find((item) => myTeam === item.name);
    let myTeamMainFind = tradeValue.find((item) => item.round.name === myTeam);
    let myTeamMainData = {};
    if (myTeamMainFind) {
      myTeamMainData = objectDeleteValue({
        objectData: myTeamMainFind,
        deleteKey: [
          "value",
          "round_index_number",
          "round_index",
          "index",
          "pick",
        ],
      });
      setMyTeamData(myTeamMainData);
      dispatch(getMyTradesPlayer({ id: teamFind.id }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myTeam, tradeValue]);

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
        const teamMyPlayerValue = myTradesPlayers.reduce((acc, item) => {
          if (teamMyPlayer === item.player) {
            return acc + parseInt(item.value);
          } else return acc + 0;
        }, 0);
        const value =
          teamPickValue +
          teamPlayerValue -
          (myTeamPickValue + teamMyPlayerValue);
        return value <= 50;

        // eslint-disable-next-line react-hooks/exhaustive-deps
      },
    []
  );
  const changeTeam = ({
    teamPick,
    myTeamPick,
    tradesTeams,
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
      myTeamPick,
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
      const myTeamName = myTradeFind.round.name
      let historyData = {};
      const historyArr =  [
          {
            myTeam: {
              player: myTradesPlayers.find(
                (item) => item.player === teamMyPlayer
              ),
              pick: teamPick,
              round: myTradeFind,
            },
            teamMain: {
              player: tradesPlayers.find((item) => item.player === teamPlayer),
              pick: myTeamPick,
              round: teamTradeFind,
            },
          },
        ]
      
      historyData[`${myTeamName}`] = historyArr;
      setAcceptTrade(acceptFlag);
      dispatch(historyTradesAction({historyData,teamName:myTeamName}));
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
  };
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
                      {tradeValue.map((item) => {
                        if (item.round.name === teamMain) {
                          return (
                            <div
                              className={
                                teamPick.includes(item.index)
                                  ? "pick-index active"
                                  : "pick-index"
                              }
                              onClick={() => {
                                console.log("teamPick", teamPick);
                                console.log("item.index", item.index);
                                console.log("item", item);

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
                      {Array.from({ length: 5 }, (_, i) => `R${i + 1}`).map(
                        (item) => {
                          return (
                            <div
                              className={
                                teamPick.includes(item)
                                  ? "pick-index active"
                                  : "pick-index"
                              }
                              onClick={() =>
                                handlePickIndex(teamPick, item, setTeamPick)
                              }
                            >
                              {item}
                            </div>
                          );
                        }
                      )}
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
                      const playerValue = tradesPlayers.find(
                        (el) => el.player === item.value
                      );

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
                      {Array.from({ length: 5 }, (_, i) => `R${i + 1}`).map(
                        (item) => {
                          return (
                            <div
                              className={
                                myTeamPick.includes(item)
                                  ? "pick-index active"
                                  : "pick-index"
                              }
                              onClick={() =>
                                handlePickIndex(myTeamPick, item, setMyTeamPick)
                              }
                            >
                              {item}
                            </div>
                          );
                        }
                      )}
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
                  <div>{teamPick.join(" ")}</div>
                </PickItem>
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
                  <div>{myTeamPick.join(" ")}</div>
                </PickItem>
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
