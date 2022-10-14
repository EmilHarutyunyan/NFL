import React from 'react'
import { useSelector } from 'react-redux'
import { selectDraftConfig } from '../../app/features/draftConfig/draftConfigSlice'
import { ReactComponent as CircleSvg } from '../../assets/svg/circle.svg'
import DraftPlayerChoose from '../../components/DraftPlayerChoose/DraftPlayerChoose'
import DraftSimulator from '../../components/DraftSimulator/DraftSimulator'
import DraftViewAsign from '../../components/DraftViewAsign/DraftViewAsign'

// Styes
import { Wrapper,Banner, DraftView, RenderCircle, DraftViewSimulator } from './DraftPlayer.styles'

const DraftPlayer = () => {
  const { status } = useSelector(selectDraftConfig);
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
        <DraftViewAsign />
        <DraftViewSimulator>
          {status !== 'green' ? <DraftPlayerChoose /> : <DraftSimulator /> }
        </DraftViewSimulator>
      </DraftView>
      
    </Wrapper>
  )
}

export default DraftPlayer