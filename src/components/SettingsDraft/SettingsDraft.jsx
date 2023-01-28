import { Switch } from "@mui/material";
import React, { useState } from "react";
import Title from "../../components/Title/Title";
import Nums from "./Nums";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import {
  SettingItem,
  Speed,
  NumItem,
  NumWrapper,
  SettingMarks,
} from "./Settings.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  checkRoundBPA,
  saveRound,
  selectDraftConfig,
  setAdvancedSetting,
  setDraftCardDepth,
  setDraftRandomness,
  setRoundDepth,
  setTimeSpeed,
} from "../../app/features/draftConfig/draftConfigSlice";
import { CheckBoxInputSecond } from "../Inputs/CheckBoxInputSecond";
import arrowLeft from "../../assets/img/arrow-left.png";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Settings = ({teamSelect}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    round,
    timeSpeed,
    draftRandomness,
    draftCardDepth,
    advancedSetting,
    roundDepth,
    roundBPA,
  } = useSelector(selectDraftConfig);
  const [isRoundOneFan, setIsRoundOneFan] = useState(false);
  const [isRoundTwoFan, setIsRoundTwoFan] = useState(false);
  const [isRoundThreeFan, setIsRoundThreeFan] = useState(false);

  const roundsArray = Array.from(Array(7).keys());

  useEffect(()=> {
    dispatch(setDraftRandomness(draftRandomness));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <>
      <SettingItem>
        <Title titleText="Rounds" titleClassName="setting-title " />
        <NumWrapper>
          {roundsArray.map((_, idx) => {
            const id = idx + 1;

            return (
              <NumItem
                key={id}
                className={`${id === +round ? "active-round" : ""}`}
                onClick={() => dispatch(saveRound(id))}
              >
                <Nums num={id} />
              </NumItem>
            );
          })}
        </NumWrapper>
      </SettingItem>
      <SettingItem>
        <Title titleText="Speed" titleClassName="setting-title " />
        <Speed>
          <Box sx={{ width: "100%" }}>
            <Slider
              defaultValue={2}
              step={1}
              min={1}
              max={5}
              value={timeSpeed}
              onChange={(e) => dispatch(setTimeSpeed(e.target.value))}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
            <SettingMarks>
              <span>Slow</span>
              <span>Fast</span>
            </SettingMarks>
          </Box>
        </Speed>
      </SettingItem>
      <SettingItem>
        <div>
          <Title
            titleText="Advanced Settings"
            titleClassName="advanced-setting-title "
          />
          <span className="setting-desc">How simulated teams pick</span>
        </div>
        <label htmlFor="">
          Use default
          <Switch
            checked={advancedSetting}
            onChange={(e) => dispatch(setAdvancedSetting(e.target.checked))}
          />
        </label>
      </SettingItem>
      {!advancedSetting && (
        <>
          <SettingItem className="setting-goriz">
            <Title
              titleText="Draft card depth"
              titleClassName="setting-title "
            />
            <Speed>
              <Box sx={{ width: "100%" }}>
                <Slider
                  defaultValue={2}
                  step={1}
                  min={2}
                  max={8}
                  value={draftCardDepth}
                  onChange={(e) => dispatch(setDraftCardDepth(e.target.value))}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
                <SettingMarks>
                  <span>Less (2)</span>
                  <span>More (8)</span>
                </SettingMarks>
              </Box>
            </Speed>
          </SettingItem>
          <SettingItem className="setting-goriz">
            <Title
              titleText="Draft randomness"
              titleClassName="setting-title "
            />
            <Speed>
              <Box sx={{ width: "100%" }}>
                <Slider
                  defaultValue={2}
                  step={1}
                  min={2}
                  max={16}
                  value={draftRandomness}
                  onChange={(e) => dispatch(setDraftRandomness(e.target.value))}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
                <SettingMarks>
                  <span>Less (2)</span>
                  <span>More (16)</span>
                </SettingMarks>
              </Box>
            </Speed>
          </SettingItem>
          <SettingItem className="setting-round-check">
            <CheckBoxInputSecond
              checked={roundBPA.includes(1)}
              label={"1nd round BPA"}
              nameClass={"setting-check"}
              value={1}
              disabled={!(round >= 1)}
              onInputChange={(e) => dispatch(checkRoundBPA(e.target.value))}
            />
            <CheckBoxInputSecond
              checked={roundBPA.includes(2)}
              label={"2nd round BPA"}
              nameClass={"setting-check"}
              value={2}
              disabled={!(round >= 2)}
              onInputChange={(e) => dispatch(checkRoundBPA(e.target.value))}
            />
          </SettingItem>
          <SettingItem className="setting-goriz">
            <Title titleText="Round depth" titleClassName="setting-title " />
            <Speed>
              <Box sx={{ width: "100%" }}>
                <Slider
                  step={1}
                  min={2}
                  max={5}
                  value={roundDepth}
                  defaultValue={5}
                  onChange={(e) => dispatch(setRoundDepth(e.target.value))}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
                <SettingMarks>
                  <span>Less (2)</span>
                  <span>More (5)</span>
                </SettingMarks>
              </Box>
            </Speed>
          </SettingItem>
          <SettingItem className="setting-fan">
            <div className="setting-fan-item">
              <p>1st round fanatic challenge</p>
              <CheckBoxInputSecond
                checked={isRoundOneFan}
                nameClass={"setting-check"}
                onInputChange={setIsRoundOneFan}
              />
            </div>
            <div className="setting-fan-item">
              <p>2st round fanatic challenge</p>
              <CheckBoxInputSecond
                checked={isRoundTwoFan}
                nameClass={"setting-check"}
                onInputChange={setIsRoundTwoFan}
              />
            </div>
            <div className="setting-fan-item">
              <p>3st round fanatic challenge</p>
              <CheckBoxInputSecond
                checked={isRoundThreeFan}
                nameClass={"setting-check"}
                onInputChange={setIsRoundThreeFan}
              />
            </div>
            <div className="setting-fan-item">
              <p>Fanatic mode</p>
              <Switch />
            </div>
          </SettingItem>
        </>
      )}

      <Button
        btnText="Enter Draft"
        btnIcon={arrowLeft}
        btnClassName="enter-draft-btn"
        btnDisable={!teamSelect.length}
        onBtnClick={() => navigate("/draft-player")}
      />
    </>
  );
};
export default Settings;
