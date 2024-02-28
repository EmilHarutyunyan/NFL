import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BtnWrap,
  SettingBox,
  SettingWrap,
  Wrapper,
  ChatWrap,
} from "./LiveSettingChat.styles";
import { ChatIcon, SettingIcon } from "../Icons/Icons";
import useModal from "../../hooks/useModal";
import ModalCustom from "../ModalCustom/ModalCustom";
import SettingSound from "../SettingSound/SettingSound";
import RoomChat from "../RoomChat/RoomChat";

import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  selectLiveDraft,
  setAddTime,
  setRoomMessages,
} from "../../app/features/liveDraft/liveDraftSlice";
import { useSelector } from "react-redux";
import { useSocket } from "../../hook/SocketContext";

const SettingsButton = React.memo(({ onClick }) => (
  <button className="settings" onClick={onClick}>
    <SettingIcon />
    <span>Settings</span>
  </button>
));

const CreatorTime = ({ eventId,socket }) => {
  const {addTime} = useSelector(selectLiveDraft)
  // const {} = useSelector(selectLiveDraft)
  const dispatch = useDispatch()
  const handleTime = useCallback(
    async (time) => {
      await socket.emit("time", JSON.stringify({ time, event_id: eventId }));
      
    },
    [addTime]
  );
  return (
    <button className="time">
      <span
        onClick={() => {
          const newTime = addTime - 15 < 0 ? 0 : addTime - 15;
          handleTime(newTime);
        }}
      >
        -
      </span>
      <span>{addTime} Second</span>
      <span
        onClick={() => {
          const newTime = addTime + 15;
          handleTime(newTime);
        }}
      >
        +
      </span>
    </button>
  );
};

const ChatButton = React.memo(({ onClick }) => (
  <button className="chat" onClick={onClick}>
    <ChatIcon />
    <span>Room chat</span>
  </button>
));

const LiveSettingChat = () => {
  const { eventId, myEventTeam, eventInfo } = useSelector(selectLiveDraft);
  const socket = useSocket();
  const dispatch = useDispatch();
  const {
    isOpen: isOpenSetting,
    openModal: openModalSetting,
    closeModal: closeModalSetting,
  } = useModal();
  const {
    isOpen: isOpenChat,
    openModal: openModalChat,
    closeModal: closeModalChat,
  } = useModal();

;

  const handleOpenSetting = useCallback(() => {
    openModalSetting();
  }, [openModalSetting]);

  const handleOpenChat = useCallback(() => {
    openModalChat();

  }, [openModalChat]);

  const settingButton = useMemo(
    () => <SettingsButton onClick={handleOpenSetting} />,
    [handleOpenSetting]
  );

  const chatButton = useMemo(
    () => <ChatButton onClick={handleOpenChat} />,
    [handleOpenChat]
  );

  useEffect(() => {
    if (socket) {
  

      socket.emit("join", {
        chat_id: eventId,
        data: {
          round: myEventTeam?.round?.id,
          name: myEventTeam?.round?.name,
          user_id: myEventTeam.user_id,
        },
      });
      socket.on("new_message", (data) => {
        dispatch(setRoomMessages(JSON.parse(data)));
      });
      socket.on("time", (data) => {
      console.log('data :', data);
        dispatch(setAddTime(data.time));
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <Wrapper>
      <SettingBox>
        {settingButton}
        {!myEventTeam.round ||
          (myEventTeam?.user_id === eventInfo?.creator?.id && <CreatorTime eventId={eventId} socket={socket} />)}
        {chatButton}
      </SettingBox>
      {isOpenSetting && (
        <ModalCustom isOpen={isOpenSetting}>
          <SettingWrap>
            <h2>Settings</h2>
            <SettingSound />
            <BtnWrap>
              <button onClick={closeModalSetting}>Close</button>
            </BtnWrap>
          </SettingWrap>
        </ModalCustom>
      )}
      {isOpenChat && (
        <ModalCustom isOpen={isOpenChat}>
          <ChatWrap>
            <h2>Room chat</h2>
            <RoomChat />
            <BtnWrap>
              <button onClick={closeModalChat}>Close</button>
            </BtnWrap>
          </ChatWrap>
        </ModalCustom>
      )}
    </Wrapper>
  );
};

export default LiveSettingChat;
