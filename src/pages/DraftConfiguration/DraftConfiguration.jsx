import React, { useEffect, useRef } from "react";
import { Team } from "../../components/Teams/Team";
import Title from "../../components/Title/Title";
// import './config.css'
import SettingsDraft from "../../components/SettingsDraft/SettingsDraft";
import {
  DraftConfigWrap,
  DraftContainer,
  DraftHeading,
} from "./DraftConfig.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeams,
  selectAllTeams,
  selectDraftConfig,
  setResetRound,
} from "../../app/features/draftConfig/draftConfigSlice";
import { Switch } from "@mui/material";

export const DraftConfiguration = () => {
  const dispatch = useDispatch();
  const draftConfigRef = useRef(null);
  const { teamSelect, teams, teamSelectId, draftRandomness } =
    useSelector(selectDraftConfig);

  const handleChange = (e) => {
    dispatch(selectAllTeams(e.target.checked));
  };
  useEffect(() => {
    draftConfigRef.current?.scrollIntoView({ behavior: "smooth" });
    dispatch(setResetRound());
    dispatch(getTeams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DraftConfigWrap ref={draftConfigRef}>
      <DraftContainer className="main-container line">
        <DraftHeading>
          <Title titleText="Draft Configuration" titleClassName="title" />
          <p>Customize your mock draft settings below</p>
        </DraftHeading>
        <div className="select-teams">
          <div className="teams">
            <Title
              titleText="Select Your Team (s)"
              titleClassName="teams-title"
            />
            <p>Draft order is simulated</p>
            <label className="select-all" htmlFor="selectAll">
              Select All
              <Switch onChange={handleChange} />
            </label>
            <Team
              teams={teams}
              teamSelectId={teamSelectId}
              draftRandomness={draftRandomness}
            />
          </div>
          <div className="settings">
            <SettingsDraft teamSelect={teamSelect} />
          </div>
        </div>

        <hr className="line" />
      </DraftContainer>
    </DraftConfigWrap>
  );
};
