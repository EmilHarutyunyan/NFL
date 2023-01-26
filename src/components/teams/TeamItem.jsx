import React from "react";
import { useDispatch } from "react-redux";
import { saveTeams } from "../../app/features/draftConfig/draftConfigSlice";
import { TeamItemDiv } from "./Teams.styles";


export const TeamItem = ({ teams, num, teamName, teamLogo, isChecked, item }) => {
  const dispatch = useDispatch();
  return (
    <TeamItemDiv
      onClick={() => {
        dispatch(saveTeams(item));
      }}
      className={`team-item ${isChecked ? "active" : ""}`}
    >
      <div>
        <span className="num">{num}</span>
        <p className="name">{teamName}</p>
      </div>
      <img src={teamLogo} alt="" />
    </TeamItemDiv>
  );
};
