import React, { useState, useRef, useMemo, useCallback } from "react";
// import downloadjs from "downloadjs";
// import html2canvas from "html2canvas";
// import { toPng } from "html-to-image";
import { useSelector } from "react-redux";
import { selectDraftResult } from "../../app/features/draftResult/draftResultSlice";
import { toPng } from "html-to-image";
import { useNavigate } from "react-router-dom";
// components
import Title from "../../components/Title/Title";
import Button from "../../components/Buttons/Button";
import MySelectImg from "../../components/MySelect/MySelectImg";

// img
import twitterBlue from "../../assets/img/twitter-blue.png";
import logoImg from "../../assets/img/logo.png";
import ordinImg from "../../assets/img/ordin.png";
import markaImg from "../../assets/img/marka.png";
import downlandImg from "../../assets/img/downlandImg.png";

// styles
import {
  DraftResultFooter,
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


const DraftResult = () => {
  const domEl = useRef(null);
  const navigate = useNavigate();
  const [roundSelect, setRoundSelect] = useState(1);
  const { results, roundTeam, teamsName, teamsPlayer } = useSelector(selectDraftResult);
  const [teamMain, setTeamMain] = useState(teamsName[0]);



  const teamSelect = useMemo(() => {
    return teamsPlayer[teamMain];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamMain]);

  const teamTable = useMemo(() => {
    return results.filter(
      (res) => +res.round_index.split(" ")[1] === roundSelect
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundSelect]);

  // const handleCaptureClick = async () => {
  //   const canvas = await html2canvas(domEl.current);
  //   const dataURL = canvas.toDataURL("image/png");
  //   downloadjs(dataURL, "download.png", "image/png");
  // };
    const onButtonClick = useCallback(() => {
      if (domEl.current === null) {
        return;
      }

      toPng(domEl.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "my-image-name.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }, [domEl]);
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
              <img src={twitterBlue} alt="" onClick={onButtonClick} />
            </div>
          </div>
        </div>
        <Button
          btnText="Enter Draft"
          btnClassName="enter-draft-btn"
          onBtnClick={() => navigate("draft-configuration")}
        />
      </DraftResultShare>
      <DraftResultFull>
        <DraftResultWrap>
          <DraftResultHead>
            <ImgWrap>
              <img src={logoImg} alt="logo" />
            </ImgWrap>
            <ImgWrap>
              <img src={ordinImg} alt="logo" />
            </ImgWrap>
            <ImgWrap>
              <img src={ordinImg} alt="logo" />
            </ImgWrap>
            <ImgWrap>
              <img src={ordinImg} alt="logo" />
            </ImgWrap>
            <ImgWrap>
              <img src={ordinImg} alt="logo" />
            </ImgWrap>
            <ImgWrap>
              <img src={ordinImg} alt="logo" />
            </ImgWrap>
            <ImgWrap>
              <img src={ordinImg} alt="logo" />
            </ImgWrap>
          </DraftResultHead>
          <DraftResultRound>
            {roundTeam?.map((item, idx) => {
              const roundText = item.split(" ");
              if (+roundText[1] === roundSelect) {
                return (
                  <DraftResultRoundItem
                    active
                    onClick={() => setRoundSelect(+roundText[1])}
                    key={idx}
                  >
                    {item}
                  </DraftResultRoundItem>
                );
              }
              return (
                <DraftResultRoundItem
                  key={idx}
                  onClick={() => setRoundSelect(+roundText[1])}
                >
                  {item}
                </DraftResultRoundItem>
              );
            })}
          </DraftResultRound>
          <DraftResultTeam backImg={markaImg}>
            {teamTable.length &&
              teamTable.map((team, idx) => {
                return (
                  <DraftResultTeamItem key={idx}>
                    <div className="draft-result-team-round">
                      <p>
                        R{roundSelect}:<span>{team?.index}</span>
                      </p>
                    </div>
                    <div className="draft-result-team-adp">
                      <p>ADP</p>
                    </div>
                    <div className="draft-result-team-log">
                      <img src={team?.round?.logo} alt="Team Logo" width={65} />
                      <p>{team?.player?.player}</p>
                    </div>
                    <div className="draft-result-team-pos">
                      <p>{team?.player?.position}</p>
                    </div>
                    <div className="draft-result-team-college">
                      <p>{team?.player?.school}</p>
                    </div>
                    <div className="draft-result-team-rating">
                      <p className="draft-result-team-rating-block"></p>
                      <p>A+</p>
                    </div>
                  </DraftResultTeamItem>
                );
              })}
          </DraftResultTeam>
          <DraftResultFooter>www.DraftSimulator.com</DraftResultFooter>
        </DraftResultWrap>
        <DraftResultPick>
          <div className="downland-btn">
            <img src={downlandImg} alt="" onClick={onButtonClick} />
            <p>Download results image</p>
          </div>
          <DraftResultHead>
            <MySelectImg
              // label={teamsName[0]}
              name={teamMain}
              dataValue={teamsName}
              handleChange={(item) => setTeamMain(item.value)}
            />
          </DraftResultHead>

          <DraftResultPickWrap ref={domEl}>
            {teamSelect && (
              <div className="draft-result-pick-logo">
                <img src={teamSelect[0]?.round?.logo} alt="Texans" />
                <p>{teamSelect[0]?.round?.name}</p>
              </div>
            )}
            {teamSelect &&
              teamSelect?.map((team, idx) => {
                const round = +team?.round_index?.split(" ")[1];
                return (
                  <React.Fragment key={idx}>
                    
                    <div className="draft-result-pick-item">
                      <div className="draft-result-pick-item-info">
                        <div className="draft-result-pick-round">
                          <p>
                            R{round}:<span>{team?.index}</span>
                          </p>
                        </div>
                        <div className="draft-result-pick-adp">
                          <p>ADP</p>
                        </div>
                        <div className="draft-result-pick-name">
                          {team?.player?.player}
                        </div>
                        <div className="draft-result-pick-pos">
                          <p>{team?.player?.position}</p>
                        </div>
                      </div>
                      <div className="draft-result-pick-item-text">
                        <div className="draft-result-pick-college">
                          <p>{team?.player?.school}</p>
                        </div>
                        <div className="draft-result-pick-rating">
                          <p className="draft-result-pick-rating-block"></p>
                          <p>A+</p>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
          </DraftResultPickWrap>
        </DraftResultPick>
      </DraftResultFull>
    </Wrapper>
  );
};

export default DraftResult;
