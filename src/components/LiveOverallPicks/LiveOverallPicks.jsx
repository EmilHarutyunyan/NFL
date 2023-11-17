import React, {
  useCallback,
  useEffect,
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
import { selectDraftEvents } from "../../app/features/draftEvents/draftEventsSlice";
import { useDispatch } from "react-redux";
import { draftEventRecentPicks } from "../../app/features/draftEvents/draftEventsActions";
import Spinner from "../Spinner/Spinner";

const ALL = "All";
const RecentPickTeams = ({
  recentPicks,
  picksTeams,
  handleChangeTeam,
  teamFilter,
  isPending
}) => {
  return (
    <>
      <FilterByTeam>
        <p>Filter by Team</p>
        <MySelectTeam
          name={teamFilter.value}
          dataValue={picksTeams}
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
            <td></td>
            <td></td>
            <td></td>
          </tr>
        );
      })}
    </>
  );
};

const LiveOverallPicks = () => {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const { recentPicks, picksTeams } = useSelector(selectDraftEvents);
  const [teamFilter, setTeamFilter] = useState({ value: ALL });

  useEffect(() => {
    dispatch(draftEventRecentPicks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  console.log(isPending);
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
