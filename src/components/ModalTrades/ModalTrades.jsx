import { Modal } from "@mui/material";
import React, { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTradeTeam,
  selectDraftConfig,
  setTeamPickIndex,
} from "../../app/features/draftConfig/draftConfigSlice";
import {
  changeTeamInfo,
  getTradesPlayer,
  selectTrades,
  setAcceptCount,
  setAcceptTrade,
  setChangeTrades,
  setNotAccept,
  setTeamTradeValue,
  teamAddPicks,
  teamMountAction,
} from "../../app/features/trades/tradesSlice";

// icons
import { CloseIcon } from "../Icons/Icons";
// styles
import {
  BtnWrap,
  ModalBody,
  ModalBodyItem,
  ModalBodyItems,
  ModalHeader,
  ModalStatus,
  ModalWrap,
} from "./ModalTrades.styles";
import changeTeamPick from "./modalTradesFunc";

// utils
import { objectDeleteValue } from "../../utils/utils";
import ModalChooseTeam from "./ModalChooseTeam";
import ModalResultTeam from "./ModalResultTeam";

const ModalTrades = ({ tradesTeams, teamSelect }) => {
  const { teamPickIndex } = useSelector(selectDraftConfig);
  const {
    tradeValue,
    mainTeam,
    myTeam,
    mainTeams,
    myTeams,
    acceptCount,
    notAccept,
    acceptTrade,
    historyTrades,
  } = useSelector(selectTrades);

  const [open, setOpen] = useState(true);
  const [openFlag, seOpenFlag] = useState(true);

  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    dispatch(setChangeTrades(true));
    seOpenFlag(false);
  };

  useEffect(() => {
    dispatch(teamMountAction({ team: tradesTeams[0], path: "mainTeam" }));
    dispatch(teamMountAction({ team: teamSelect[0], path: "myTeam" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mainTeamData = mainTeams?.filter(
      (item) => item.name === mainTeam.name
    );

    if (mainTeam?.name && tradeValue.length) {
      if (!mainTeamData.length) {
        const mainTeamAllInfo = tradeValue.filter(
          (item) => item.round.name === mainTeam.name
        );
        const picks = mainTeamAllInfo.map((item) => {
          return { pick: item.pick, value: item.value, index: item.index };
        });
        const picksYears = mainTeamAllInfo.map((item) => {
          return {
            round: `R${item.round_index_number}`,
            id: item.id,
            value: item.value,
          };
        });
        dispatch(
          teamAddPicks({
            picksInfo: { picks, picksYears, pick: [], pickYear: [] },
            path: "mainTeam",
          })
        );
        dispatch(getTradesPlayer({ id: mainTeam.id, path: "mainTeam" }));
      } else {
        dispatch(teamMountAction({ team: mainTeamData[0], path: "mainTeam" }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainTeam?.name, tradeValue]);

  useEffect(() => {
    const myTeamData = myTeams?.filter((item) => item.name === myTeam.name);
    if (myTeam?.name && tradeValue.length) {
      if (!myTeamData.length) {
        const myTeamAllInfo = tradeValue.filter(
          (item) => item.round.name === myTeam.name
        );
        const picks = myTeamAllInfo.map((item) => {
          return { pick: item.pick, value: item.value, index: item.index };
        });
        const picksYears = myTeamAllInfo.map((item) => {
          return {
            round: `R${item.round_index_number}`,
            id: item.id,
            value: item.value,
          };
        });
        dispatch(
          teamAddPicks({
            picksInfo: { picks, picksYears, pick: [], pickYear: [] },
            path: "myTeam",
          })
        );
        dispatch(getTradesPlayer({ id: myTeam.id, path: "myTeam" }));
      } else {
        dispatch(teamMountAction({ team: myTeamData[0], path: "myTeam" }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myTeam.name, tradeValue]);

  const changeAccept = useMemo(
    () =>
      ({ myTeam, mainTeam }) => {
        
        const mainTeamPickValue = mainTeam.pick.reduce((acc, item) => {
          return acc + parseInt(item.value);
        }, 0);
        const mainTeamPickYearValue = mainTeam.pickYear.reduce((acc, item) => {
          return acc + parseInt(item.value);
        }, 0);
        const mainTeamPlayerValue = mainTeam.player.value ?? 0;
        const myTeamPickValue = myTeam.pick.reduce((acc, item) => {
          return acc + parseInt(item.value);
        }, 0);
        const myTeamPickYearValue = myTeam.pickYear.reduce((acc, item) => {
          return acc + parseInt(item.value);
        }, 0);
        const myTeamPlayerValue = myTeam.player.value ?? 0;
        const value =
          mainTeamPickValue +
          mainTeamPickYearValue +
          mainTeamPlayerValue -
          (myTeamPickValue + myTeamPlayerValue + myTeamPickYearValue);
        return value <= 50;

        // eslint-disable-next-line react-hooks/exhaustive-deps
      },
    []
  );
  const changeTeam = () => {
    const acceptFlag = changeAccept({ myTeam, mainTeam });
    if (acceptFlag) {
      let teamMainFind = tradeValue.find(
        (item) => item.round.name === mainTeam.name
      );
      const teamMainData = objectDeleteValue({
        objectData: teamMainFind,
        deleteKey: [
          "value",
          "round_index_number",
          "round_index",
          "index",
          "pick",
        ],
      });
      let myTeamMainFind = tradeValue.find(
        (item) => item.round.name === myTeam.name
      );
      const myTeamData = objectDeleteValue({
        objectData: myTeamMainFind,
        deleteKey: [
          "value",
          "round_index_number",
          "round_index",
          "index",
          "pick",
        ],
      });
      
      const newTradesValue = changeTeamPick({
        teamPick: mainTeam.pick.map((item) => item.index),
        myTeamPick: myTeam.pick.map((item) => item.index),
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
      newTradePickIndex.sort((a, b) => a - b);
      dispatch(setTeamTradeValue(newTradesValue.tradeValue));
      dispatch(changeTradeTeam(newTradesValue.tradeValue));
      dispatch(setTeamPickIndex(newTradePickIndex));
      dispatch(changeTeamInfo());
      dispatch(setAcceptTrade(acceptFlag));
    } else {
      const count = acceptCount - 1;
      count !== 0 && dispatch(setAcceptCount(count));
      dispatch(setNotAccept(!acceptFlag));
    }
  };

  const handleTryAgain = () => {
    dispatch(setAcceptTrade(false));
    dispatch(setAcceptCount(10));
    dispatch(setNotAccept(false));
  };
  return (
    <>
      {openFlag && (
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
                  <ModalChooseTeam
                    title={"Select a team to trade with"}
                    team={mainTeam}
                    tradesTeams={tradesTeams}
                    teamSelect={teamSelect}
                    path={"mainTeam"}
                  />
                  <ModalBodyItem>
                    <div className="line" />
                  </ModalBodyItem>
                  <ModalChooseTeam
                    title={"Select one of your teams"}
                    team={myTeam}
                    tradesTeams={tradesTeams}
                    teamSelect={teamSelect}
                    path={"myTeam"}
                  />
                </ModalBodyItems>

                <BtnWrap>
                  {acceptCount !== 0 ? (
                    <button onClick={() => changeTeam()}>Offer Trade</button>
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
                  <ModalResultTeam
                    title={'Team to trade with'}
                    historyTrades={historyTrades}
                    mainTeam={mainTeam}
                    myTeam={myTeam}
                    name={'myTeam'}
                  />
                  <ModalBodyItem>
                    <div className="line" />
                  </ModalBodyItem>
                  <ModalResultTeam
                    title={"Your team"}
                    historyTrades={historyTrades}
                    mainTeam={mainTeam}
                    myTeam={myTeam}
                    name={"mainTeam"}
                  />
                </ModalBodyItems>
                <BtnWrap>
                  <button onClick={() => handleTryAgain()}>Trade Again</button>
                  <button onClick={handleClose}>Start Draft</button>
                </BtnWrap>
              </ModalBody>
            )}
          </ModalWrap>
        </Modal>
      )}
    </>
  );
};

export default ModalTrades;
