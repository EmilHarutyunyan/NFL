import React, { useEffect, useState } from 'react'
// Styles
import {BtnWrap, MultiTeamItem, MultiTeamWrap, Wrapper} from "./MultiPlayerTeam.styles"
import multiTeamImg from "../../assets/img/multiTeam.png"
import { useDispatch, useSelector } from 'react-redux'
import { resetLiveDraft, selectLiveDraft, setMyLiveTeam } from '../../app/features/liveDraft/liveDraftSlice'
import { getLiveTeams } from '../../app/features/liveDraft/liveDraftActions'
import Spinner from "../../components/Spinner/Spinner"
import { LIVE_DRAFT } from '../../router/route-path'
import { Link } from 'react-router-dom'
const MultiPlayerTeam = () => {
  const { liveTeams, otherLiveTeam, loading, myLiveTeam } =
    useSelector(selectLiveDraft);
  const [disableTeam, setDisableTeam] = useState([])
  
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getLiveTeams())
    return () => resetLiveDraft()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(() => {
    if(otherLiveTeam.length) {
      setDisableTeam(otherLiveTeam.map(item => item.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherLiveTeam]);
  if (loading) {
    return <Spinner /> 
  }
  return (
    <Wrapper>
      <h2>Choose a team</h2>
      <MultiTeamWrap>
        {liveTeams.map((team) => {
          let isDisableTeam = disableTeam.includes(team.id)
          let isActive = myLiveTeam?.id === team.id
          
          return (
            <MultiTeamItem
              key={team.id}
              className={isActive ? 'active' : null}
              disabled={isDisableTeam}
              onClick={() => {
                if (!isDisableTeam) dispatch(setMyLiveTeam(team));
              }}
            >
              <div>
                <img src={team.round.logo} alt="team" loading='lazy' />
              </div>
              <p>{team.round.name}</p>
            </MultiTeamItem>
          );
        })}
      </MultiTeamWrap>
      <BtnWrap>
        <Link to={LIVE_DRAFT} >Next</Link>
      </BtnWrap>
    </Wrapper>
  );
}

export default MultiPlayerTeam