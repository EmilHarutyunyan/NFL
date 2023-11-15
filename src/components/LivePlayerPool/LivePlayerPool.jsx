import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { draftEventPlayersId } from "../../app/features/draftEvents/draftEventsActions";
import {
  addQueuePlayerAction,
  playerPoolPositionMulti,
  selectDraftEvents,
} from "../../app/features/draftEvents/draftEventsSlice";
import Spinner from "../Spinner/Spinner";

const PlayerItem = ({ players, handleQueuePlayer }) => {
  return players.map((player) => {
    return (
      <tr key={player.id}>
        <td>
          <div className="player-choose">
            <input
              type="checkbox"
              name=""
              id=""
              onChange={() => handleQueuePlayer(player)}
            />
          </div>
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
  const { id } = useParams();
  const {
    eventPlayers,
    playerPollSettings: { position },
  } = useSelector(selectDraftEvents);
  // const [players, setPlayers] = useState(eventPlayers);
  // const [playerPosition,setPlayerPosition] = useState([0])
  const [searchValue, setSearchValue] = useState("");
  const groups = useSelector(selectGroup);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(draftEventPlayersId(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleQueuePlayer = useCallback((player) => {
    dispatch(addQueuePlayerAction(player));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const players = useMemo(() => {
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
      return playersData;
    }
    if (searchValue === "" && position[0] === "All") return playersData;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventPlayers, position, searchValue]);

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
          {players.length ? (
            <table>
              <tbody>
                <PlayerItem
                  players={players}
                  handleQueuePlayer={handleQueuePlayer}
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
