
import React from 'react'
import Title from '../../components/Title/Title'
import { DraftResultTitle, Wrapper } from './DraftResult.styles'
// Img
import refreshImg from "../../assets/img/refresh.png"

import Button from '../../components/Buttons/Button'
const DraftResult = () => {
  return (
    <Wrapper className='main-container'>
      <DraftResultTitle>
        <Title titleText="Your Mock Draft Result  " titleClassName="draftResultTitle" />
  
        <Button
          btnText="Enter Draft"
          btnIcon={refreshImg}
          btnClassName="enter-draft-btn"
          onBtnClick={""}

        />
      </DraftResultTitle>
    </Wrapper>
  )
}

export default DraftResult