import React, { useState, useRef, useMemo, useCallback } from "react";
// import downloadjs from "downloadjs";
// import html2canvas from "html2canvas";
// import { toPng } from "html-to-image";
import { useSelector } from "react-redux";
import { selectDraftResult } from "../../app/features/draftResult/draftResultSlice";
import * as htmlToImage from "html-to-image";
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
  GradeBox,
  ImgWrap,
  Wrapper,
} from "./DraftResult.styles";
import { dataURLtoBlob } from "../../utils/utils";

const DraftResult = () => {
  const domEl = useRef(null);
  const navigate = useNavigate();
  const [roundSelect, setRoundSelect] = useState(1);
  const [copyShow,setCopyShow] = useState(false)
  const { results, roundTeam, teamsName, teamsPlayer } =
    useSelector(selectDraftResult);
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

  const onButtonClick = useCallback(() => {
    if (domEl.current === null) {
      return;
    }

    htmlToImage.toPng(domEl.current, { cacheBust: false })
      .then((dataUrl) => {
        debugger
      console.log('dataUrl :', dataUrl);
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
        console.clear();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [domEl]);


   const onCopyImage = useCallback(() => {
     if (domEl.current === null) {
       return;
     }
     
     setCopyShow(true);
     htmlToImage
       .toPng(domEl.current, { cacheBust: false })
       .then((dataUrl) => {
         const imgBlob = dataURLtoBlob(dataUrl);
         const { ClipboardItem } = window;
         try {
           navigator.clipboard.write([
             new ClipboardItem({
               "image/png": imgBlob,
             }),
           ]);
           setCopyShow(false);
           console.clear()
         } catch (error) {
           setCopyShow(false);
           console.clear();
           console.error(error);
         }
       })
       .catch((err) => {
         console.log(err);
       });
   }, [domEl]);

  const gradingCalc = (count) => {
    if (count === 1) {
      return { grade: "A+", color: "#3ADF00" };
    } else if (count >= 2 && count <= 8) {
      return { grade: "A", color: "#00950F" };
    } else if (count >= 9 && count <= 16) {
      return { grade: "B", color: "#002D85" };
    } else if (count >= 17 && count <= 33) {
      return { grade: "C", color: "#FFB800" };
    } else if (count >= 34) {
      return { grade: "D", color: "#e43c3c" };
    }
  };
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
          {/* <p>draftRandomnessTeam {draftRandomnessTeam.join(" ")}</p> */}
        </div>
        <Button
          btnText="Enter Draft"
          btnClassName="enter-draft-btn"
          onBtnClick={() => navigate("/draft-configuration")}
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
                const grading = gradingCalc(team?.playerDepth);
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
                      {/* <p>{team?.playerDepth}</p> */}
                    </div>
                    <div className="draft-result-team-pos">
                      <p>{team?.player?.position}</p>
                    </div>
                    <div className="draft-result-team-college">
                      <p>{team?.player?.school}</p>
                    </div>
                    <div className="draft-result-team-rating">
                      <GradeBox color={grading.color}></GradeBox>
                      <p>{grading.grade}</p>
                    </div>
                  </DraftResultTeamItem>
                );
              })}
          </DraftResultTeam>
          <DraftResultFooter>www.DraftSimulator.com</DraftResultFooter>
        </DraftResultWrap>
        <DraftResultPick>
          <div className="downland-btn" onClick={onButtonClick}>
            <img src={downlandImg} alt="" />
            <p>Download results image</p>
          </div>
          <div className="downland-copy" onClick={onCopyImage} >
            <p>{copyShow ? 'COPIED!' :  'Copy Image'}</p>
          </div>
          <DraftResultHead>
            <MySelectImg
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
                const grading = gradingCalc(team?.playerDepth);
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
                          <p>{team?.playerDepth}</p>
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
                          <GradeBox color={grading.color}></GradeBox>
                          <p>{grading.grade}</p>
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
