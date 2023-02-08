import { Modal } from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTradeValue,
  selectDraftConfig,
  setChangeTrade,
  setTeamPickIndex,
} from "../../app/features/draftConfig/draftConfigSlice";
// utils
import { getFilterTwoData, objectSet, toggleArrObj } from "../../utils/utils";
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

const ModalTrades = ({ tradeValue, teamSelect }) => {
  const { teamPickIndex } = useSelector(selectDraftConfig);
  const myTeamSelect = useMemo(() => {
    const teamSelectName = teamSelect.map((item) => item.name);
    const mySelectArr = getFilterTwoData(
      tradeValue,
      teamSelectName,
      "round",
      "name",
      "AND"
    );
    const setObject = objectSet(mySelectArr, "tm");
    return { mySelectArr, mySelect: setObject };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSelect]);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(setChangeTrade(true));
  };

  const [teamPlayer, setTeamPlayer] = useState("Select Player");
  const [teamMain, setTeamMain] = useState(tradeValue[0].tm);
  const [myTeam, setMyTeam] = useState(myTeamSelect.mySelect[0].tm);
  const [myTeamPick, setMyTeamPick] = useState([]);
  const [teamPick, setTeamPick] = useState([]);
  const [teamTrade, setTeamTrade] = useState(null);
  const [yourTeamTrade, setYourTeamTrade] = useState(null);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [notAccept, setNotAccept] = useState(false);
  const handlePickIndex = (pickArr, value, setPick) => {
    const newMyPickIndex = toggleArrObj(pickArr, value, (value) => value);
    setPick(newMyPickIndex);
  };

  const changeTeam = (teamPick, myTeamPick, tradeValue) => {
    const acceptTeam = changeTeamPick(teamPick, myTeamPick, tradeValue);
    const teamTradeFind = tradeValue.find((item) => item.tm === teamMain);
    const myTradeFind = tradeValue.find((item) => item.tm === myTeam);
    if (acceptTeam.acceptStatus) {
      let newTradePickIndex = [
        ...acceptTeam.teamPickIndex,
        ...teamPickIndex.filter(
          (item) => !acceptTeam.myTeamPickIndex.includes(item)
        ),
      ];
      setTeamTrade(teamTradeFind);
      setYourTeamTrade(myTradeFind);
      dispatch(setTeamPickIndex(newTradePickIndex));
      dispatch(changeTradeValue(acceptTeam.tradeValue));
      setAcceptTrade(acceptTeam.acceptStatus);
    } else {
      setNotAccept(!acceptTeam.acceptStatus);
    }
  };

  const handleTryAgain = () => {
    setMyTeamPick([]);
    setTeamPick([]);
    setAcceptTrade(false);
    setNotAccept(false);
  };
  const handleChangeTeam = (value, setTeam) => {
    setTeam(value);
    setMyTeamPick([]);
    setTeamPick([]);
    setAcceptTrade(false);
    setNotAccept(false);
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
                <p>Trade Not Accepted!</p>
              </ModalStatus>
            )}
            <ModalBodyItems>
              <ModalBodyItem>
                <h3>Select a team to trade with</h3>
                <MySelectTeam
                  name={teamMain}
                  dataValue={tradeValue}
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
                        if (item.tm === teamMain) {
                          return (
                            <div
                              className={
                                teamPick.includes(item.index)
                                  ? "pick-index active"
                                  : "pick-index"
                              }
                              onClick={() =>
                                handlePickIndex(
                                  teamPick,
                                  item.index,
                                  setTeamPick
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
                <MySelectPlayer
                  name={teamPlayer}
                  dataValue={["Select Player", "Jhon", "Smith"]}
                  handleChange={(item) => setTeamPlayer(item.value)}
                />
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
                      {myTeamSelect.mySelectArr.map((item) => {
                        if (item.tm === myTeam) {
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
                  name={teamPlayer}
                  dataValue={["Select Player", "Varane", "Benzema"]}
                  handleChange={(item) => setTeamPlayer(item.value)}
                />
              </ModalBodyItem>
            </ModalBodyItems>

            <BtnWrap>
              <button
                onClick={() => changeTeam(teamPick, myTeamPick, tradeValue)}
              >
                Offer Trade
              </button>
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
