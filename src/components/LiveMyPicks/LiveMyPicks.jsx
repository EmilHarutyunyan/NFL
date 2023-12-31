import React, { useMemo } from "react";
// Styles
import {
  Wrapper,
  LivePickHead,
  Content,
  DraftNeeds,
  PositionWrap,
  PositionItem,
  PlayerPick,
} from "./LiveMyPicks.styles";

import { useSelector } from "react-redux";
import { POSITIONS_COLOR } from "../../utils/constants";

import Spinner from "../Spinner/Spinner";

import { selectLiveDraft } from "../../app/features/liveDraft/liveDraftSlice";
const LiveMyPicks = () => {
  const { myEventTeam,myPlayerTeam } = useSelector(selectLiveDraft);

  const positionNeeds = useMemo(()=> {
    if (myEventTeam && myEventTeam.team_neads_info) {
      return myEventTeam.team_neads_info.map((item) => item.positions).flat();
    }
  },[myEventTeam])
  
  // if(myEventTeam === null ) {
  //   return <Spinner />
  // }
  return (
    <Wrapper>
      {myEventTeam && myEventTeam.round ? (
        <LivePickHead>
          <div>
            <img src={myEventTeam?.round.logo} alt={"texans"} />
            <h2>{myEventTeam?.round.name}</h2>
          </div>
        </LivePickHead>
      ) : (
        <LivePickHead static />
      )}

      <Content>
        {myEventTeam && positionNeeds ? (
          <>
            <DraftNeeds>
              <p>Draft Needs:</p>
              <PositionWrap>
                {positionNeeds.map((needs,idx) => {
                  return (
                    <React.Fragment key={idx}>
                      {idx < 5 ? (
                        <PositionItem
                         
                          backColor={POSITIONS_COLOR[needs.name]}
                          onClick={() => {}}
                        >
                          <span>{needs.name}</span>
                        </PositionItem>
                      ) : (
                        <PositionItem
                        
                          backColor={POSITIONS_COLOR[needs.name]}
                          onClick={() => {}}
                        >
                          <span>{needs.name}</span>
                        </PositionItem>
                      )}
                    </React.Fragment>
                  );
                })}
               
              </PositionWrap>
            </DraftNeeds>
            <PlayerPick>
              <table>
                <thead>
                  <tr>
                    <th>Pick</th>
                    <th>Player</th>
                    <th>AXN</th>
                    <th>Pos</th>
                    <th>College</th>
                  </tr>
                </thead>
                <tbody>
                  {myPlayerTeam?.map(player => {
                    return (
                      <tr key={player.id}>
                        <td>
                          {`${player.pick}`}: {`${player.round_index_number}`}
                          
                        </td>
                        <td>{player.name}</td>
                        <td></td>
                        <td>{player.position}</td>
                        <td>{player.school}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </PlayerPick>
          </>
        ) : (
          <Spinner />
        )}
      </Content>
    </Wrapper>
  );
};

export default LiveMyPicks;
