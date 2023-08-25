import React, { useState } from 'react'
// Styles
import {Wrapper} from "./SettingSound.styles"
import { Switch } from '@mui/material';
const SettingSound = () => {
  const [isSound,setIsSound] = useState(false)
  return (
    <Wrapper>
      <p>Sound</p>
      <Switch onChange={() => setIsSound(!isSound)} />
      <p>{isSound ? 'ON' : 'OFF'}</p>
    </Wrapper>
  );
}

export default SettingSound