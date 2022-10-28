import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDraftConfig } from '../../app/features/draftConfig/draftConfigSlice'
import { ReactComponent as CircleSvg } from '../../assets/svg/circle.svg'
import DraftPlayerChoose from '../../components/DraftPlayerChoose/DraftPlayerChoose'
import DraftSimulator from '../../components/DraftSimulator/DraftSimulator'
import DraftViewAsign from '../../components/DraftViewAsign/DraftViewAsign'

// Styes
import { Wrapper,Banner, DraftView, DraftViewSimulator, RenderCircle } from './DraftPlayer.styles'

const DraftPlayer = () => {
  const { countRender,teamSelectId,status } = useSelector(selectDraftConfig);
  console.log('🚀 ~ file: DraftPlayer.jsx ~ line 14 ~ DraftPlayer ~ teamSelectId', teamSelectId)
  // const dispatch = useDispatch()
  const [thisId,setThisId] = useState(0)
  const [changeId,setChangeId] = useState(0)
  const count = useMemo(() => countRender+1, [countRender])
   
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
      {/* Settings */}
      <DraftView>
        <DraftViewAsign thisId={thisId} setThisId={setThisId} setChangeId={setChangeId} changeId={changeId} />
        <DraftViewSimulator>
          {!teamSelectId.includes(count) && status !== 'pause' ? <DraftSimulator /> : <DraftPlayerChoose draftStatus={status} thisId={thisId} setThisId={setThisId} setChangeId={setChangeId} /> }
        </DraftViewSimulator>
      </DraftView>
      
    </Wrapper>
  )
}

export default DraftPlayer