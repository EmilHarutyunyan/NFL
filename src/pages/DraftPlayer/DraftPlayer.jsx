import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDraftConfig, setResetRound, setStatus } from '../../app/features/draftConfig/draftConfigSlice'
import { getPlayersDraft, resPlayersDraft, selectPlayersDraft } from '../../app/features/playersDraft/playersDraftSlice'
import { setHistoryBoard } from '../../app/features/teamNeeds/teamNeedsSlice'
import { ReactComponent as CircleSvg } from '../../assets/svg/circle.svg'
import DraftPlayerChoose from '../../components/DraftPlayerChoose/DraftPlayerChoose'
import DraftSimulator from '../../components/DraftSimulator/DraftSimulator'
import DraftViewAsign from '../../components/DraftViewAsign/DraftViewAsign'

// Styes
import { Wrapper,Banner, DraftView, DraftViewSimulator, RenderCircle } from './DraftPlayer.styles'

const DraftPlayer = () => {
  const { countRender,teamSelectId,status,tradeValue } = useSelector(selectDraftConfig);
  const dispatch = useDispatch()
  const playersDraft = useSelector(selectPlayersDraft)
  const [thisId,setThisId] = useState(0)
  const [changeId,setChangeId] = useState(0)

  const count = useMemo(() => {
    if(countRender+1 === teamSelectId[0]) {
      dispatch(setStatus('orange'))
      return countRender+1
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [countRender])
  useEffect(()=> {
    dispatch(getPlayersDraft());
    return () => {
      dispatch(resPlayersDraft())
      dispatch(setResetRound())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(() => {
    if(countRender === tradeValue?.results?.length) {
      console.log('tradeValue?.results', tradeValue?.results[0]);
      const  data = {items: []}
      tradeValue?.results.forEach(item => {
        const {round_index,count=null,tm,round,player
        } = item
        const dataItem = {
          round_index:+round_index.split(" ")[0],
          count,
          team:tm,
          draft:round.id,
          player:player.id,
          position:player.position
        }

        data.items.push(dataItem)
      }) 
      dispatch(setHistoryBoard(data))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[countRender])

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
          {!teamSelectId.includes(count) && status !== 'red' ? <DraftSimulator /> : playersDraft.results.length > 0 ? <DraftPlayerChoose playersDraft={playersDraft} draftStatus={status} thisId={thisId} setThisId={setThisId} setChangeId={setChangeId} /> : null }
        </DraftViewSimulator>
      </DraftView>
      
    </Wrapper>
  )
}

export default DraftPlayer