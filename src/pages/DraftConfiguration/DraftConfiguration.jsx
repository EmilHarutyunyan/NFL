import React, {useState} from 'react'
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

export const DraftConfiguration = () => {

    const [isChecked, setIsChecked] = useState(false)

    const handleChange = (e) => {
        setIsChecked(e.target.checked)
       
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
            <Team isChecked={isChecked} />
          </div>
          <div className="settings">
            <SettingsDraft />
          </div>
        </div>
        <Button
          btnText="Enter Draft"
          btnIcon={arrowLeft}
          btnClassName="enter-draft-btn"
          btnDisable
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
