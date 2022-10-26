import React from "react";
import { useDispatch } from "react-redux";
import { saveTeams } from "../app/features/draftConfig/draftConfigSlice";

export const TeamItem = ({ num, teamName, teamLogo, isChecked, item }) => {
  const dispatch = useDispatch();
  return (
    <div
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
    </div>
  );
};
