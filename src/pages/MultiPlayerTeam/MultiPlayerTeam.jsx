import React, { useEffect, useState } from 'react'
// Styles
import {BtnWrap, MultiTeamItem, MultiTeamWrap, TeamItemDiv, TeamModal, Wrapper} from "./MultiPlayerTeam.styles"
import multiTeamImg from "../../assets/img/multiTeam.png"
import { useDispatch, useSelector } from 'react-redux'
import { resetLiveDraft, selectLiveDraft, setMyLiveTeam } from '../../app/features/liveDraft/liveDraftSlice'
import { getLiveTeams, joinEvent } from '../../app/features/liveDraft/liveDraftActions'
import Spinner from "../../components/Spinner/Spinner"
import { LIVE_DRAFT } from '../../router/route-path'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API_ENDPOINT } from '../../config/config'
import useModal from '../../hooks/useModal'
import ModalCustom from '../../components/ModalCustom/ModalCustom'
const MultiPlayerTeam = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const { liveTeams, loading, myLiveTeam, joinTeam, error } =
    useSelector(selectLiveDraft);

   const {
     isOpen,
     openModal,
     closeModal,
   } = useModal();
  const dispatch = useDispatch()
  useEffect(()=> {
    if(id) {
      dispatch(getLiveTeams(id))
    }
    return () => dispatch(resetLiveDraft())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id])
  useEffect(() => {
    if(joinTeam) {
      openModal()
    }
  },[joinTeam])
  const chooseTeam = async (teamId) => {
    dispatch(joinEvent({event_id:id,round:`${teamId}`}))
    dispatch(getLiveTeams(id));
    
  }
 

  if (loading) {
    return <Spinner /> 
  }
  if (error) {
    return <>{error}</>;
  }
  return (
    <Wrapper>
      <h2>Choose a team</h2>
      <MultiTeamWrap>
        {liveTeams.map((team,idx) => {
          let isActive = myLiveTeam?.id === team.id;

          return (
            // <MultiTeamItem
            //   key={team.id}
            //   className={isActive && team.free ? "active" : null}
            //   disabled={!team?.free}
            //   onClick={() => {
            //     if (team.free) dispatch(setMyLiveTeam(team));
            //   }}
            // >
            //   <div>
            //     <img
            //       src={`https://api.nfldraftfanatics.com${team.logo}`}
            //       alt="team"
            //       loading="lazy"
            //     />
            //   </div>
            //   <p>{team.name}</p>
            // </MultiTeamItem>
            <TeamItemDiv
              // onClick={() => handleClick(item)}
              // className={`team-item ${isChecked ? "active" : ""}`}
              key={team.id}
              className={isActive && team.free ? "active" : null}
              disabled={!team?.free}
              onClick={() => {
                if (team.free) dispatch(setMyLiveTeam(team));
              }}
            >
              <div>
                <span className="num">{idx + 1}</span>
                <p className="name">{team.name}</p>
              </div>
              <img
                src={`https://api.nfldraftfanatics.com${team.logo}`}
                alt={team.name}
              />
            </TeamItemDiv>
          );
        })}
      </MultiTeamWrap>
      <BtnWrap>
        <button
          disabled={!(myLiveTeam !== null)}
          onClick={() => chooseTeam(myLiveTeam.id)}
        >
          Choose a Team
        </button>
      </BtnWrap>

      {isOpen && (
        <ModalCustom isOpen={isOpen}>
          <TeamModal>
            <h2>
              Thank you for choosing a team, you have successfully joined the event!
            </h2>
            <button onClick={()=> {
              closeModal()
              navigate(-1)
            }}>Close</button>
          </TeamModal>
        </ModalCustom>
      )}
    </Wrapper>
  );
}

export default MultiPlayerTeam