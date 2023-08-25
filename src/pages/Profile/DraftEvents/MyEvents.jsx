import React, { useState } from "react";
import { MyEventWrap } from "./DraftEvents.styles";
import EventList from "./EventList";
import ViewEvent from "./ViewEvent";

import EditEvent from "./EditEvent";

const MyEvents = () => {
  const [pageShow,setPageShow] = useState({
    page:'list',
    id:0,
  });
  const handlePage = ({page,id}) => {
    debugger

    setPageShow({page,id})
  }
  return (
    <MyEventWrap>
      {pageShow?.page === "list" && <EventList handlePage={handlePage} />}
      {pageShow?.page === 'view' && <ViewEvent handlePage={handlePage} />}
      {pageShow?.page === 'edit' && <EditEvent handlePage={handlePage} />}
    </MyEventWrap>
  );
};

export default MyEvents;
