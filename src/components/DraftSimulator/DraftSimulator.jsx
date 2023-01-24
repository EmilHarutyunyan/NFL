import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {selectDraftConfig, setPauseId, setStatus } from '../../app/features/draftConfig/draftConfigSlice';
// Styles
import { DraftSimulatorWrapper, DraftStart, DraftStartBtn } from './DraftSimulator.styles'
// Img
import pauseImg from "../../assets/img/pause.png";

const DraftSimulator = () => {
  const { countRender, round, teamPickIndex } =
    useSelector(selectDraftConfig);
  const dispatch = useDispatch();
  const count = useMemo(() => countRender, [countRender])
  console.log("🚀 ~ file: DraftSimulator.jsx:14 ~ DraftSimulator ~ count", count)
 
  return (
    <DraftSimulatorWrapper>
      <DraftStart>
        <p>
          {teamPickIndex[0] ? teamPickIndex[0] - count - 1 : +round * 32 - count - 1}
        </p>
        <p>Picks until your turn ...</p>
      </DraftStart>
      <DraftStartBtn
        onClick={() => {
          dispatch(setPauseId(count));
          dispatch(setStatus("red"));
        }}
      >
        <img src={pauseImg} alt="play_pause" />
        <span>Pause</span>
      </DraftStartBtn>
    </DraftSimulatorWrapper>
  );
}

export default DraftSimulator