import React from 'react'
// Styles
import { DraftSimulatorWrapper, DraftStart, DraftStartBtn } from './DraftSimulator.styles/DraftSimulator.styles'
// Img
import pauseImg from "../../assets/img/pause.png";

const DraftSimulator = () => {
  return (
    <DraftSimulatorWrapper>
    <DraftStart>
      <p>29</p>
      <p>Picks until your turn ...</p>
    </DraftStart>
    <DraftStartBtn>
      <img src={pauseImg} alt="play_pause" />
      <span>Pause</span>
    </DraftStartBtn>
  </DraftSimulatorWrapper>
  )
}

export default DraftSimulator