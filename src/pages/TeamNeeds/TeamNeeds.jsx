import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title/Title";
import {
  AccordionWrapper,
  ImgWrap,
  PlayerList,
  TeamInfo,
  TeamPosition,
  TeamPositionItem,
  TeamSummary,
  Wrapper,
} from "./TeamNeeds.styles";
import { MdKeyboardArrowUp } from "react-icons/md";
import HalfCircleChart from "../../components/HalfCircleChart/HalfCircleChart";
import DraftPicks from "../../components/DraftPicks/DraftPicks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeamNeeds,
  resTeamNeeds,
  selectTeamNeeds,
} from "../../app/features/teamNeeds/teamNeedsSlice";
import { searchInfo } from "../../utils/utils";
import { TEAM_NEEDS } from "../../utils/constants";
import Spinner from "../../components/Spinner/Spinner";
import { PlayerListIcon } from "../../components/Icons/Icons";
const TeamNeeds = () => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const { teamNeeds,loading } = useSelector(selectTeamNeeds);
  const initial = useRef(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      dispatch(getTeamNeeds());
    }
    return () => dispatch(resTeamNeeds())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNavigation = (query,team) => {
    navigate(query, { state: team });
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <Wrapper className="main-container">
      <Title titleText="Team Needs" />
      {teamNeeds.length
        ? teamNeeds.map((team, idx) => {
            const { round, team_neads_info: teamNeedsInfo } = team;
            
            const teamInfo = searchInfo(TEAM_NEEDS, round, (item) => item.name);
            const positions = teamNeedsInfo
              .map((item) => item.positions)
              .flat();

            return (
              <AccordionWrapper key={idx}>
                <Accordion
                  expanded={expanded === `panel${idx}`}
                  onChange={handleChange(`panel${idx}`)}
                  sx={{ margin: 0 }}
                >
                  <AccordionSummary
                    expandIcon={
                      <MdKeyboardArrowUp
                        style={{
                          fontSize: "30px",
                          boxShadow: "none",
                          backgroundColor: "white",
                        }}
                      />
                    }
                    aria-controls={`panel${idx}bh-content`}
                    id={`panel${idx}bh-header`}
                    sx={{
                      padding: "0 20px 0 0",
                      margin: 0,
                      backgroundColor: "white",
                      marginTop: "2px",
                      "& .MuiAccordionSummary-content": {
                        margin: "0 !important",
                      },
                    }}
                  >
                    <TeamSummary>
                      <TeamInfo bgColor={teamInfo[0]?.color}>
                        <div className="tema-info-name">
                          <p className="tema-info-name-loc">
                            {teamInfo[0]?.loc}
                          </p>
                          <p className="tema-info-name-need">Needs</p>
                        </div>
                        <ImgWrap>
                          <img src={round?.logo} alt={round?.name} />
                          <p>{round?.name}</p>
                        </ImgWrap>
                      </TeamInfo>

                      <TeamPosition>
                        {positions.map((position, idx) => {
                          return (
                            <>
                              {idx < 5 ? (
                                <TeamPositionItem primary key={position.id}>
                                  {position.name}
                                </TeamPositionItem>
                              ) : (
                                <TeamPositionItem key={position.id}>
                                  {position.name}
                                </TeamPositionItem>
                              )}
                            </>
                          );
                        })}
                      </TeamPosition>
                    </TeamSummary>
                    <PlayerList
                      onClick={() =>
                        handleNavigation(`/team-list?list=${round?.name}`,{name:round?.name,logo:round?.logo})
                      }
                    >
                        <PlayerListIcon />
                        <p>Players list</p>
                    </PlayerList>
                  </AccordionSummary>
                  <AccordionDetails>
                    <DraftPicks
                      title={"2023 Pre-Draft Picks"}
                      dataRound={[
                        {
                          round: "R1",
                          roundValue: "21",
                        },
                        {
                          round: "R1",
                          roundValue: "21",
                        },
                        {
                          round: "R1",
                          roundValue: "21",
                        },
                        {
                          round: "R1",
                          roundValue: "21",
                        },
                        {
                          round: "R1",
                          roundValue: "21",
                        },
                        {
                          round: "R1",
                          roundValue: "21",
                        },
                        {
                          round: "R1",
                          roundValue: "21",
                        },
                      ]}
                    />

                    <HalfCircleChart
                      infoTitle={
                        "With pick21in the 2023 NFL Draft, the most likely selection for the Arizona Cardinals will be..."
                      }
                    />
                  </AccordionDetails>
                </Accordion>
              </AccordionWrapper>
            );
          })
        : null}
    </Wrapper>
  );
};

export default TeamNeeds;
