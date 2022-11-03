import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React, { useState } from 'react'
import Title from '../../components/Title/Title'
import { AccardinWrapper, ImgWrap, TeamPosition, TeamPositionItem, TeamSummary, Wrapper } from './TeamNeeds.styles'
import { MdKeyboardArrowUp } from "react-icons/md";
import teamLogo from "../../assets/img/team-needs.png"
import HalfCircleChart from '../../components/HalfCircleChart/HalfCircleChart';
import DraftPicks from '../../components/DraftPicks/DraftPicks';
const TeamNeeds = () => {


  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Wrapper className="main-container">
      <Title titleText="Team Needs" />
      <AccardinWrapper>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{margin:0}}>
          <AccordionSummary
            expandIcon={<MdKeyboardArrowUp style={{fontSize: '30px',boxShadow: "none", backgroundColor:"white"}}/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx ={{padding:"0 20px 0 0",margin:0,backgroundColor: "white",
            marginTop: "2px", '& .MuiAccordionSummary-content': {margin:"0 !important"}}}
          >
            <TeamSummary>
              <ImgWrap>
                <img src={teamLogo} alt="team-logo"/>
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

            <DraftPicks title={'2023 Pre-Draft Picks'} dataRound={[{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            }]}/>

            <HalfCircleChart infoTitle={'With pick21in the 2023 NFL Draft, the most likely selection for the Arizona Cardinals will be...'}/>
          </AccordionDetails>
        </Accordion>
      </AccardinWrapper>
      <AccardinWrapper>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{margin:0}}>
          <AccordionSummary
            expandIcon={<MdKeyboardArrowUp style={{fontSize: '30px',boxShadow: "none", backgroundColor:"white"}}/>}
            aria-controls="panel1bh-content"
            id="panel2bh-header"
            sx ={{padding:"0 20px 0 0",margin:0,backgroundColor: "white",
            marginTop: "2px", '& .MuiAccordionSummary-content': {margin:"0 !important"}}}
          >
            <TeamSummary>
              <ImgWrap>
                <img src={teamLogo} alt="team-logo"/>
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

            <DraftPicks title={'2023 Pre-Draft Picks'} dataRound={[{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            }]}/>

            <HalfCircleChart infoTitle={'With pick21in the 2023 NFL Draft, the most likely selection for the Arizona Cardinals will be...'}/>
          </AccordionDetails>
        </Accordion>
      </AccardinWrapper>
      <AccardinWrapper>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{margin:0}}>
          <AccordionSummary
            expandIcon={<MdKeyboardArrowUp style={{fontSize: '30px',boxShadow: "none", backgroundColor:"white"}}/>}
            aria-controls="panel3bh-content"
            id="panel1bh-header"
            sx ={{padding:"0 20px 0 0",margin:0,backgroundColor: "white",
            marginTop: "2px", '& .MuiAccordionSummary-content': {margin:"0 !important"}}}
          >
            <TeamSummary>
              <ImgWrap>
                <img src={teamLogo} alt="team-logo"/>
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

            <DraftPicks title={'2023 Pre-Draft Picks'} dataRound={[{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            },{
              round :"R1",
              roundValue : "21"
            }]}/>

            <HalfCircleChart infoTitle={'With pick21in the 2023 NFL Draft, the most likely selection for the Arizona Cardinals will be...'}/>
          </AccordionDetails>
        </Accordion>
      </AccardinWrapper>
    </Wrapper>
  )
}

export default TeamNeeds