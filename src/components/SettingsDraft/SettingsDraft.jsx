import { Switch } from "@mui/material";
import React from "react";
import Title from "../../components/Title/Title";
import Nums from "./Nums";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


import { SettingItem, Speed, NumItem } from "./Settings.styles";


const Settings = () => {
  return (
    <>
      <SettingItem>
        <Title titleText="Rounds" titleClassName="setting-title " />
        <NumItem>
          <Nums num="1" />
        </NumItem>
      </SettingItem>
      <SettingItem>
        <Title titleText="Speed" titleClassName="setting-title " />
        <Speed>
          <Box width={300}>
            <Slider
              defaultValue={50}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </Box>
        </Speed>
      </SettingItem>
      <SettingItem>
        <Title
          titleText="Advanced Settings"
          titleClassName="advanced-setting-title "
        />
        <label htmlFor="">
          Possitional Need
          <Switch />
        </label>
      </SettingItem>
      <SettingItem>
        <Title
          titleText="How Is  BPA Calculated"
          titleClassName="setting-title "
        />
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="1 round"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="2 round"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="3 round"
            />
          </RadioGroup>
        </FormControl>
      </SettingItem>
      <SettingItem>
        <Title titleText="User Quantity" titleClassName="setting-title " />
      </SettingItem>
    </>
  );
};
export default Settings