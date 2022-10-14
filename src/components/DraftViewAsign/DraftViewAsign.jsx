import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { API_ENDPOINT } from "../../config/config";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// Styles
import { Wrapper } from "./DraftViewAsign.styles";
import { useSelector } from "react-redux";
import { selectDraftConfig } from "../../app/features/draftConfig/draftConfigSlice";

const DraftViewAsign = () => {
  const initialRef = useRef(true);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { draftPlayers } = useSelector(selectDraftConfig);
  const [renderTeam, setRenderTeam] = useState(true);
  const [renderLoading, setRenderLoading] = useState(true)
  const combineTeam = (data) => {
    const player = draftPlayers[0];
    data.player = player;
    setData(data);
  };
  const handleData = async () => {
    setLoading(true);
    const { data } = await axios(
      `${API_ENDPOINT}trade-value-history/?limit=32`
    );

    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      handleData();
    }
  }, []);

  // const renderTimeout = () => {
  //   return <>
  //     <p className="player-name">{data.player.playerName}</p>
  //     <p className="player-pos">{data.player.positionPlayer}</p>
  //     <p className="player-colleg">{data.player.collegeName}</p>
  //   </>
  // }

  function* g1() {
    yield 2;
    yield 3;
    yield 4;

  }

  return (
    <Wrapper>
      <div className="round">Round 1</div>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : null}
      <ul>
        {data?.results?.map((team, idx) => {
          const {
            id,
            round: { logo, id: idTeam },
          } = team;




          return (
            <li key={idx} className="player-team">
              <div className="pick">
                <p>Pick</p>
                <p>{idTeam}</p>
              </div>
              {/* <div className="player-click">One the Clock</div> */}
              <div className="player-team-info">
                <img src={logo} alt="" />
                <div className="player-dashed">- - -</div>
                {data?.player && (
                  <>
                  
                    <p className="player-name">{data.player.playerName}</p>
                    <p className="player-pos">{data.player.positionPlayer}</p>
                    <p className="player-colleg">{data.player.collegeName}</p>
                  </>
                )}
                {renderLoading &&  (<CircularProgress />)}
                
              </div>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default DraftViewAsign;
