
import React from 'react'
import Title from '../../components/Title/Title'
import { DraftResultShare, DraftResultWrap, Wrapper } from "./DraftResult.styles";
// Img
import twitterBlue from "../../assets/img/twitter-blue.png"

import Button from '../../components/Buttons/Button'
const DraftResult = () => {
  return (
    <Wrapper className="main-container">
      <Title
        titleText="Your Mock Draft Result  "
        titleClassName="draftResultTitle"
      />
      <DraftResultShare>
        <div className="share-draft-wrap">
          <div className="share-draft">
            <p>Share Your Mock Draft Result</p>
            <div>
              <img src={twitterBlue} alt="" />
            </div>
          </div>
        </div>
        <Button
          btnText="Enter Draft"
          btnClassName="enter-draft-btn"
          onBtnClick={""}
        />
      </DraftResultShare>
      <DraftResultWrap>
        {/* <DraftResultRound> */}

          DraftResultRound
        {/* </DraftResultRound> */}
        {/* <DraftResultTeam></DraftResultTeam> */}
      </DraftResultWrap>
    </Wrapper>
  );
}

export default DraftResult