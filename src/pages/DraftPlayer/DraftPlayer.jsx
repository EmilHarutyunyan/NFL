import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDraftConfig, setStatus } from '../../app/features/draftConfig/draftConfigSlice'
import { getPlayersDraft, selectPlayersDraft } from '../../app/features/playersDraft/playersDraftSlice'
import { ReactComponent as CircleSvg } from '../../assets/svg/circle.svg'
import DraftPlayerChoose from '../../components/DraftPlayerChoose/DraftPlayerChoose'
import DraftSimulator from '../../components/DraftSimulator/DraftSimulator'
import DraftViewAsign from '../../components/DraftViewAsign/DraftViewAsign'

// Styes
import { Wrapper,Banner, DraftView, DraftViewSimulator, RenderCircle } from './DraftPlayer.styles'

const DraftPlayer = () => {
  const { countRender,teamSelectId,status } = useSelector(selectDraftConfig);
  const dispatch = useDispatch()
  const playersDraft = useSelector(selectPlayersDraft)
  const [thisId,setThisId] = useState(0)
  const [changeId,setChangeId] = useState(0)
  const initialRef = useRef(true)
  const count = useMemo(() => {
    if(countRender+1 === teamSelectId[0]) {
      dispatch(setStatus('orange'))
      return countRender+1
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countRender])
   
  useEffect(()=> {
    if(initialRef.current) {
      initialRef.current = false
      
      dispatch(getPlayersDraft());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Wrapper className='main-container'>
      <Banner>
        <h2>You’re on the Clock!</h2>
        <div className='banner-info'>
          <p>Round 1</p>
          <p className='banner-info-border'></p>
          <p>Pick 2</p>
          <p className='banner-info-border'></p>
          <RenderCircle status={status}><CircleSvg /></RenderCircle>
        </div>
      </Banner>

      <DraftView>
        <DraftViewAsign thisId={thisId} setThisId={setThisId} setChangeId={setChangeId} changeId={changeId} players={playersDraft}/>
        <DraftViewSimulator>
          {!teamSelectId.includes(count) && status !== 'red' ? <DraftSimulator /> : <DraftPlayerChoose playersDraft={playersDraft} draftStatus={status} thisId={thisId} setThisId={setThisId} setChangeId={setChangeId} /> }
        </DraftViewSimulator>
      </DraftView>
      
    </Wrapper>
  )
}

export default DraftPlayer