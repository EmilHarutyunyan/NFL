import React,{useState, useEffect} from 'react'
import { TeamItem } from '../TeamItem';
// import teamLogo from '../../components/assets/img/logo1.png';
import axios from "axios";
import './team.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export const Team = ({isChecked}) => {

  const [data, setData] = useState([]);
  const selectBorder = 'selectedBorder';



  const getData = async ()=> {
    const {data} = await axios.get(`https://sports-heroku.herokuapp.com/api/v1/rounds/?limit=32`);

    setData([data]);
  }
  useEffect( ()=> {
    getData();
  }, [])

  const printContent =() => {
    if(data.length) {
    return data[0].results.map((item,i)=> (
          <TeamItem key={i + 1}
            id={i}
            num={i+1}
            teamName={item.name}
            teamLogo={item.logo}
            selectBorder={selectBorder}
            isChecked={isChecked}
          />
    ))
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
