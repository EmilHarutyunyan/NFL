import React, { useState } from 'react'
// Styles
import { Container, SelectEvent, Wrapper } from "./DraftEvents.styles";
import { ProfileTitle } from '../Profile.styles';
import CreateEvents from './CreateEvents';
import MyEvents from './MyEvents';
import EventList from './EventList';
import { Link, Outlet } from "react-router-dom";
import { PROFILE_DRAFT_EVENTS, PROFILE_DRAFT_EVENTS_CREATE, PROFILE_DRAFT_EVENTS_MY } from '../../../router/route-path';
const DraftEvents = () => {
  const [createDrafts, setCreateDrafts] = useState(true);
  return (
    <Wrapper>
      <ProfileTitle>Badges</ProfileTitle>
      <SelectEvent>
        <button 
          className={createDrafts ? "active" : null}
          onClick={() => setCreateDrafts(true)}
        >
          Create draft
        </button>
       
        <button
         
          className={!createDrafts ? "active" : null}
          onClick={() => setCreateDrafts(false)}
        >
          My draft
        </button>
      </SelectEvent>
      <Container>
        {createDrafts ? <CreateEvents /> : <MyEvents/>
      }
        <Outlet />
      </Container>
    </Wrapper>
  );
}

export default DraftEvents