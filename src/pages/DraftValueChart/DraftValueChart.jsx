import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDraftValue, selectDraftConfig } from "../../app/features/draftConfig/draftConfigSlice";
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Spinner from "../../components/Spinner/Spinner";
// Components
import Title from "../../components/Title/Title";

// Styles
import {
  DraftValueContent,
  RoundColumn,
  RoundColumnHead,
  Wrapper,
} from "./DraftValueChart.styles";

const DraftValueChart = () => {
  const dispatch = useDispatch()
  const {draftValue,loading} = useSelector(selectDraftConfig)
  const initialRef = useRef(true)
  const roundColumn = 7;
  const team = 31;
  const bodyCol = 32;
  
  const [showHide, setShowHide] = useState({
    team: false,
  });

  const handleChange = (event) => {
    setShowHide({
      ...showHide,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      dispatch(getDraftValue())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Wrapper className="main-container">
      <Title titleText="Draft Value Chart" />
      {loading ?  <Spinner /> : null}
      <FormControl component="fieldset" variant="standard">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={showHide.team} onChange={handleChange} name="team" />
          }
          label={`${showHide.team ? 'Hide Team' : 'Show Team'}`}
        />
      </FormGroup>
    </FormControl>
      <DraftValueContent>
        {
         draftValue.length > 0 ? ([...Array(roundColumn).keys()].map((rt) => {
          return (
            <RoundColumn key={rt}>
              <RoundColumnHead>
                <p>Round {rt + 1}</p>
              </RoundColumnHead>
              <table>
                <thead>
                  <tr>
                    <th>Selection</th>
                    {showHide.team ? (null) : (<th>Team</th>)}
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(bodyCol).keys()].map((item,idx) => {
                    
                    if (team >= item) {
                      return (
                        <tr key={item}>
                          <td>{draftValue[`${((rt+1)*32) - (32-idx)}`]?.index}</td>
                          {showHide.team ? (null) : (<td>{draftValue[`${((rt+1)*32) - (32-idx)}`]?.tm}</td>)}
                          <td>{draftValue[`${((rt+1)*32) - (32-idx)}`]?.value}</td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={item}>
                          <td> </td>
                          <td> </td>
                          <td>{""}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </RoundColumn>
          );
          })) : null
        }
      </DraftValueContent>
    </Wrapper>
  );
};

export default DraftValueChart;
