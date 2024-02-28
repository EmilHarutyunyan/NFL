import React, {
  useCallback,
  useMemo,
  useState,
  useTransition,
} from "react";
// Styles
import {
  Content,
  LivePickHead,
  Wrapper,
  FilterByTeam,
  PlayerPick,
} from "./LiveOverallPicks.styles";
import MySelectTeam from "../MySelect/MySelectTeam";
import { useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { selectLiveDraft } from "../../app/features/liveDraft/liveDraftSlice";

const ALL = "All";
const RecentPickTeams = ({
  recentPicks,
  picksTeams,
  handleChangeTeam,
  teamFilter,
  isPending
}) => {
  const dataValue = [{ name: "All" },...picksTeams]
  return (
    <>
      <FilterByTeam>
        <p>Filter by Team</p>
        <MySelectTeam
          name={teamFilter.value}
          dataValue={dataValue}
          disabled={teamFilter.value}
          handleChange={(item) => {
            handleChangeTeam(item);
          }}
        />
      </FilterByTeam>
      {isPending ? (
        <Spinner />
      ) : (
        <PlayerPick>
          <table>
            <thead>
              <tr>
                <th>Pick</th>
                <th>Owner</th>
                <th>Team</th>
                <th>Player</th>
                <th>Pos</th>
                <th>College</th>
              </tr>
            </thead>
            <tbody>
              <PlayerPickItem recentPicks={recentPicks} />
            </tbody>
          </table>
        </PlayerPick>
      )}
    </>
  );
};

const PlayerPickItem = ({ recentPicks }) => {
  return (
    <>
      {recentPicks.map((team) => {
        return (
          <tr key={team.id}>
            <td>
              {`${team.pick}`}: {`${team.round_index_number}`}
            </td>
            <td></td>
            <td>
              <img src={team.round.logo} alt={team.round.name} />
            </td>
            <td>{team?.player?.name && <span>{team.player.name}</span>}</td>
            <td>
              {team?.player?.position && <span>{team.player.position}</span>}
            </td>
            <td>{team?.player?.school && <span>{team.player.school}</span>}</td>
          </tr>
        );
      })}
    </>
  );
};

const LiveOverallPicks = () => {
 
  const [isPending, startTransition] = useTransition();
  const { recentPicks, picksTeams } = useSelector(selectLiveDraft);
  const [teamFilter, setTeamFilter] = useState({ value: ALL });


  const recentPicksFilterMemo = useMemo(
    () => {
      if (teamFilter.value === ALL && recentPicks.length) {
        return recentPicks;
      }
      if (teamFilter.value && recentPicks.length) {
        return recentPicks.filter(
          (item) => item.round.name === teamFilter.value
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recentPicks, teamFilter]
  );
  const handleChangeTeam = useCallback((team) => {
    startTransition(() => {
      setTeamFilter(team);
    });
  }, []);

  return (
    <Wrapper>
      <LivePickHead>
        <h2>Recent Picks</h2>
      </LivePickHead>
      {/* <FlipClock /> */}
      <Content>
        {!recentPicks.length && !picksTeams.length ? (
          <Spinner />
        ) : (
          <RecentPickTeams
            recentPicks={recentPicksFilterMemo}
            picksTeams={picksTeams}
            handleChangeTeam={handleChangeTeam}
            teamFilter={teamFilter}
            isPending={isPending}
          />
        )}
      </Content>
      
    </Wrapper>
  );
};

export default LiveOverallPicks;
