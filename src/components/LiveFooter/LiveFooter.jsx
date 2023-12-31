import React, { useEffect, useRef, useState } from "react";
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
import { selectLiveDraft } from "../../app/features/liveDraft/liveDraftSlice";

const LiveFooter = ({ handleOverflow }) => {
  const [isQueue, setIsQueue] = useState(false);
  const [isTrade, setIsTrade] = useState(false);
  const { queuePlayers, pickBoard, myEventTeam } = useSelector(selectLiveDraft);
  console.log('myEventTeam :', myEventTeam);

 
  const queueHeight = useRef(null);
  const offerTradeHeight = useRef(null);
  const lastPickBoard = pickBoard.at(-1);
  const boardRef = useRef(null)
  const touchScroll = (el) => {
  
      const slider = el;
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        cancelMomentumTracking();
      });

      slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
      });

      slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
        beginMomentumTracking();
      });

      slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        var prevScrollLeft = slider.scrollLeft;
        slider.scrollLeft = scrollLeft - walk;
        velX = slider.scrollLeft - prevScrollLeft;
      });

      slider.addEventListener("wheel", (e) => {
        cancelMomentumTracking();
      });

     
      var velX = 0;
      var momentumID;

      function beginMomentumTracking() {
        cancelMomentumTracking();
        momentumID = requestAnimationFrame(momentumLoop);
      }
      function cancelMomentumTracking() {
        cancelAnimationFrame(momentumID);
      }
      function momentumLoop() {
        slider.scrollLeft += velX;
        velX *= 0.95;
        if (Math.abs(velX) > 0.5) {
          momentumID = requestAnimationFrame(momentumLoop);
        }
      }
  }

  useEffect(() => {
    if(boardRef.current) {
      touchScroll(boardRef.current);
    }
  },[])

  useEffect(() => {
    if(pickBoard.length && boardRef.current) {
      boardRef.current.scrollLeft = boardRef.current.scrollWidth
    }
  },[pickBoard, boardRef])
  return (
    <Wrapper>
      <LiveFooterHead>
        {lastPickBoard ? (
          <LastPick>
            Last Pick:{" "}
            {`${lastPickBoard?.player?.position} ${lastPickBoard?.player?.name} (${lastPickBoard?.city}`}
          </LastPick>
        ) : (
          <LastPick />
        )}

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
              {myEventTeam.round ? <OfferTrade /> : null}
            </InfoTrade>
          </SelectBox>
          <div>{/* <QueueDnD /> */}</div>
        </LiveSelect>
      </LiveFooterHead>

      <LiveFooterBody ref={boardRef}>
        {pickBoard &&
          pickBoard.map((team) => {
            return (
              <ResultPick key={team.id}>
                <ResultTeam>
                  <p>{`${team.round_index_number}: ${team.pick}`}</p>
                  <img src={team.round.logo} alt={team.city} />
                </ResultTeam>
                <p className="line"></p>
              </ResultPick>
            );
          })}
      </LiveFooterBody>
    </Wrapper>
  );
};

export default LiveFooter;
