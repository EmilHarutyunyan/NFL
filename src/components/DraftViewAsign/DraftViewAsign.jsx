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


const Delayed = ({children,waitBefore=500}) => {
  const [isShow,setIsShow] = useState(false)
  useEffect(()=> {
    const timer = setTimeout(() => {
      setIsShow(true)
    },waitBefore)
    return () => clearTimeout(timer)
  },[waitBefore])
  return isShow ? <>{children}</> : <CircularProgress />
}


const DraftViewAsign = () => {
  const initialRef = useRef(true);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { draftPlayers,teamSelect } = useSelector(selectDraftConfig);
  const [asd,setAsd] = useState(0)
  const [asd1,setAsd1] = useState(false)
  const [renderLoading, setRenderLoading] = useState(true)
  const [order,setOrder] = useState({round: 1,combineOrder: 1})
  const [combineTeamRound,setcombine] = useState(teamSelect.map((el) => el.index))
  console.log(teamSelect)
  const teamRef = useRef(null)

  const combineTeam = (data) => {
    
    const player = draftPlayers[0];
    const newDataResult = []

    for (const item of data.results) {
      if(item.id === 3) {
        newDataResult.push(item)
        continue
      }
      item.player = player
      newDataResult.push(item)
    }
    data.results = newDataResult
 
    setData(data);
    setAsd(1000)
    
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


  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}
    useEffect(()=> {
      if(asd1 === false) return
      async function fetchData() {
        // You can await here
        await timeout(3000)
        console.log(teamRef)
  
        setAsd1(false)
        combineTeam(data)
      }
      fetchData();
    },[asd1])


  return (
    <Wrapper>
      <div className="round">Round 1</div>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : null}
      <ul ref={teamRef}>
        {data?.results?.map((team, idx) => {
          const {id,round: { logo, id: idTeam }} = team;
          
          if(data.results.length === idTeam && 0 === asd && asd1 === false) {
            setAsd1(true)       
          }
          return <>{ team?.player ? 
              <li key={idx} className="player-team">
                <div className="pick">
                  <p>Pick</p>
                  <p>{idTeam}</p>
                </div>
                {/* <div className="player-click">One the Clock</div> */}
                <div className="player-team-info">
                  <img src={logo} alt="" />
                  
                <Delayed waitBefore={id*1000} key={id}>
                {team?.player ? null : <div className="player-dashed">- - -</div>}
                  {team?.player && (
                    <>
                    
                      <p className="player-name">{team.player.playerName}</p>
                      <p className="player-pos">{team.player.positionPlayer}</p>
                      <p className="player-colleg">{team.player.collegeName}</p>
                    </>
                  )}

            </Delayed>
                  
                </div>
              </li>
           : 
           
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
                {/* {renderLoading &&  (<CircularProgress />)} */}
                
              </div>
            </li>
            }</>
        })}
      </ul>
    </Wrapper>
  );
};

export default DraftViewAsign;
