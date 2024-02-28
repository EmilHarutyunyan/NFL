import React, { useEffect, useRef } from "react";
// Styles
import { InputWrap, RoomBlock, Wrapper } from "./RoomChat.styles";
import { SendChat } from "../Icons/Icons";

import TokenService from "../../service/token.service";
import { useSelector } from "react-redux";
import { selectLiveDraft } from "../../app/features/liveDraft/liveDraftSlice";
import { getCurrentDate } from "../../utils/utils";
import { useSocket } from "../../hook/SocketContext";
import fanaticLogo from "../../assets/img/logoMid.png";


const RoomChat = () => {
  const messageRef = useRef(null);
  const { myEventTeam, roomMessages, eventId } = useSelector(selectLiveDraft);
  const socket = useSocket();
  const user = TokenService.getUser();

  const handleSubmit = async () => {
    if (
      socket &&
      messageRef &&
      messageRef.current &&
      messageRef.current.textContent !== ""
    ) {
      let message = messageRef.current.textContent;

      const messageData = {
        chat_id: eventId,
        text: message,
        sender_id: user.id,
        team: myEventTeam?.round || {
          id:0,
        },
        create_date: getCurrentDate(),
      };

      await socket.emit("message", JSON.stringify(messageData));
      messageRef.current.textContent = "";
    }
  };

  return (
    <Wrapper>
      <RoomBlock>
        {roomMessages.length > 0
          ? roomMessages.map((message, idx) => {
              const myEventTeamRoundId = myEventTeam?.round?.id || 0;
              const myMessageIsFlag = message.team.id === myEventTeamRoundId;
              const creatorIsFlag = message.team.id === 0;
              return (
                <div
                  key={idx}
                  className={
                    !myMessageIsFlag
                      ? "room-left"
                      : "room-right"
                  }
                >
                  <div>
                    <img
                      src={!creatorIsFlag ? message.team.logo: fanaticLogo}
                      alt=""
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="room-text">
                    <p>{message.text}</p>
                    <p>{message.create_date}</p>
                  </div>
                </div>
              );
            })
          : null}
      </RoomBlock>
      <div>
        {/* <form action=""> */}
        <InputWrap>
          <p>
            <span
              className="textarea"
              role="textbox"
              contentEditable
              ref={messageRef}
            ></span>
            <button type="submit" onClick={handleSubmit}>
              <SendChat />
            </button>
          </p>
        </InputWrap>
        {/* </form> */}
      </div>
    </Wrapper>
  );
};

export default RoomChat;
