import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDraftConfig,
  setResetRound,
  setStatus,
} from "../../app/features/draftConfig/draftConfigSlice";
// import { getPositions } from '../../app/features/group/groupSlice'
import {
  getPlayersDraft,
  resPlayersDraft,
  selectPlayersDraft,
} from "../../app/features/playersDraft/playersDraftSlice";
import { setHistoryBoard } from "../../app/features/teamNeeds/teamNeedsSlice";
import { ReactComponent as CircleSvg } from "../../assets/svg/circle.svg";
import DraftPlayerChoose from "../../components/DraftPlayerChoose/DraftPlayerChoose";
import DraftSimulator from "../../components/DraftSimulator/DraftSimulator";
import DraftViewAsign from "../../components/DraftViewAsign/DraftViewAsign";
import { StepItem, Steps } from "../DraftConfiguration/DraftConfig.styles";

// Styes
import {
  Wrapper,
  Banner,
  DraftView,
  DraftViewSimulator,
  RenderCircle,
} from "./DraftPlayer.styles";

const DraftPlayer = () => {
  const {
    countRender,
    teamSelectId,
    status,
    tradeValue,
    teams,
    round,
    draftPlayers,
  } = useSelector(selectDraftConfig);
  // const [ordering,setOrdering] = useState("")
  const dispatch = useDispatch();
  const playersDraft = useSelector(selectPlayersDraft);
  console.log("playersDraft :", playersDraft);
  const [thisId, setThisId] = useState(0);
  const [changeId, setChangeId] = useState(0);

  const count = useMemo(() => {
    if (countRender + 1 === teamSelectId[0]) {
      let selectId = teamSelectId[0];
      for (let i = 1; i <= +round; ++i) {
        if (selectId <= 32) {
          break;
        } else {
          selectId = teamSelectId[0] - 32 * i;
        }
      }
      const findTemas = teams.find((team) => selectId === team.id);
      findTemas && dispatch(getPlayersDraft(findTemas.name));
      dispatch(setStatus("orange"));
      return countRender + 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countRender]);

  useEffect(() => {
    dispatch(getPlayersDraft());
    // dispatch(getPositions())

    return () => {
      dispatch(resPlayersDraft());
      dispatch(setResetRound());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (countRender === tradeValue?.results?.length) {
      const data = { items: [] };
      draftPlayers.forEach((item) => {
        const {
          round_index,
          count = null,
          tm,
          round,
          player,
          upPlayers,
        } = item;
        const dataItem = {
          round_index: +round_index.split(" ")[0],
          count,
          team: tm,
          draft: round.id,
          player: player.id,
          position: player.position,
          upPlayers,
        };

        data.items.push(dataItem);
      });
      console.log(data);
      dispatch(setHistoryBoard(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countRender]);

  return (
    <Wrapper className="main-container">
      <Banner>
        <h2>You’re on the Clock!</h2>
        <div className="banner-info">
          <p>Round 1</p>
          <p className="banner-info-border"></p>
          <p>Pick 2</p>
          <p className="banner-info-border"></p>
          <RenderCircle status={status}>
            <CircleSvg />
          </RenderCircle>
        </div>
      </Banner>

      <DraftView>
        <DraftViewAsign
          thisId={countRender}
          setThisId={setThisId}
          setChangeId={setChangeId}
          changeId={changeId}
          players={playersDraft}
        />
        <DraftViewSimulator>
          {!teamSelectId.includes(count) && status !== "red" ? (
            <DraftSimulator />
          ) : playersDraft.results.length > 0 ? (
            <DraftPlayerChoose
              playersDraft={playersDraft}
              draftStatus={status}
              thisId={thisId}
              setThisId={setThisId}
              setChangeId={setChangeId}
            />
          ) : null}
        </DraftViewSimulator>
      </DraftView>
      <hr className="line" />
      <Steps>
        <StepItem>
          <span>1</span>
          <p>Select Your Team (s), Setup Your Draft</p>
        </StepItem>
        <StepItem>
          <span className="active-step">2</span>
          <p>Draft For Your Team</p>
        </StepItem>
        <StepItem>
          <span>3</span>
          <p>Share your Draft</p>
        </StepItem>
      </Steps>
    </Wrapper>
  );
};

export default DraftPlayer;
