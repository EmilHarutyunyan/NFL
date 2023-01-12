import React from "react";
import Title from "../../components/Title/Title";
import {
  DraftResultFull,
  DraftResultHead,
  DraftResultPick,
  DraftResultPickWrap,
  DraftResultRound,
  DraftResultRoundItem,
  DraftResultShare,
  DraftResultTeam,
  DraftResultTeamItem,
  DraftResultWrap,
  ImgWrap,
  Wrapper,
} from "./DraftResult.styles";
// Img
import twitterBlue from "../../assets/img/twitter-blue.png";
import logoImg from "../../assets/img/logo.png";
import texanLogo from "../../assets/img/texans.png";

import Button from "../../components/Buttons/Button";
import MySelectImg from "../../components/MySelect/MySelectImg";
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
      <DraftResultFull>
        <DraftResultWrap>
          <DraftResultHead>
            <ImgWrap>
              <img src={logoImg} alt="logo" />
            </ImgWrap>
          </DraftResultHead>
          <DraftResultRound>
            <DraftResultRoundItem active>Round 1</DraftResultRoundItem>
            <DraftResultRoundItem>Round 2</DraftResultRoundItem>
          </DraftResultRound>
          <DraftResultTeam>
            <DraftResultTeamItem>
              <div className="draft-result-team-round">
                <p>
                  R2:<span>33</span>
                </p>
              </div>
              <div className="draft-result-team-adp">
                <p>ADP</p>
              </div>
              <div className="draft-result-team-log">
                <img src={texanLogo} alt="Team Logo" />
                <p>Derrick Henry</p>
              </div>
              <div className="draft-result-team-pos">
                <p>LB</p>
              </div>
              <div className="draft-result-team-college">
                <p>Georgia</p>
              </div>
              <div className="draft-result-team-rating">
                <p className="draft-result-team-rating-block"></p>
                <p>
                  <p>A+</p>
                </p>
              </div>
            </DraftResultTeamItem>
            <DraftResultTeamItem>
              <div className="draft-result-team-round">
                <p>
                  R2:<span>33</span>
                </p>
              </div>
              <div className="draft-result-team-adp">
                <p>ADP</p>
              </div>
              <div className="draft-result-team-log">
                <img src={texanLogo} alt="Team Logo" />
                <p>Derrick Henry</p>
              </div>
              <div className="draft-result-team-pos">
                <p>LB</p>
              </div>
              <div className="draft-result-team-college">
                <p>Georgia</p>
              </div>
              <div className="draft-result-team-rating">
                <p className="draft-result-team-rating-block"></p>
                <p>
                  <p>A+</p>
                </p>
              </div>
            </DraftResultTeamItem>
            <DraftResultTeamItem>
              <div className="draft-result-team-round">
                <p>
                  R2:<span>33</span>
                </p>
              </div>
              <div className="draft-result-team-adp">
                <p>ADP</p>
              </div>
              <div className="draft-result-team-log">
                <img src={texanLogo} alt="Team Logo" />
                <p>Derrick Henry</p>
              </div>
              <div className="draft-result-team-pos">
                <p>LB</p>
              </div>
              <div className="draft-result-team-college">
                <p>Georgia</p>
              </div>
              <div className="draft-result-team-rating">
                <p className="draft-result-team-rating-block"></p>
                <p>
                  <p>A+</p>
                </p>
              </div>
            </DraftResultTeamItem>
          </DraftResultTeam>
        </DraftResultWrap>
        <DraftResultPick>
          <DraftResultHead>
            <MySelectImg
              label={"Texans"}
              name={"Texans"}
              dataValue={["Texans", "Falcons"]}
              handleChange={(item) => alert(item)}
            />
          </DraftResultHead>
          <DraftResultPickWrap>
            <div className="draft-result-pick-logo">
              <img src={texanLogo} alt="Texans" />
              <p>Texans</p>
            </div>
            <div className="draft-result-pick-item">
              <div className="draft-result-pick-item-info">
                <div className="draft-result-pick-round">
                  <p>
                    R2:<span>33</span>
                  </p>
                </div>
                <div className="draft-result-pick-adp">
                  <p>ADP</p>
                </div>
                <div className="draft-result-pick-name">
                  <p>Derrick Henry</p>
                </div>
                <div className="draft-result-pick-pos">
                  <p>LB</p>
                </div>
              </div>
              <div className="draft-result-pick-item-text">
                <div className="draft-result-pick-college">
                  <p>Georgia</p>
                </div>
                <div className="draft-result-pick-rating">
                  <p className="draft-result-pick-rating-block"></p>
                  <p>
                    <p>A+</p>
                  </p>
                </div>
              </div>
            </div>
            <div className="draft-result-pick-item">
              <div className="draft-result-pick-item-info">
                <div className="draft-result-pick-round">
                  <p>
                    R2:<span>33</span>
                  </p>
                </div>
                <div className="draft-result-pick-adp">
                  <p>ADP</p>
                </div>
                <div className="draft-result-pick-name">
                  <p>Derrick Henry</p>
                </div>
                <div className="draft-result-pick-pos">
                  <p>LB</p>
                </div>
              </div>
              <div className="draft-result-pick-item-text">
                <div className="draft-result-pick-college">
                  <p>Georgia</p>
                </div>
                <div className="draft-result-pick-rating">
                  <p className="draft-result-pick-rating-block"></p>
                  <p>
                    <p>A+</p>
                  </p>
                </div>
              </div>
            </div>
          </DraftResultPickWrap>
        </DraftResultPick>
      </DraftResultFull>
    </Wrapper>
  );
};

export default DraftResult;
