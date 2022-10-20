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




const roundSet = new Set()

const delayed2 = async (waitBefore = 500) => {
  
   function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  await timeout(Infinity)
};

const Delayed = ({ children, waitBefore = 500, scroll = null }) => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(true);
    }, waitBefore);
    return () => clearTimeout(timer);
  }, [waitBefore]);

  function ScrollSpasi() {
    if (scroll !== null && scroll?.id >= scroll?.asd1 && scroll?.asd1 !== 0) {
      scroll.teamRef?.current?.scrollBy(0, 75);
    }

    return children;
  }

  return isShow ? (
    <>{ScrollSpasi()}</>
  ) : (
    <CircularProgress style={{ position: "absolute", right: "10%" }} />
  );
};

const DraftViewAsign2 = () => {
  const initialRef = useRef(true);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { draftPlayers, teamSelect,teamSelectId,round } = useSelector(selectDraftConfig);
  const [asd, setAsd] = useState(0);
  const [asd1, setAsd1] = useState(0);


  const [idSelect, setIdSelect] =  useState(teamSelectId)
  
  const teamRef = useRef(null);

  

  const combineTeam = (data, idSelect) => {
    const player = draftPlayers[0];
    const newDataResult = [];

    for (const item of data.results) {
      if (idSelect.includes(item.id)) {
        newDataResult.push(item);
        continue;
      }
      item.player = player;
      newDataResult.push(item);
    }
    data.results = newDataResult;
    return data;
  };
  const handleData = async () => {
    setLoading(true);
    const { data } = await axios(
      `${API_ENDPOINT}trade-value-history/?limit=${+round * 32}&offset=0`
    );

    const newData = combineTeam(data, idSelect);
    setData(newData);
    setLoading(false);
  };
  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      handleData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function timeout(delay) {
  //   return new Promise((res) => setTimeout(res, delay));
  // }

  useEffect(() => {
    if (asd) {
      const newData = combineTeam(data, idSelect);
      
      setData(newData);
      setAsd(0);
    }
    return () => roundSet.clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idSelect]);

  function roundBox(roundSet,roundIndex) {
    
    if(roundSet.has(roundIndex)) {
      return false
    }
    else {
      roundSet.add(roundIndex)
      return true
    }
  }
  return (
    <Wrapper>
      {/* {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : null} */}
      <ul ref={teamRef}>
        {data?.results?.map((team, idx) => {
          const {
            id,
            round_index:roundIndex,
            round: { logo, id: idTeam },
          } = team;
          const isBelowThreshold = (currentValue) => currentValue > id;
          const checkTeam = idSelect.every(isBelowThreshold) ? id * 500 : 0;
          const time = asd1 ? +(id - asd1) * 1000 : checkTeam;

          return (
            <>
            {roundBox(roundSet,roundIndex) ? <div className="round">{roundIndex}</div> :<></>}
            <li
              key={idx}
              className={`${
                idSelect.includes(id) ? "player-team active" : "player-team"
              }`}
            >
              <div className="pick">
                <p>Pick</p>
                <p>{idTeam}</p>
              </div>

              <div className="player-team-info">
                <img src={logo} alt="" />
               
                <Delayed waitBefore={time} key={id}>
                  {!!checkTeam && team?.player ? null : (
                    <>
                      {idSelect.includes(id) ? (
                        <>
                        <div className="player-click">One the Clock</div>
                       
                        <button onClick={()=> {
                        roundSet.clear()
                        setAsd1(id)
                        setIdSelect(prev => prev.filter(item => id !== item))
                        setAsd(id)
                        

                        }
                        }>draft</button>
                        </>
                      ) : (
                        <>
                          <div className="player-dashed">- - -</div>
                        </>
                      )}
                    </>
                  )}
                  {!!checkTeam && team?.player && (
                    <Delayed
                      waitBefore={time}
                      key={id}
                      scroll={{
                        teamRef,
                        id,
                        asd1,
                      }}
                    >
                      <p className="player-name">{team.player.playerName}</p>
                      <p className="player-pos">{team.player.positionPlayer}</p>
                      <p className="player-colleg">{team.player.collegeName}</p>
                    </Delayed>
                  )}
                </Delayed>
              </div>
            </li>
            </>
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default DraftViewAsign2;



// import axios from "axios";
// import React, { useEffect, useRef } from "react";
// import { useState } from "react";
// import { API_ENDPOINT } from "../../config/config";
// import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";
// // Styles
// import { Wrapper } from "./DraftViewAsign.styles";
// import { useSelector } from "react-redux";
// import { selectDraftConfig } from "../../app/features/draftConfig/draftConfigSlice";




// const roundSet = new Set()

// const Delayed = ({ children, waitBefore = 500, scroll = null }) => {
//   const [isShow, setIsShow] = useState(false);
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsShow(true);
//     }, waitBefore);
//     return () => clearTimeout(timer);
//   }, [waitBefore]);

//   function ScrollSpasi() {
//     if (scroll !== null && scroll?.id >= scroll?.asd1 && scroll?.asd1 !== 0) {
//       scroll.teamRef?.current?.scrollBy(0, 75);
//     }

//     return children;
//   }
//   return isShow ? (
//     <>{ScrollSpasi()}</>
//   ) : (
//     <CircularProgress style={{ position: "absolute", right: "10%" }} />
//   );
// };

// const DraftViewAsign2 = () => {
//   const initialRef = useRef(true);
//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const { draftPlayers, teamSelect,round } = useSelector(selectDraftConfig);
//   const [asd, setAsd] = useState(0);
//   const [asd1, setAsd1] = useState(0);

//   const idSelectFilter = () => {

//     const teamIdSelect =  Array.from(Array(+round).keys()).map((item)=> {
//       return {
//         round: `${++item} Round`,
//         idSelect: [...teamSelect]
//       }
//     })
//   //  const ttt = []
//   //   teamSelect.forEach((el) => {
//   //     const xoski = {}
//   //     Array.from(Array(+round).keys()).forEach((item)=> {
//   //       if(xoski['round'] === item) {
//   //         xoski['idSelect'].push(el)

//   //       } else {
//   //         xoski['round'] = item
//   //         xoski['idSelect'] = []
//   //         xoski['idSelect'].push(el)

//   //       }
//   //       teamIdSelect.push(el.index);
//   //     })
      
//   //     ttt.push(xoski)
//   //     // for (let i; i < +round; i++) {
//   //     // }
      
//   //   })
//    console.log(teamIdSelect)
//     return teamIdSelect
//   }

//   const [idSelect, setIdSelect] =  useState(idSelectFilter())
//   const teamRef = useRef(null);

  

//   const combineTeam = (data, idSelect) => {
//     const player = draftPlayers[0];
//     const newDataResult = [];

//     for (const item of data.results) {
//       if (idSelect.includes(item.round.id)) {
//         newDataResult.push(item);
//         continue;
//       }
//       item.player = player;
//       newDataResult.push(item);
//     }
//     data.results = newDataResult;
//     return data;
//   };
//   const handleData = async () => {
//     setLoading(true);
//     const { data } = await axios(
//       `${API_ENDPOINT}trade-value-history/?limit=${+round * 32}&offset=0`
//     );

//     const newData = combineTeam(data, idSelect);
//     setData(newData);
//     setLoading(false);
//   };
//   useEffect(() => {
//     if (initialRef.current) {
//       initialRef.current = false;
//       handleData();
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // function timeout(delay) {
//   //   return new Promise((res) => setTimeout(res, delay));
//   // }

//   useEffect(() => {
//     if (asd) {
//       const newData = combineTeam(data, idSelect);
//       setData(newData);
//       setAsd(0);
//       roundSet.clear()
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [idSelect]);

//   function roundBox(roundSet,roundIndex) {
    
//     if(roundSet.has(roundIndex)) {
//       return false
//     }
//     else {
//       roundSet.add(roundIndex)
//       return true
//     }
//   }
//   return (
//     <Wrapper>
//       {/* {isLoading ? (
//         <Box sx={{ display: "flex" }}>
//           <CircularProgress />
//         </Box>
//       ) : null} */}
//       <ul ref={teamRef}>
//         {data?.results?.map((team, idx) => {
//           const {
//             id,
//             round_index:roundIndex,
//             round: { logo, id: idTeam },
//           } = team;
//           const isBelowThreshold = (currentValue) => currentValue > id;

//           const checkTeam = idSelect.every(isBelowThreshold) ? id * 500 : 0;
//           console.log('idSelect :', idSelect);
//           const time = asd1 ? +(id - asd1) * 1000 : checkTeam;

//           return (
//             <>
//             {roundBox(roundSet,roundIndex) ? <div className="round">{roundIndex}</div> :null}
//             <li
//               key={idx}
//               className={`${
//                 idSelect.includes(idTeam) ? "player-team active" : "player-team"
//               }`}
//             >
//               <div className="pick">
//                 <p>Pick</p>
//                 <p>{idTeam}</p>
//               </div>

//               <div className="player-team-info">
//                 <img src={logo} alt="" />

//                 <Delayed waitBefore={time} key={id}>
//                   {!!checkTeam && team?.player ? null : (
//                     <>
//                       {idSelect.includes(idTeam) ? (
//                         <>
//                         <div className="player-click">One the Clock</div>
//                         <button onClick={()=> {
//                         setAsd1(id)
//                         setIdSelect(prev => prev.filter(item => id !== item))
//                         setAsd(id)
                        

//                         }
//                         }>draft</button>
//                         </>
//                       ) : (
//                         <>
//                           <div className="player-dashed">- - -</div>
//                         </>
//                       )}
//                     </>
//                   )}
//                   {!!checkTeam && team?.player && (
//                     <Delayed
//                       waitBefore={time}
//                       key={id}
//                       scroll={{
//                         teamRef,
//                         id,
//                         asd1,
//                       }}
//                     >
//                       <p className="player-name">{team.player.playerName}</p>
//                       <p className="player-pos">{team.player.positionPlayer}</p>
//                       <p className="player-colleg">{team.player.collegeName}</p>
//                     </Delayed>
//                   )}
//                 </Delayed>
//               </div>
//             </li>
//             </>
//           );
//         })}
//       </ul>
//     </Wrapper>
//   );
// };

// export default DraftViewAsign2;

