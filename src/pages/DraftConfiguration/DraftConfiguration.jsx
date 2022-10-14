import React from 'react'
import { Input } from '../../components/Input'
import { Team } from '../../components/teams/Team'
import Title from '../../components/Title/Title'
// import './config.css'
import Button from '../../components/Buttons/Button';
import arrowLeft from  '../../assets/img/arrow-left.png'
import SettingsDraft from "../../components/SettingsDraft/SettingsDraft";
import {
  DraftConfigWrap,
  DraftContainer,
  DraftHeading,
  Steps,
  StepItem,
} from "./DraftConfig.styles";
import { useDispatch, useSelector } from 'react-redux';
import { setAllTeams } from '../../app/features/draftConfig/draftConfigSlice';
import { useNavigate } from 'react-router-dom';

export const DraftConfiguration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {teamSelect} = useSelector((state) => state.draftCongif);
    const handleChange = (e) => {
        dispatch(setAllTeams(e.target.checked))
    }

  return (
    <DraftConfigWrap>
      <DraftContainer className="main-container line">
        <DraftHeading>
          <Title titleText="Draft Configuration" titleClassName="title" />
          <p>Customize your mock draft settings below</p>
        </DraftHeading>
        <div className="select-teams">
          <div className="teams">
            <Title
              titleText="Select Your Team (s)"
              titleClassName="teams-title"
            />
            <p>Draft order is simulated</p>
            <label className="select-all" htmlFor="selectAll">
              <Input
                type="checkbox"
                id="selectAll"
                handleChange={handleChange}
              />
              Select All
            </label>
            <Team />
          </div>
          <div className="settings">
            <SettingsDraft />
          </div>
        </div>
        <Button
          btnText="Enter Draft"
          btnIcon={arrowLeft}
          btnClassName="enter-draft-btn"
          btnDisable={!teamSelect.length}
          onBtnClick={()=>navigate('/draft-player')}

        />
        <hr className="line" />
        <Steps>
          <StepItem>
            <span className="active-step">1</span>
            <p>Select Your Team (s), Setup Your Draft</p>
          </StepItem>
          <StepItem >
            <span>2</span>
            <p>Draft For Your Team</p>
          </StepItem>
          <StepItem>
            <span>3</span>
            <p>Share your Draft</p>
          </StepItem>
        </Steps>
      </DraftContainer>
    </DraftConfigWrap>
  );
  }
