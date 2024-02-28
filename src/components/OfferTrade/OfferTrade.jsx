import React, { useCallback, useEffect, useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
// Styles
import {
  OfferHead,
  OfferBody,
  OfferSelect,
  Wrapper,
  OfferPickTableWrap,
  OfferPick,
  OfferPending,
  ModalBody,
  BtnWrap,
} from "./OfferTrade.styles";

import MySelectTeam from "../MySelect/MySelectTeam";
import LivePendingCard from "../LivePendingCard";
import { useSelector } from "react-redux";
import {
  changeRecentPicks,
  selectLiveDraft,
  setRecentPicks,
} from "../../app/features/liveDraft/liveDraftSlice";
import Spinner from "../Spinner/Spinner";
import { objectDeleteValue, toggleArrObj } from "../../utils/utils";
import { useDispatch } from "react-redux";
import {
  notAvailable,
  rejectTrade,
  selectLiveTrades,
  setLiveMyAllTrades,
  setLiveMyTrades,
  setLiveOtherAllTrades,
  setLiveOtherTrades,
  tradesAccept,
} from "../../app/features/liveTrades/liveTradesSlice";
import changeTeamPickLive from "./modalTradesFunc";
import { useSocket } from "../../hook/SocketContext";
import useModal from "../../hooks/useModal";
import ModalCustom from "../ModalCustom/ModalCustom";
import { createPortal } from "react-dom";

const initialTrades = {
  myTeamPick: [],
  otherTeamPick: [],
};
const OfferTrade = () => {
  const { recentPicks, myEventTeam, picksTeams, eventId,start } =
    useSelector(selectLiveDraft);
  const socket = useSocket();
  const { liveMyTrades, liveOtherTrades } = useSelector(selectLiveTrades);

  const [otherTeam, setOtherTeam] = useState(null);
  const [myTeamPicks, setMyTeamPicks] = useState(null);

  const [otherTeamPicks, setOtherTeamPicks] = useState(null);

  const [isPending, startTransition] = useTransition();
  const [teamTrades, setTeamTrades] = useState(initialTrades);
  const { isOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (recentPicks && myEventTeam && otherTeam) {
      startTransition(() => {
        const myTeamSelect = recentPicks.filter(
          (team) => team.round.id === myEventTeam.round.id
        );
        const otherTeamSelect = recentPicks.filter(
          (team) => team.round.id === otherTeam.id
        );

        setMyTeamPicks(myTeamSelect);
        setOtherTeamPicks(otherTeamSelect);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentPicks, myEventTeam, otherTeam]);

  useEffect(() => {
    if (picksTeams && myEventTeam) {
      const findTeam = picksTeams.find(
        (item) => item.id !== myEventTeam.round.id
      );

      setOtherTeam(findTeam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picksTeams, myEventTeam]);

  const handleOtherTeamPicks = useCallback(
    (otherTeam) => {
      if (otherTeam && recentPicks) {
        startTransition(() => {
          const otherTeamSelect = recentPicks.filter(
            (team) => team.round.id === otherTeam.id
          );
          setOtherTeam(otherTeam);
          setOtherTeamPicks(otherTeamSelect);
        });
      }
    },
    [recentPicks]
  );

  const handleMyTeamPick = (team) => {
    const myTeamPick = toggleArrObj(
      teamTrades.myTeamPick,
      team,
      (item) => item.index
    );

    setTeamTrades((prev) => {
      return { ...prev, myTeamPick: [...myTeamPick] };
    });
  };
  const handleOtherTeamPick = (team) => {
    const otherTeamPick = toggleArrObj(
      teamTrades.otherTeamPick,
      team,
      (item) => item.index
    );

    setTeamTrades((prev) => {
      return { ...prev, otherTeamPick: [...otherTeamPick] };
    });
  };

  const handleCheck = (dataCheck, team) => {
    if (dataCheck?.length) {
      return dataCheck.some((item) => item.id === team.id);
    }
    return false;
  };
  const handleTrades = async (teamTrades) => {
    if (teamTrades.myTeamPick.length && teamTrades.otherTeamPick.length) {
      const newTeamTrades = structuredClone(teamTrades);
      const myName = newTeamTrades.myTeamPick[0].round.name;
      const otherName = newTeamTrades.otherTeamPick[0].round.name;
      const myPickRound = newTeamTrades.myTeamPick.map((item) => {
        return { round_index_number: item.round_index_number, pick: item.pick };
      });
      const otherPickRound = newTeamTrades.otherTeamPick.map((item) => {
        return { round_index_number: item.round_index_number, pick: item.pick };
      });
      // const

      const offerDate = {
        [myName]: newTeamTrades.myTeamPick,
        [otherName]: newTeamTrades.otherTeamPick,
        id: uuidv4() + myName,
        myName,
        otherName,
        status: {
          [myName]: "pending",
          [otherName]: "incoming",
        },
        picks: [...myPickRound, ...otherPickRound],

        event_id: eventId,
      };
      await socket.emit("offer-trade", JSON.stringify(offerDate));
      dispatch(setLiveMyTrades({ ...newTeamTrades, ...offerDate }));
      setTeamTrades(initialTrades);
    }
  };
  const handleAccept = async (myTeamPick, otherTeamPick, idTrade, idx) => {
    const myTeamData = objectDeleteValue({
      objectData: myTeamPick[0],
      deleteKey: [
        "value",
        "round_index_number",
        "round_index",
        "index",
        "pick",
        "id",
      ],
    });

    const teamMainData = objectDeleteValue({
      objectData: otherTeamPick[0],
      deleteKey: [
        "value",
        "round_index_number",
        "round_index",
        "index",
        "pick",
      ],
    });
    const myName = myTeamPick[0].round.name;
    const myPickRound = myTeamPick.map((item) => {
      return { round_index_number: item.round_index_number, pick: item.pick };
    });
    const otherPickRound = otherTeamPick.map((item) => {
      return { round_index_number: item.round_index_number, pick: item.pick };
    });

    const otherName = otherTeamPick[0].round.name;
    const newRecentPick = changeTeamPickLive({
      teamPick: otherTeamPick.map((item) => item.index),
      myTeamPick: myTeamPick.map((item) => item.index),
      tradeValue: recentPicks,
      myTeamData,
      teamMainData,
    });


    await socket.emit(
      "accept-trade",
      JSON.stringify({
        newRecentPick: newRecentPick.tradeValue,
        event_id: eventId,
        trades: {
          [myName]: myTeamPick,
          [otherName]: otherTeamPick,
          myName,
          otherName,
          id: idTrade,
          status: {
            [myName]: "accepted",
            [otherName]: "accepted",
          },
          picks: [...myPickRound, ...otherPickRound],
        },
      })
    );
    const newLiveOtherTrades = liveOtherTrades.map((trade, id) => {
      if (idx === id) {
        return {
          ...trade,

          myName,
          otherName,
          status: {
            [myName]: "accepted",
            [otherName]: "accepted",
          },
        };
      }
      return trade;
    });
    dispatch(setLiveOtherAllTrades(newLiveOtherTrades));
    openModal();
    // dispatch(setRecentPicks(newRecentPick.tradeValue));
  };

  const handleReject = async (rejectTrade) => {
    const newLiveOtherTrades = liveOtherTrades.filter(item => item.id !== rejectTrade.id)
    const status = {};
    for (const key of Object.keys(rejectTrade.status)) {
      status[`${key}`] = "reject";
    }
    const rejectTradeStatus = {
      ...rejectTrade,
      status,
    };
     await socket.emit(
       "reject-trade",
       JSON.stringify({
         ...rejectTradeStatus,
       })
     );
    dispatch(setLiveOtherAllTrades(newLiveOtherTrades));

  }
  useEffect(() => {
    if (socket) {
      socket.on("offer-trade", async (data) => {
        
        const newRecentPicks = data;
        const myName = Object.keys(newRecentPicks)[1];
        const otherName = Object.keys(newRecentPicks)[0];
        if (otherName !== myEventTeam.round.name) {
          const offerDate = {
            myTeamPick: [...newRecentPicks[myName]],
            otherTeamPick: [...newRecentPicks[otherName]],
            myName,
            otherName,
            status: newRecentPicks.status,
            event_id: eventId,
            id: newRecentPicks.id,
            picks: newRecentPicks.picks,
          };
          dispatch(setLiveOtherTrades(offerDate));
        }
      });
      socket.on("accept-trade", async (data) => {
        
        const newRecentPicks = data.newRecentPick;
        dispatch(changeRecentPicks(newRecentPicks));
       
        dispatch(notAvailable(data.trades));
      });
      socket.on("reject-trade", async (data) => {
        dispatch(rejectTrade(data));
      });

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  return (
    <Wrapper>
      <OfferHead>
        <h2>Offer Trade</h2>
        <button
          disabled={start}
          onClick={() => {
            handleTrades(teamTrades);
          }}
        >
          Offer trade
        </button>
      </OfferHead>
      <OfferBody>
        <OfferSelect>
          <p>Select a trade partner</p>
          {otherTeam && (
            <MySelectTeam
              name={otherTeam.name}
              dataValue={picksTeams}
              disabled={myEventTeam.round.name}
              handleChange={(item) => {
                const [teamFilter] = picksTeams.filter((team) => {
                  return team.name === item.value;
                });
                handleOtherTeamPicks(teamFilter);
                setTeamTrades(initialTrades);
              }}
            />
          )}
        </OfferSelect>
        {!isPending ? (
          <OfferPick>
            <div className="offer-pick-head">
              <div className="offer-pick-team">
                <img src={myEventTeam.round.logo} alt="" />
                <p>{myEventTeam.round.name}</p>
              </div>
              <p className="line"></p>
              {otherTeam && (
                <div className="offer-pick-team">
                  <img src={otherTeam.logo} alt="" />
                  <p>{otherTeam.name}</p>
                </div>
              )}
            </div>

            <OfferPickTableWrap>
              <table>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Pick</th>
                  </tr>
                </thead>
                <tbody>
                  {myTeamPicks?.map((myTeam, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={handleCheck(teamTrades.myTeamPick, myTeam)}
                            onChange={() => handleMyTeamPick(myTeam)}
                          />
                        </td>
                        <td>
                          {myTeam.round_index_number}:{myTeam.pick}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Pick</th>
                  </tr>
                </thead>
                <tbody>
                  {otherTeamPicks?.map((otherTeam, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={handleCheck(
                              teamTrades.otherTeamPick,
                              otherTeam
                            )}
                            onChange={() => handleOtherTeamPick(otherTeam)}
                          />
                        </td>
                        <td>
                          {otherTeam.round_index_number}:{otherTeam.pick}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </OfferPickTableWrap>
          </OfferPick>
        ) : (
          <Spinner />
        )}
      </OfferBody>
      {liveMyTrades.length ? (
        <>
          <OfferPending>
            <div className="offer-pending-head">
              <h2>Pending trades</h2>
            </div>
          </OfferPending>
          {liveMyTrades.map((myTrades, idx) => {
            return (
              <React.Fragment key={idx}>
                <LivePendingCard myTrades={myTrades} isMyTrades={true} />
              </React.Fragment>
            );
          })}
        </>
      ) : null}
      {liveOtherTrades.length ? (
        <>
          <OfferPending>
            <div className="offer-pending-head">
              <h2>Offer trades</h2>
            </div>
          </OfferPending>
          {liveOtherTrades.map((myTrades, idx) => {
            const idTrade = myTrades.id;

            return (
              <React.Fragment key={idx}>
                <LivePendingCard
                  myTrades={myTrades}
                  isMyTrades={
                    myTrades.status[myTrades.myName] === "accepted" ||
                    myTrades.status[myTrades.myName] === "no longer available"
                  }
                  status={myTrades.status[myTrades.myName]}
                  handleAccept={() =>
                    handleAccept(
                      myTrades.myTeamPick,
                      myTrades.otherTeamPick,
                      idTrade,
                      idx
                    )
                  }
                  handleReject={() => handleReject(myTrades)}
                />
              </React.Fragment>
            );
          })}
        </>
      ) : null}
      {/* {teamTrades.myTeamPick.length && teamTrades.otherTeamPick.length ? (
        
      ) : null} */}
      {isOpen
        ? createPortal(
            <ModalCustom isOpen={isOpen}>
              <ModalBody>
                <h2>Success!</h2>
                <p>Your trade has been accepted.</p>
                <BtnWrap>
                  <button onClick={closeModal}>Close</button>
                </BtnWrap>
              </ModalBody>
            </ModalCustom>,
            document.body
          )
        : null}
    </Wrapper>
  );
};

export default OfferTrade;
