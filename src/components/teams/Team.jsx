import React, { useEffect} from 'react'
import { TeamItem } from './TeamItem';
// import teamLogo from '../../components/assets/img/logo1.png';

import './team.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getExceptTeam, getRandom } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { setDraftRandomnessTeam } from '../../app/features/draftConfig/draftConfigSlice';

export const Team = ({ teams, teamSelectId, draftRandomness }) => {
  const dispatch = useDispatch()
  useEffect(()=> {
    if (teams.length) {
    const exceptTeam = getExceptTeam(teams, teamSelectId, 'index')
    const exceptTeamId = exceptTeam.map(item => item.index)
    const draftRandomnessTeam = getRandom(exceptTeamId, draftRandomness)
    console.log('draftRandomnessTeam :', draftRandomnessTeam);
      dispatch(setDraftRandomnessTeam(draftRandomnessTeam))
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSelectId, draftRandomness])

  const printContent = () => {
    if (teams?.length) {
      return teams.map((item, i) => {
        const isChecked = teamSelectId.findIndex((index) => index === item.index) !== -1
        return (
          <TeamItem key={i + 1}
            id={i}
            num={i + 1}
            item={item}
            teams={teams}

            teamName={item.name}
            teamLogo={item.logo}
            isChecked={isChecked}
          />
        )
      })
    } else {
      return (
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
