import React, { useEffect, useState } from "react";
// Styles
import {
  Wrapper,
  EventItem,
  EventWrap,
  SearchWrap,
  PaginationWrap,
} from "./MultiPlayerFind.styles";
import { Pagination } from "@mui/material";
import Search from "../../components/Search/Search";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { selectDraftEvents } from "../../app/features/draftEvents/draftEventsSlice";
import { useNavigate } from "react-router-dom";
import { MULTI_PLAYER_JOIN_TEAM } from "../../router/route-path";
import Spinner from "../../components/Spinner/Spinner";
import { liveEventsList } from "../../app/features/liveDraft/liveDraftActions";
import { selectLiveDraft } from "../../app/features/liveDraft/liveDraftSlice";
import TokenService from "../../service/token.service";

const MultiPlayerItem = ({ event,user }) => {
  const { name, event_id, created_at: date, id, players } = event;

  const playersEventId = event?.players.reduce((acc, player) => {
    if (player?.user?.id) {
      acc.push(player?.user?.id);
      return acc;
    }
  }, []);


  const navigate = useNavigate();
  const formattedDate = (date) => {
    const newDate = new Date(date);

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      newDate
    );
    return formattedDate;
  };

  //  [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);
  return (
    <EventWrap>
      <EventItem>
        <div className="event-name">
          <h3>{name}</h3>
          <span className="generate">
            <svg
              onClick={() => navigator.clipboard.writeText(name)}
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V6H5V20H16V22H5ZM9 18C8.45 18 7.97933 17.8043 7.588 17.413C7.196 17.021 7 16.55 7 16V4C7 3.45 7.196 2.979 7.588 2.587C7.97933 2.19567 8.45 2 9 2H18C18.55 2 19.021 2.19567 19.413 2.587C19.8043 2.979 20 3.45 20 4V16C20 16.55 19.8043 17.021 19.413 17.413C19.021 17.8043 18.55 18 18 18H9ZM9 16H18V4H9V16Z"
                fill="#004EA3"
              />
            </svg>
          </span>
        </div>
        {/* <div className="event-info">
          <h4>Event ID:</h4>
          <p>{event_id}</p>
        </div> */}
        <div>
          <h4>{date ? formattedDate(date) : ""}</h4>
        </div>
        <div className="event-info">
          <h4>Place left:</h4>
          <p>{players?.length}</p>
        </div>
        <div>
          <button
            disabled={playersEventId.includes(user.id)}
            onClick={() => navigate(`${MULTI_PLAYER_JOIN_TEAM}/${id}`)}
          >
            Choose Team
          </button>
        </div>
      </EventItem>
    </EventWrap>
  );
};

const MultiPlayerFind = () => {
  const [searchValue, setSearchValue] = useState("");
  const { eventList, loading } = useSelector(selectLiveDraft);
  const dispatch = useDispatch();
  const user = TokenService.getUser();
  console.log("user :", user);
  useEffect(() => {
    dispatch(liveEventsList());
  }, []);
  if (loading) {
    return <Spinner />;
  }
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
          <input type="date" />
        </div>
      </SearchWrap>
      <div className="event-content">
        {eventList.length > 0 ? (
          eventList.map((event, idx) => {
            return <MultiPlayerItem event={event} key={idx} user={user} />;
          })
        ) : (
          <p>Not Event</p>
        )}
      </div>
      {/* <PaginationWrap>
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
      </PaginationWrap> */}
    </Wrapper>
  );
};

export default MultiPlayerFind;
