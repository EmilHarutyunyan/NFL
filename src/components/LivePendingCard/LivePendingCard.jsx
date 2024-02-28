import React from "react";
// Styles
import {
  Wrapper,
  TradeTeam,
  TradeTeamItem,
  TradeAction,
} from "./LivePendingCard.styles";
const LivePendingCard = ({
  myTrades,
  isMyTrades,
  handleAccept,
  handleReject,
}) => {
  const myName = myTrades.myTeamPick[0].round.name;
  const otherName = myTrades.otherTeamPick[0].round.name;
  return (
    <Wrapper>
      <TradeTeam>
        <TradeTeamItem>
          <div className="team-head">
            <img src={myTrades.myTeamPick[0].round.logo} alt="" />
            <p>{myName}</p>
          </div>
          <h3>Receives</h3>
          <div className="team-pick">
            {myTrades.myTeamPick.map((team, idx) => {
              return (
                <p key={idx}>
                  {team.round_index_number}: {team.pick}
                </p>
              );
            })}
          </div>
          <hr className="line" />
          <div className="team-status">
            <div>
              <p>{myTrades.status[myName]}</p>
            </div>
          </div>
        </TradeTeamItem>
        <hr className="line" />
        <TradeTeamItem>
          <div className="team-head">
            <img src={myTrades.otherTeamPick[0].round.logo} alt="" />
            <p>{otherName}</p>
          </div>
          <h3>Receives</h3>
          <div className="team-pick">
            {myTrades.otherTeamPick.map((team, idx) => {
              return (
                <p key={idx}>
                  {team.round_index_number}: {team.pick}
                </p>
              );
            })}
          </div>
          <hr className="line" />
          <div className="team-status">
            <div>
              <p>{myTrades.status[otherName]}</p>
            </div>
          </div>
        </TradeTeamItem>
      </TradeTeam>
      {isMyTrades ? null : (
        <TradeAction>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleReject}>Reject</button>
        </TradeAction>
      )}
    </Wrapper>
  );
};

export default LivePendingCard;
