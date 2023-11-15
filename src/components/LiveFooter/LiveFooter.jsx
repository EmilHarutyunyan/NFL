import React, {  useRef, useState } from "react";
// Styles
import {
  LastPick,
  ResultPick,
  ResultTeam,
  LiveFooterBody,
  LiveFooterHead,
  LiveSelect,
  SelectBox,
  SelectBoxItem,
  InfoTrade,
  Wrapper,
} from "./LiveFooter.styles";
import QueueDnD from "../QueueDnD/QueueDnD";
import { CircleX } from "../Icons/Icons";
import teamImg from "../../assets/img/team.png";
import OfferTrade from "../OfferTrade/OfferTrade";
import { useSelector } from "react-redux";
import { selectDraftEvents } from "../../app/features/draftEvents/draftEventsSlice";
const LiveFooter = ({handleOverflow}) => {
  const [isQueue, setIsQueue] = useState(false);
  const [isTrade, setIsTrade] = useState(false);
  const { queuePlayers } = useSelector(selectDraftEvents);
  const queueHeight = useRef(null);
  const offerTradeHeight = useRef(null);


  return (
    <Wrapper>
      <LiveFooterHead>
        <LastPick>Last Pick: QB Will Levis (nrgcolts)</LastPick>
        <LiveSelect className="">
          <SelectBox>
            <div className="info">
              <span>Queue</span>
              <span>{queuePlayers.length}</span>
            </div>
            <button
              onClick={() => {
                setIsQueue(!isQueue);
                setIsTrade(false);
                handleOverflow(!isQueue);
              }}
            >
              <CircleX />
            </button>
          </SelectBox>
          <InfoTrade
            ref={queueHeight}
            top={isQueue ? `-${queueHeight?.current?.offsetHeight}px` : "100%"}
            className={isQueue ? "active" : null}
          >
            <QueueDnD queuePlayers={queuePlayers} />
          </InfoTrade>
        </LiveSelect>
        <LiveSelect className="">
          <SelectBox>
            <SelectBoxItem>
              <div className="info">
                <p>Trades</p>
              </div>
              <div className="info">
                <span>Incoming</span>
                <span>0</span>
              </div>
              <div className="info">
                <span>Outgoing</span>
                <span>1</span>
              </div>
            </SelectBoxItem>
            <button
              onClick={() => {
                setIsTrade(!isTrade);
                setIsQueue(false);
                handleOverflow(!isTrade);
              }}
            >
              <CircleX />
            </button>
            <InfoTrade
              ref={offerTradeHeight}
              top={
                isTrade
                  ? `-${offerTradeHeight?.current?.offsetHeight}px`
                  : "100%"
              }
              className={isTrade ? "active" : null}
            >
              <OfferTrade />
            </InfoTrade>
          </SelectBox>
          <div>{/* <QueueDnD /> */}</div>
        </LiveSelect>
      </LiveFooterHead>

      <LiveFooterBody>
        <ResultPick>
          <ResultTeam>
            <p>1: 4</p>
            <img src={teamImg} alt={"team"} />
          </ResultTeam>
          <p className="line"></p>
          <ResultTeam>
            <p>1: 4</p>
            <img src={teamImg} alt={"team"} />
          </ResultTeam>
        </ResultPick>
        <ResultPick>
          <ResultTeam>
            <p>1: 4</p>
            <img src={teamImg} alt={"team"} />
          </ResultTeam>
          <p className="line"></p>
          <ResultTeam>
            <p>1: 4</p>
            <img src={teamImg} alt={"team"} />
          </ResultTeam>
        </ResultPick>
        <ResultPick>
          <ResultTeam>
            <p>1: 4</p>
            <img src={teamImg} alt={"team"} />
          </ResultTeam>
          <p className="line"></p>
          <ResultTeam>
            <p>1: 4</p>
            <img src={teamImg} alt={"team"} />
          </ResultTeam>
        </ResultPick>
        <ResultPick>
          <ResultTeam>
            <p>1: 4</p>
            <img src={teamImg} alt={"team"} />
          </ResultTeam>
          <p className="line"></p>
          <ResultTeam>
            <p>1: 4</p>
            <img src={teamImg} alt={"team"} />
          </ResultTeam>
        </ResultPick>
      </LiveFooterBody>
    </Wrapper>
  );
};

export default LiveFooter;
