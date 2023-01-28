import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTradeValue } from "../../app/features/draftConfig/drafConfigAction";
import {
  selectDraftConfig,
  setResetRound,
} from "../../app/features/draftConfig/draftConfigSlice";
import { selectDraftResult, setDraftResultAction } from "../../app/features/draftResult/draftResultSlice";
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
    status,
    tradeValue,
    round,
    draftPlayers,
    teamSelect,
    teamPickIndex,
    teamPickIndexControl,
    draftRandomnessTeam,
  } = useSelector(selectDraftConfig);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playersDraft = useSelector(selectPlayersDraft);
  const draftResults  = useSelector(selectDraftResult);

  const [thisId, setThisId] = useState(0);
  const [changeId, setChangeId] = useState(0);

  const count = useMemo(() => {
    if (tradeValue.mouthing) {
      // let selectId = countRender;
      // for (let i = 1; i <= +round; ++i) {
      //   if (selectId <= 32) {
      //     break;
      //   } else {
      //     selectId = countRender - 32 * i;
      //   }
      // }
      // if (selectId !== 32)

      // dispatch(getPlayersDraft(tradeValue.results[countRender].round.name));
      // dispatch(setStatus("orange"));
      return countRender + 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countRender, tradeValue.mouthing]);



  useEffect(() => {
    
    if ((tradeValue.mouthing && countRender < teamPickIndex[0]) || (tradeValue.mouthing && !teamPickIndex.length && countRender !== tradeValue.results.length)) {
        dispatch(getPlayersDraft(tradeValue.results[countRender].round.name));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, tradeValue.mouthing]);

  // // Go To Result Page
  useEffect(() => {
    if (draftResults.results.length > 0) {
      navigate("/draft-result");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftResults.results]);

  useEffect(() => {
    dispatch(getTradeValue());
    // dispatch(getPositions())
    return () => {
      dispatch(resPlayersDraft());
      dispatch(setResetRound());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Finished Set Data
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

      dispatch(
        setDraftResultAction(
          draftPlayers,
          teamSelect,
          round,
          teamPickIndexControl,
          draftRandomnessTeam
        )
      );
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
        {tradeValue.mouthing && (
          <>
            <DraftViewAsign
              thisId={countRender}
              setThisId={setThisId}
              setChangeId={setChangeId}
              changeId={changeId}
              players={playersDraft}
              tradeValue={tradeValue}
            />
            <DraftViewSimulator>
              {!teamPickIndex.includes(count) && status !== "red" ? (
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
          </>
        )}
      </DraftView>
      <hr className="line" />
    </Wrapper>
  );
};


export default DraftPlayer;
