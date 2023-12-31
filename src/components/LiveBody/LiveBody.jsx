import React from 'react'
// Styles
import {Wrapper} from "./LiveBody.styles"
import LivePlayerPool from '../LivePlayerPool/LivePlayerPool'
import LiveMyPicks from '../LiveMyPicks/LiveMyPicks'
import LiveOverallPicks from '../LiveOverallPicks/LiveOverallPicks'
import { useSelector } from 'react-redux'
import { selectLiveDraft } from '../../app/features/liveDraft/liveDraftSlice'
const LiveBody = () => {
  const { myEventTeam } = useSelector(selectLiveDraft);
 
  return (
    <Wrapper myEventTeam={myEventTeam}>
      <LivePlayerPool />
      {myEventTeam.round && <LiveMyPicks />}

      <LiveOverallPicks />
    </Wrapper>
  );
}

export default LiveBody