import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useRef, useState } from "react";
import Title from "../../components/Title/Title";
import {
  AccardinWrapper,
  ImgWrap,
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
  selectTeamNeeds,
} from "../../app/features/teamNeeds/teamNeedsSlice";
import { searchInfo } from "../../utils/utils";
import { TEAM_NEEDS } from "../../utils/constants";
import Spinner from "../../components/Spinner/Spinner";
const TeamNeeds = () => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const { teamNeeds,loading } = useSelector(selectTeamNeeds);
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      dispatch(getTeamNeeds());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Wrapper className="main-container">
      <Title titleText="Team Needs" />
      {loading ?  <Spinner /> : null}
      {teamNeeds.length
        ? teamNeeds.map((team, idx) => {
            const { round, team_neads_info: teamNeedsInfo } = team;
            const teamInfo = searchInfo(TEAM_NEEDS, round, (item) => item.name);
            const positions = teamNeedsInfo
              .map((item) => item.positions)
              .flat();

            return (
              <AccardinWrapper key={idx}>
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
                      <TeamInfo bgColor={teamInfo[0].color}>
                        <div className="tema-info-name">
                          <p className="tema-info-name-loc">{teamInfo[0].loc}</p>
                          <p className="tema-info-name-need">Needs</p>
                        </div>
                        <ImgWrap>
                          <img src={round?.logo} alt="team-logo" />
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
              </AccardinWrapper>
            );
          })
        : null}

      {/* ------------ */}
      {/* <AccardinWrapper>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
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
            aria-controls="panel1bh-content"
            id="panel2bh-header"
            sx={{
              padding: "0 20px 0 0",
              margin: 0,
              backgroundColor: "white",
              marginTop: "2px",
              "& .MuiAccordionSummary-content": { margin: "0 !important" },
            }}
          >
            <TeamSummary>
              <ImgWrap>
                <img src={teamLogo} alt="team-logo" />
              </ImgWrap>
              <TeamPosition>
                <TeamPositionItem primary>CB</TeamPositionItem>
                <TeamPositionItem primary>OT</TeamPositionItem>
                <TeamPositionItem primary>DL</TeamPositionItem>
                <TeamPositionItem primary>EDGE</TeamPositionItem>
                <TeamPositionItem primary>LB</TeamPositionItem>
                <TeamPositionItem primary>RB</TeamPositionItem>
                <TeamPositionItem primary>WR</TeamPositionItem>
                <TeamPositionItem>S</TeamPositionItem>
                <TeamPositionItem>IOL</TeamPositionItem>
                <TeamPositionItem>QB</TeamPositionItem>
                <TeamPositionItem>TE</TeamPositionItem>
                <TeamPositionItem>P</TeamPositionItem>
                <TeamPositionItem>K</TeamPositionItem>
                <TeamPositionItem>LS</TeamPositionItem>
              </TeamPosition>
            </TeamSummary>
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
      </AccardinWrapper> */}

    </Wrapper>
  );
};

export default TeamNeeds;
