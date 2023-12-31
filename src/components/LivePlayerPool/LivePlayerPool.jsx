import React, { useCallback, useEffect, useState, useTransition } from "react";
// Styles
import {
  PositionItem,
  PositionWrap,
  Wrapper,
  Content,
  LivePickHead,
  PlayerSettings,
  PlayerFilter,
  PlayerTable,
} from "./LivePlayerPool.styles";
import { useSelector } from "react-redux";
import { selectGroup } from "../../app/features/group/groupSlice";
import { POSITIONS_COLOR } from "../../utils/constants";
import Search from "../Search/Search";
import { useDispatch } from "react-redux";


import Spinner from "../Spinner/Spinner";
import { addQueuePlayerAction, livePicksChoose, playerPoolPositionMulti, selectLiveDraft, setEventTime } from "../../app/features/liveDraft/liveDraftSlice";
import useAudio from "../../hooks/useAudio";
import { useSocket } from "../../hook/SocketContext";


const PlayerItem = ({
  players,
  handleQueuePlayer,
  queuePlayersId,
  handlePlayerChoose,
  start,
  nextMyEvent,
}) => {

  return players.map((player) => {
    return (
      <tr key={player.id}>
        <td>
          {!start ? (
            <div className="player-choose">
              <input
                type="checkbox"
                checked={queuePlayersId.includes(player.index)}
                name=""
                id=""
                onChange={() => handleQueuePlayer(player)}
              />
            </div>
          ) : (
            <div className="player-draft">
              <button
                disabled={!nextMyEvent}
                onClick={() => handlePlayerChoose(player)}
              >
                Draft
              </button>
            </div>
          )}
        </td>
        <td>
          <div className="player-rank">
            <h4>Rank</h4>
            <p>{player?.index}</p>
          </div>
        </td>
        <td>
          <p className="player-adp"> ADP</p>
        </td>
        <td>
          <p className="player-name">{player?.name}</p>
        </td>
        <td>
          <PositionItem backColor={POSITIONS_COLOR[player?.position]}>
            <span>{player?.position}</span>
          </PositionItem>
        </td>
        <td>
          <p className="player-state">{player?.team_name}</p>
        </td>
      </tr>
    );
  });
};

const LivePlayerPool = () => {
  const socket = useSocket()
  const {
    eventPlayers,
    playerPollSettings: { position },
    queuePlayersId,
    firstStart,
    start,
    nextMyEvent,
    eventId,
    isFinishLiveDraft,
  } = useSelector(selectLiveDraft);


  const [isPending,startTransition] = useTransition();
  const [players, setPlayers] = useState(eventPlayers);
  const [searchValue, setSearchValue] = useState("");
  const groups = useSelector(selectGroup);
  const {isPlaying, play,stop} = useAudio()
  const dispatch = useDispatch();

  const handleQueuePlayer = useCallback((player) => {
    dispatch(addQueuePlayerAction(player));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerChoose = useCallback(
    async (player) => {
      if ((!isFinishLiveDraft && socket)) {
        console.log("asdasdad");
        console.log({ ...player, eventId });
        await socket.emit("player", JSON.stringify({ ...player, eventId }));
        
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [isFinishLiveDraft, socket]
  );
  const handleFilterPlayer = useCallback(() => {
    startTransition(()=> {
      let playersData = eventPlayers;
      if (eventPlayers.length) {
        if (searchValue) {
          playersData = eventPlayers.filter((player) => {
            const name = player.name.toLowerCase();
            return name.includes(searchValue.toLowerCase());
          });
        }
        if (position.length && position[0] !== "All") {
          playersData = playersData.filter((player) => {
            return position.includes(player.position);
          });
        }
      }
      setPlayers(playersData);
    })
  }, [
    eventPlayers,
    position,
    searchValue,
  ]);
  useEffect(() => {
    if(eventPlayers.length) handleFilterPlayer()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventPlayers,position,searchValue]);

  useEffect(() => {
      if (socket) {
        socket.on("player", async (data) => {
          
          await dispatch(setEventTime({time:0, manualChoose:true}));
          const player = data;
          console.log('player socket :', player);
          setTimeout(()=> {
            
            dispatch(livePicksChoose(player));
              !isPlaying ? play() : stop();

          },[1000])
          
        });
      }
  },[socket])
  return (
    <Wrapper>
      <LivePickHead>
        <h2>Player Pool</h2>
      </LivePickHead>
      <Content>
        <PlayerSettings>
          <PositionWrap>
            {groups?.positions &&
              groups.positions.map((item, idx) => {
                const id = idx + 1;
                const posName = item.split(" ")[0];
                return (
                  <PositionItem
                    key={id}
                    backColor={POSITIONS_COLOR[posName]}
                    className={position.includes(posName) ? "active" : null}
                    onClick={() => {
                      dispatch(playerPoolPositionMulti(posName));
                    }}
                  >
                    <span>{item.split(" ")[0]}</span>
                  </PositionItem>
                );
              })}
          </PositionWrap>
          <PlayerFilter>
            <div className="search-player">
              <Search
                value={searchValue}
                handleChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </div>
            <span>Sort by</span>
            <div className="sort-by">
              <input
                type="radio"
                id="rank"
                name="rank_adp"
                defaultValue="Rank"
              />
              <label htmlFor="rank">Rank</label>
            </div>
            <div className="sort-by">
              <input type="radio" name="rank_adp" id="adp" defaultValue="ADP" />
              <label htmlFor="rank">ADP</label>
            </div>
          </PlayerFilter>
        </PlayerSettings>
        <PlayerTable>
          {players.length && !isPending ? (
            <table>
              <tbody>
                <PlayerItem
                  players={players}
                  handleQueuePlayer={handleQueuePlayer}
                  queuePlayersId={queuePlayersId}
                  handlePlayerChoose={handlePlayerChoose}
                  start={start}
                  nextMyEvent={nextMyEvent}
                />
              </tbody>
            </table>
          ) : (
            <Spinner />
          )}
        </PlayerTable>
      </Content>
    </Wrapper>
  );
};

export default LivePlayerPool;
