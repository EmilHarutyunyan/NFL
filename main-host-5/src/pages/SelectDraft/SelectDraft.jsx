import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// styles
import {
  ArrowDiv,
  BtnWrap,
  InfoDiv,
  ModalBody,
  MultiColumn,
  MultiRow,
  SelectColumn,
  SelectColumns,
  Wrapper,
} from "./SelectDraft.styles";
// images
import infoImg from "../../assets/img/info2.png";
import { useState } from "react";
import {
  LIVE_DRAFT,
  MULTI_PLAYER_FIND,
  PROFILE_DRAFT_EVENTS_CREATE,
} from "../../router/route-path";
import { useSelector } from "react-redux";
import { resetLiveDraft, selectLiveDraft } from "../../app/features/liveDraft/liveDraftSlice";
import { useDispatch } from "react-redux";
import { liveEventsSession } from "../../app/features/liveDraft/liveDraftActions";
import Spinner from "../../components/Spinner/Spinner";
import useModal from "../../hooks/useModal";
import { createPortal } from "react-dom";

import ModalCustom from "../../components/ModalCustom/ModalCustom";
function SelectDraft() {
  const [infoHover, setInfoHover] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const { isOpen, openModal, closeModal } = useModal();

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { eventId, loading, message } = useSelector(selectLiveDraft);
  const navigate = useNavigate();
  const onMouseEnter = () => {
    setInfoHover(true);
  };

  const onMouseLeave = () => {
    setInfoHover(false);
  };

  const handleJoinLiveDraft = useCallback(
    (session_id) => {
      if (session_id === "") {
        setError("Invalid session id");
        return;
      }
      dispatch(liveEventsSession(sessionId));
      setSessionId("");
      setError("");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionId]
  );

  useEffect(() => {
    if (eventId) {
      navigate(`${LIVE_DRAFT}/${eventId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  useEffect(()=> {
    if(message) {
      setSessionId("");
      setError("");
      openModal()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[message])

  const handleCloseModal = useCallback(()=> {
    closeModal()
    dispatch(resetLiveDraft());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Wrapper>
      <h1>Select Draft Mode</h1>
      <SelectColumns>
        <SelectColumn>
          <h2>Single Player Draft</h2>
          <Link to="/draft-configuration">Single Player</Link>
        </SelectColumn>
        {/* <SelectColumn>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h2>Multi-Player Draft</h2>
              <MultiColumn>
                {error && <p class="error">{error}</p>}
                <MultiRow>
                  <button
                    type="button"
                    onClick={() => handleJoinLiveDraft(sessionId)}
                  >
                    Join Multi-User draft
                  </button>
                  <form
                    action=""
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleJoinLiveDraft(sessionId);
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Enter Session Id To Join"
                      value={sessionId}
                      onChange={(e) => setSessionId(e.target.value)}
                    />
                    <button type="submit">Join</button>
                  </form>
                </MultiRow>

                <MultiRow>
                  <Link to={PROFILE_DRAFT_EVENTS_CREATE}>
                    Create Multi-User draft
                  </Link>
                  <InfoDiv>
                    <img
                      src={infoImg}
                      alt="info"
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                    ></img>
                    <ArrowDiv infoHover={infoHover}>
                      Paid premium members only $29.95
                    </ArrowDiv>
                  </InfoDiv>
                </MultiRow>
                <MultiRow>
                  <Link to={MULTI_PLAYER_FIND}>Find Multi-User drafts</Link>
                </MultiRow>
              </MultiColumn>
            </>
          )}
        </SelectColumn> */}
      </SelectColumns>
      {isOpen ? createPortal(<ModalCustom isOpen={isOpen}>
        <ModalBody>
        <h2>{message}</h2>
        <BtnWrap>
          <button onClick={handleCloseModal} >Close</button>
        </BtnWrap>
        </ModalBody>
      </ModalCustom>,document.body) : null}
      
    </Wrapper>
  );
}

export default SelectDraft;
