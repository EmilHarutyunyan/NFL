import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
// import downloadjs from "downloadjs";
// import html2canvas from "html2canvas";
// import { toPng } from "html-to-image";
import { useDispatch, useSelector } from "react-redux";
import { selectDraftResult } from "../../app/features/draftResult/draftResultSlice";
import * as htmlToImage from "html-to-image";
import { useNavigate } from "react-router-dom";
// components
import Title from "../../components/Title/Title";
import Button from "../../components/Buttons/Button";
import MySelectImg from "../../components/MySelect/MySelectImg";

// img
import twitterBlue from "../../assets/img/twitter-blue.png";
import markaImg from "../../assets/img/marka.png";
import downlandImg from "../../assets/img/downlandImg.png";

// styles
import {
  BadgesItems,
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
  MySelectWrap,
  TradesItem,
  TradesItems,
  TradesWrap,
  Wrapper,
} from "./DraftResult.styles";
import { dataURLtoBlob } from "../../utils/utils";
import BadgesIcon from "../../components/BadgesIcon/BadgesIcon";
import { userUpdate } from "../../app/features/user/userActions";
import { selectUser } from "../../app/features/user/userSlice";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "../../components/ErrorFallBack/ErrorFallBack";
import { selectTrades } from "../../app/features/trades/tradesSlice";

const DraftResult = () => {
  const domEl = useRef(null);
  const navigate = useNavigate();
  const [roundSelect, setRoundSelect] = useState(1);
  const [copyShow, setCopyShow] = useState(false);
  const {
    results,
    roundTeam,
    teamsName,
    teamsPlayer,
    bpa_badges,
    fanatic_mode,
  } = useSelector(selectDraftResult);

  const { historyTrades } = useSelector(selectTrades);

  const { userInfo } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [teamMain, setTeamMain] = useState(teamsName[0]);

  const teamSelect = useMemo(() => {
    return teamsPlayer[teamMain];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamMain]);

  useEffect(() => {
    if (bpa_badges > 0 || fanatic_mode > 0) {
      const countBpa = userInfo?.bpa_badges + bpa_badges;
      const fanaticCount = fanatic_mode ? fanatic_mode : userInfo?.fanatic_mode;
      dispatch(
        userUpdate({ bpa_badges: countBpa, fanatic_mode: fanaticCount })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpa_badges, fanatic_mode]);
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
    htmlToImage
      .toPng(domEl.current, { cacheBust: false })
      .then((dataUrl) => {
        console.log("dataUrl :", dataUrl);
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
          console.clear();
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
    <ErrorBoundary FallbackComponent={ErrorFallBack}>
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
                <img src={twitterBlue} onClick={onButtonClick} alt="twitter" />
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
                        <img
                          src={team?.round?.logo}
                          alt={team?.round?.name}
                          width={65}
                        />
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
                        <GradeBox color={grading?.color}></GradeBox>
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
              <img src={downlandImg} alt="download" />
              <p>Download results image</p>
            </div>
            <div className="downland-copy" onClick={onCopyImage}>
              <p>{copyShow ? "COPIED!" : "Copy Image"}</p>
            </div>
            <DraftResultHead>
              <BadgesItems>
                {bpa_badges ? (
                  <BadgesIcon
                    badge="bpa_badges"
                    count={bpa_badges}
                    width={"47px"}
                  />
                ) : null}
                {fanatic_mode ? (
                  <BadgesIcon
                    badge={`fanatic_mode_${fanatic_mode}`}
                    count={fanatic_mode}
                    width={"47px"}
                  />
                ) : null}
              </BadgesItems>
              <MySelectWrap>
                <MySelectImg
                  name={teamMain}
                  dataValue={teamsName}
                  handleChange={(item) => setTeamMain(item.value)}
                />
              </MySelectWrap>
            </DraftResultHead>

            <DraftResultPickWrap ref={domEl}>
              {teamSelect && (
                <div className="draft-result-pick-logo">
                  <img
                    src={teamSelect[0]?.round?.logo}
                    alt={teamSelect[0]?.round?.name}
                  />
                  <p>{teamSelect[0]?.round?.name}</p>
                </div>
              )}
              {teamSelect &&
                teamSelect?.map((team, idx) => {
                  const round = +team?.round_index?.split(" ")[1];
                  const grading = gradingCalc(team?.player?.bpa);
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
                            {/* <p>{team?.playerDepth}</p> */}
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
                            <GradeBox color={grading?.color}></GradeBox>
                            <p>{grading.grade}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        {historyTrades?.map((team) => {
                          if (team.myTeam === teamSelect[0]?.round?.name) {
                            return (
                              <TradesWrap>
                                <TradesItems>
                                  <TradesItem>
                                    <div>
                                      <img
                                        src={team.roundMain.round.logo}
                                        alt=""
                                      />
                                    </div>
                                    <div>
                                      <h6>Player</h6>
                                      <p>
                                        <span>{team.playerMain.position} </span>
                                        {team.playerMain.player}
                                      </p>
                                    </div>
                                    <div>
                                      <h6>Pick</h6>
                                      {team.pickMain?.map((pi) => {
                                        return <span>{pi} </span>;
                                      })}
                                    </div>
                                    <div>
                                      <h6>2024</h6>
                                      {team.mainNextYears?.map((pick) => {
                                        return <span>{pick.round} </span>;
                                      })}
                                    </div>
                                  </TradesItem>
                                  <TradesItem>
                                    <div>
                                      <img
                                        src={team.round.round.logo}
                                        alt=""
                                      />
                                    </div>
                                    <div>
                                      <h6>Player</h6>
                                      <p>
                                        <span>{team.player.position} </span>
                                        {team.player.player}
                                      </p>
                                    </div>
                                    <div>
                                      <h6>Pick</h6>
                                      {team.pick?.map((pi) => {
                                        return <span>{pi} </span>;
                                      })}
                                    </div>
                                    <div>
                                      <h6>2024</h6>
                                      {team.nextYears?.map((pick) => {
                                        return <span>{pick.round} </span>;
                                      })}
                                    </div>
                                  </TradesItem>
                                </TradesItems>
                              </TradesWrap>
                            );
                          }
                        })}
                      </div>
                    </React.Fragment>
                  );
                })}
            </DraftResultPickWrap>
          </DraftResultPick>
        </DraftResultFull>
      </Wrapper>
    </ErrorBoundary>
  );
};

export default DraftResult;
