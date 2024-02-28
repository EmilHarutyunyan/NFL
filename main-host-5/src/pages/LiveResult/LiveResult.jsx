import React, { useMemo, useRef, useState } from "react";
// Styles
import {
  DraftLogoTeam,
  DraftResultFooter,
  DraftResultHead,
  DraftResultPick,
  DraftResultPickFooter,
  DraftResultPickWrap,
  DraftResultPos,
  DraftResultRound,
  DraftResultRoundItem,
  DraftResultTeam,
  DraftResultTeamCol,
  DraftResultTeamItem,
  DraftResultWrap,
  DraftTeam,
  DraftTeamName,
  MockDraftWrap,
  MySelectWrap,
  Wrapper,
} from "./LiveResult.styles";
import markaImg from "../../assets/img/marka.png";

import { useSelector } from "react-redux";
import { selectLiveResult } from "../../app/features/liveResult/liveResultSlice";
import { POSITIONS_COLOR, TEAM_NEEDS } from "../../utils/constants";
import { Link } from "react-router-dom";
import MySelectImg from "../../components/MySelect/MySelectImg";

const LiveResult = () => {
  const { resultBoard, round, myBoard } = useSelector(selectLiveResult);
  const domEl = useRef(null);
  const [roundSelect, setRoundSelect] = useState(1);

  const teamTable = useMemo(() => {
    return resultBoard.filter(
      (res) => +res.round_index.split(" ")[1] === roundSelect
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundSelect]);
  
  const teamInfo = TEAM_NEEDS.filter(
    (item) => item.name === myBoard?.myEventTeam?.round?.name
  );
  return (
    <Wrapper className="main-container">
        {myBoard ? (
      <DraftResultPick>
          <div ref={domEl}>
            <DraftResultHead>
              <MockDraftWrap>
                {myBoard && myBoard?.myEventTeam && (
                  <DraftTeam>
                    <DraftLogoTeam backColor={teamInfo[0]?.color}>
                      <img
                        src={myBoard.myEventTeam?.round?.logo}
                        alt={myBoard.myEventTeam?.round?.name}
                      />
                    </DraftLogoTeam>
                    <DraftTeamName>
                      <h3>{myBoard.myEventTeam?.round?.name} Mock Draft</h3>
                      <p>nfldraftfanatics.com</p>
                    </DraftTeamName>
                  </DraftTeam>
                )}
              </MockDraftWrap>
            </DraftResultHead>

            <DraftResultPickWrap backImg={markaImg}>
              {myBoard &&
                myBoard?.myPlayerTeam &&
                myBoard.myPlayerTeam?.map((player, idx) => {
                  const round = player.round_index_number;

                  return (
                    <React.Fragment key={idx}>
                      <div className="draft-result-pick-item">
                        <div className="draft-result-pick-item-info">
                          <div className="draft-result-pick-round">
                            <p>
                              R{round}:<span>{player.pick}</span>
                            </p>
                          </div>
                          <div className="draft-result-pick-adp">
                            <p>ADP</p>
                          </div>
                          <div className="draft-result-pick-logo">
                            <img
                              src={myBoard.myEventTeam?.round?.logo}
                              alt={myBoard.myEventTeam?.round?.name}
                            />
                            {player?.school_ref?.logo && (
                              <img
                                src={player?.school_ref?.logo}
                                alt={player?.name}
                              />
                            )}
                          </div>
                          <div className="draft-result-pick-name">
                            <p>{player?.name}</p>
                            <p>{player?.school}</p>
                          </div>
                          <DraftResultPos
                            posColor={POSITIONS_COLOR[player?.position]}
                            className="draft-result-pick-pos"
                          >
                            <p>{player?.position}</p>
                          </DraftResultPos>

                          {/* <div className="draft-result-pick-rating">
                          <p>Grade</p>
                          <div className="draft-result-pick-rating-item">
                            <GradeBox color={grading?.color}></GradeBox>
                            <p>{grading.grade}</p>
                          </div>
                        </div> */}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
            </DraftResultPickWrap>
          </div>
      </DraftResultPick>
        ) : null}
      <DraftResultWrap>
        <DraftResultRound>
          {Array.from({ length: round }, (_, i) => i + 1)?.map((item, idx) => {
            return (
              <DraftResultRoundItem
                active={item === roundSelect}
                onClick={() => setRoundSelect(item)}
                key={idx}
              >
                Round {item}
              </DraftResultRoundItem>
            );
          })}
        </DraftResultRound>
        <DraftResultTeam backImg={markaImg}>
          {teamTable.length &&
            teamTable.map((team, idx) => {
              // const grading = gradingCalc(team?.playerDepth);
              return (
                <DraftResultTeamItem key={idx}>
                  <DraftResultTeamCol
                    posColor={POSITIONS_COLOR[team?.player?.position]}
                  >
                    <div className="draft-result-team-round">
                      <p>
                        R{roundSelect}:<span>{team?.index}</span>
                      </p>
                    </div>
                    <div className="draft-result-team-adp">
                      <p>ADP</p>
                    </div>

                    <div className="draft-result-team-pos">
                      <p>{team?.player?.position}</p>
                    </div>

                    {/* <div className="draft-result-team-rating">
                      <GradeBox color={grading?.color}></GradeBox>
                      <p>{grading?.grade}</p>
                    </div> */}
                  </DraftResultTeamCol>
                  <DraftResultTeamCol>
                    <div className="draft-result-team-log">
                      <img
                        src={team?.round?.logo}
                        alt={team?.round?.name}
                        width={65}
                      />
                      <p>{team?.player?.name}</p>
                      {/* <p>{team?.playerDepth}</p> */}
                    </div>
                    <div className="draft-result-team-college">
                      <p>{team?.player?.school}</p>
                    </div>
                  </DraftResultTeamCol>
                </DraftResultTeamItem>
              );
            })}
        </DraftResultTeam>
        <DraftResultFooter>www.DraftSimulator.com</DraftResultFooter>
      </DraftResultWrap>
    </Wrapper>
  );
};

export default LiveResult;
