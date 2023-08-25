import React, { useState } from 'react'
// Styles
import {Wrapper,EventItem,EventWrap, SearchWrap, PaginationWrap} from "./MultiPlayerFind.styles"
import { Pagination } from '@mui/material';
import Search from '../../components/Search/Search';

const MultiPlayerItem = ({event}) => {
  const { name_event, event_id, date, id, players } = event;
  return (
    <EventWrap>
      <EventItem>
        <div>
          <h3>{name_event}</h3>
        </div>
        <div className="event-info">
          <h4>Event ID:</h4>
          <p>{event_id}</p>
        </div>
        <div>
          <h4>{date}</h4>
        </div>
        <div className="event-info">
          <h4>Place left:</h4>
          <p>{players.length}</p>
        </div>
        <div>
          <button onClick={() => console.log(id)}>Join a Draft</button>
        </div>
      </EventItem>
    </EventWrap>
  );
}

const MultiPlayerFind = () => {
const [searchValue, setSearchValue] = useState("");
  const events = [
    {
      name_event: "Event name",
      event_id: "123456",
      date: "24 Aug 2023, 12:30 PM",
      id: "1231232c3123rw3",
      players: [1, 2, 3],
    },
    {
      name_event: "Event name",
      event_id: "123456",
      date: "24 Aug 2023, 12:30 PM",
      id: "1231232c3123rw3",
      players: [1, 2, 3],
    },
    {
      name_event: "Event name",
      event_id: "123456",
      date: "24 Aug 2023, 12:30 PM",
      id: "1231232c3123rw3",
      players: [1, 2, 3],
    },
  ];
  return (
    <Wrapper>
      <h2>Find an Event</h2>
      <SearchWrap>
        <Search
          value={searchValue}
          handleChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <div>
          <input type='date'/>

        </div>
      </SearchWrap>
      <div className="event-content">
        <div className="search-bar"></div>
        {events.length > 0 ? (
          events.map((event, idx) => {
            return <MultiPlayerItem event={event} key={idx} />;
          })
        ) : (
          <p>Not Event</p>
        )}
      </div>
      <PaginationWrap>
      <Pagination
        totalCount={events?.count}
        pageSize={events?.limit}
        currentPage={events?.currentPage}
        previous={events?.previous}
        next={events?.next}
        onPageChange={(page) => {
          // dispatch(pageNav(page));
        }}
      />

      </PaginationWrap>
    </Wrapper>
  );
}

export default MultiPlayerFind