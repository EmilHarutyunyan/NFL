import React from 'react'
import { DraftPicksBlock, DraftPicksBlocks, DraftPicksWrap } from './DraftPicks.styles'




const DraftPicksItem = ({roundData}) => {
  return (
  <DraftPicksBlock>
    <p>{roundData.round}</p>
    <p>{roundData.roundValue}</p>
    
  </DraftPicksBlock>
  )
}


const DraftPicks = ({title,dataRound}) => {
  return (
    <DraftPicksWrap>
      <h6>{title}</h6>
      <DraftPicksBlocks>
        {dataRound.map((item,idx) => {
          return <DraftPicksItem key={idx} roundData={item} />
        })}
      </DraftPicksBlocks>
    </DraftPicksWrap>
  )
}

export default DraftPicks