import React,{ useEffect, useRef} from 'react'
import { TeamItem } from '../TeamItem';
// import teamLogo from '../../components/assets/img/logo1.png';

import './team.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from '../../app/features/draftConfig/draftConfigSlice';


export const Team = () => {

  const dispatch = useDispatch()
  const initial = useRef(true);
  const {teams,teamSelect,teamSelectId} = useSelector((state) => state.draftCongif);
  
  
  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      dispatch(getTeams());

    }
    // eslint-disable-next-line
  }, []);


  // const


  const printContent =() => {
    if(teams?.length) {
    return teams.map((item,i)=> {
      const isChecked = teamSelectId.findIndex((id) => id === item.id) !== -1
      return (
          <TeamItem key={i + 1}
            id={i}
            num={i+1}
            item={item}
            teamName={item.name}
            teamLogo={item.logo}
            isChecked={isChecked}
          />
      )
      })
    }else {
      return  (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box> 
      )
        

    }
  }


  return (
    <div className='all-teams'>
     {printContent()}
    </div> 
  )
}
