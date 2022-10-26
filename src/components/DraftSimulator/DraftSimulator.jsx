import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {selectDraftConfig, setPauseId, setStatus } from '../../app/features/draftConfig/draftConfigSlice';
// Styles
import { DraftSimulatorWrapper, DraftStart, DraftStartBtn } from './DraftSimulator.styles/DraftSimulator.styles'
// Img
import pauseImg from "../../assets/img/pause.png";

const DraftSimulator = () => {
  const {countRender,round} = useSelector(selectDraftConfig)
  const dispatch = useDispatch();
  const count = useMemo(() => countRender, [countRender])
 
  return (
    <DraftSimulatorWrapper>
    <DraftStart>
      <p>{+round*32 - count}</p>
      <p>Picks until your turn ...</p>
    </DraftStart>
    <DraftStartBtn onClick={()=> {
    
      dispatch(setPauseId(count))
      dispatch(setStatus('pause'))
    }
      }>
      <img src={pauseImg} alt="play_pause" />
      <span>Pause</span>
    </DraftStartBtn>
  </DraftSimulatorWrapper>
  )
}

export default DraftSimulator