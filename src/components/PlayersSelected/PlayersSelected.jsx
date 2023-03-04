import React, { useMemo, useState } from "react";

import { useSelector } from "react-redux";
import { selectDraftConfig } from "../../app/features/draftConfig/draftConfigSlice";
import { selectGroup } from "../../app/features/group/groupSlice";

import PlayerCards from "./PlayerCards";
import PlayerSearch from "./PlayerSearch";
import {
  PlayerFilter,
  PlayerFilterItems,
  SelectWrap,
  Wrapper,
} from "./PlayersSelected.styles";
import TeamSelect from "./TeamSelect";

const PlayersSelected = ({ draftPlayers, teamSelect }) => {
  const { teamPickIndexControl } = useSelector(selectDraftConfig);
  const { positions } = useSelector(selectGroup);

  const [value, setValue] = useState("");
  const [team, setTeam] = useState("All Team");
  const [position, setPosition] = useState("All Positions");
  const teamName = teamSelect.map((item) => item.name);
  teamName.unshift("All Team");
  const filterDraft = useMemo(() => {
    
    const myDraft = draftPlayers.filter((item) =>
      teamPickIndexControl.includes(item.index)
    );
    let draftData;
    if (value) {
      draftData = myDraft.filter((item) => {
        return item.player.player.toLowerCase().includes(value.toLowerCase());
      });
    }
    
    if (position !== "All Positions") {
      draftData = myDraft.filter((item) => {
        return item.player.position.toLowerCase() === position.toLowerCase();
      });
    }
    if (team !== "All Team") {
      draftData = myDraft.filter((item) => {
        return item.round.name.toLowerCase() === team.toLowerCase();
      });
    }
    if (team !== "All Team" && position !== "All Positions") {
      draftData = myDraft.filter((item) => {
        return (
          item.round.name.toLowerCase() === team.toLowerCase() &&
          item.player.position.toLowerCase() === position.toLowerCase()
        );
      });
    }

    return draftData ?? myDraft;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, position, value, draftPlayers]);

  console.log("filterDraft :", filterDraft);

  const handleSearch = (e) => {
    const name = e.target.value;
    setValue(name);
    
    // eslint-disable-next-line
  };
  return (
    <Wrapper>
      <PlayerFilter>
        <h3>Players selected</h3>
        <PlayerFilterItems>
          <p>Filter</p>
          <SelectWrap>
            <div className="team-select">
              <TeamSelect
                customWidth={180}
                // label={team}
                name={team}
                dataValue={teamName}
                handleChange={(item) => setTeam(item.value)}
              />
            </div>
            <div className="position-select">
              <TeamSelect
                customWidth={180}
                // label={team}
                name={position}
                dataValue={positions}
                handleChange={(item) => setPosition(item.value)}
              />
            </div>
            <div className="search-player">
              <PlayerSearch
                placeholder={"Search player"}
                handleChange={handleSearch}
                value={value}
              />
            </div>
          </SelectWrap>
        </PlayerFilterItems>
      </PlayerFilter>
      <PlayerCards draft={filterDraft} />
    </Wrapper>
  );
};

export default PlayersSelected;
